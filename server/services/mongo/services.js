import {db} from './db.service.js'
import {categoryPlansMapper} from "../../utils/mappers/nosql/categoryPlans.js";
import {planMapper} from "../../utils/mappers/nosql/plan.js";
import {workoutMapper} from "../../utils/mappers/nosql/workout.js";

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
  const result = await db.collection('plan').find({ "category._id": +categoryId }).toArray(); // Index is used
  return categoryPlansMapper(result);
}

async function getPlanById(planId, userId) {
  const result = await db.collection('plan').aggregate([
    { $match: { _id: +planId } },
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
                    { $and: [{ $eq: ["$planId", "$$plan_id"] }, { $eq: ["$goerId", +userId] }] }
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
  const result = await db.collection('workout').aggregate([
    { $match: { _id: +workoutId } },
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
                    { $and: [{ $eq: ["$workoutId", "$$workout_id"] }, { $eq: ["$goerId", +userId] }] }
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
  const existingRecord = await db.collection('subscription').findOne({ planId: +planId, goerId: +goerId });

  if (existingRecord) throw new Error('Plan already subscribed!');

  const subscription = { planId: +planId, goerId: +goerId, subscriptionDate: new Date() }
  await db.collection("subscription").insertOne(subscription);

  // Update goer's subscriptions list
  const planObject = await db.collection("plan").findOne({ _id: +planId });

  await db.collection("user").updateOne(
    { _id: +goerId },
    {
      $addToSet: {
        "gymGoer.subscriptions": {
          _id: +planId,
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
  const existingRecord = await db.collection('completedWorkouts').findOne({ workoutId: +workoutId, goerId: +goerId });
  if (existingRecord) throw new Error('Workout already completed!');

  const completion = { goerId: +goerId, workoutId: +workoutId, dateCompleted: new Date() }
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