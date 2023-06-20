import {db} from './db.service.js'
import {categoryPlansMapper} from "../../utils/mappers/nosql/categoryPlans.js";
import {planMapper} from "../../utils/mappers/nosql/plan.js";
import {workoutMapper} from "../../utils/mappers/nosql/workout.js";
import {ObjectId} from "mongodb";

async function resetDatabase() {
  await db.collection('user').deleteMany({});
  await db.collection('category').deleteMany({});
  await db.collection('exercise').deleteMany({});
  await db.collection('plan').deleteMany({});
  await db.collection('workout').deleteMany({});
  await db.collection('subscription').deleteMany({});
  await db.collection('completedWorkout').deleteMany({});
}

const mapIdCallback = ({_id, ...rest}) => { return { id: _id, ...rest}}

async function getGymGoers() {
  const result = await db.collection('user').find({ gymGoer: { $exists: true } }, {
    projection: {
      '_id': 1,
      'email': 1,
      'username': 1,
      'avatar': 1
    }
  }).toArray()
  return result.map(mapIdCallback);
}

async function getInfluencers() {
  const result = await db.collection('user').find({ fitnessInfluencer: { $exists: true } }, {
    projection: {
      '_id': 1,
      'username': 1,
      'email': 1,
      'avatar': 1
    }
  }).toArray();
  return result.map(mapIdCallback);
}

async function getCategories() {
  const result = await db.collection("category").find().toArray();
  return result.map(mapIdCallback)
}

async function getCategoryPlans(categoryId) {
  const result = await db.collection('plan').find({ "category._id": new ObjectId(categoryId) }).toArray(); // Index is used
  return categoryPlansMapper(result);
}

async function getPlanById(planId, userId) {
  const planObjId = new ObjectId(planId)
  const userObjId = new ObjectId(userId)

  const result = await db.collection('plan').aggregate([
    { $match: { _id: planObjId } },
    {
      $lookup:
        {
          from: "subscription",
          let: { plan_id: "$_id" },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    { $and: [{ $eq: ["$planId", "$$plan_id"] }, { $eq: ["$goerId", userObjId] }] }
                }
            },
          ],
          as: "subscription"
        }
    },
    { $unwind: { path: "$subscription", preserveNullAndEmptyArrays: true } }
  ]).toArray();

  return planMapper(result)
}

async function getWorkoutById(workoutId, userId) {
  const workoutObjId = new ObjectId(workoutId)
  const userObjId = new ObjectId(userId)

  const result = await db.collection('workout').aggregate([
    { $match: { _id: workoutObjId } },
    {
      $lookup:
        {
          from: "completedWorkout",
          let: { workout_id: "$_id" },
          pipeline: [
            {
              $match:
                {
                  $expr:
                    { $and: [{ $eq: ["$workoutId", "$$workout_id"] }, { $eq: ["$goerId", userObjId] }] }
                }
            },
          ],
          as: "completion"
        }
    },
    { $unwind: { path: "$completion", preserveNullAndEmptyArrays: true } }
  ]).toArray();
  return workoutMapper(result);
}

async function subscribe(planId, goerId) {
  // Check subscriptions to make sure the current combination doesn't already exist
  const planObjId = new ObjectId(planId)
  const goerObjId = new ObjectId(goerId)
  const existingRecord = await db.collection('subscription').findOne({ planId: planObjId, goerId: goerObjId });

  if (existingRecord) throw new Error('Plan already subscribed!');

  const subscription = { planId: planObjId, goerId: goerObjId, subscriptionDate: new Date() }
  await db.collection("subscription").insertOne(subscription);

  // Update goer's subscriptions list
  const planObject = await db.collection("plan").findOne({ _id: planObjId });

  await db.collection("user").updateOne(
    { _id: goerObjId },
    {
      $addToSet: {
        "gymGoer.subscriptions": {
          _id: planObjId,
          title: planObject.title,
          goal: planObject.goal,
          duration: planObject.duration
        }
      }
    }
  );
}

async function completeWorkout(workoutId, goerId) {
  // Check completedWorkout to make sure the current combination doesn't already exist
  const workoutObjId = new ObjectId(workoutId)
  const goerObjId = new ObjectId(goerId)

  const existingRecord = await db.collection('completedWorkouts').findOne({ workoutId: workoutObjId, goerId: goerObjId });
  if (existingRecord) throw new Error('Workout already completed!');

  const completion = { goerId: goerObjId, workoutId: workoutObjId, dateCompleted: new Date() }
  await db.collection("completedWorkouts").insertOne(completion);
}

// Report 1
async function getBestPlanByGoer(goerId) {}

// Report 2
async function getBestPlanByCategory(categoryId) {}

async function getProfileInfo(userId) {}

export default {
  resetDatabase,
  getGymGoers,
  getInfluencers,
  getCategories,
  getCategoryPlans,
  getPlanById,
  getWorkoutById,
  subscribe,
  completeWorkout,
  getBestPlanByGoer,
  getBestPlanByCategory,
  getProfileInfo,
}