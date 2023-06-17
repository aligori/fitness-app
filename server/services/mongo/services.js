import {db} from './db.service.js'

// async function createTest(data){
//     await db.collection('testCollection').insertOne({ firstName: data.firstname, lastName: data.lastname, email: data.email });
//     return 'Creating with MONGO'
// }

// async function getTest(){
//     return await db.collection('testCollection').find().toArray();
// }

// export default { createTest, getTest }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//returns array where each object is a gym goer
async function getGymGoers() {
    const gymGoers = await db.user.find({gymGoer: {$exists: true}}, {'gymGoer': 1, 'username': 1, 'email': 1, 'password':1}).toArray();
    return gymGoers;
}

//returns array where each object is a fitness influencer
async function getInfluencers() {
    const influencers = await db.user.find({fitnessInfluencer: {$exists: true}}, {'fitnessInfluencer': 1, 'username': 1, 'email': 1, 'password':1}).toArray();
    return influencers;
}

//returns array where each object is a category
async function getCategories() {
    const categories = await db.collection("category").find().toArray();
    return categories;
}

//returns one category object
async function getCategoryById(categoryId){
    const categoryVals = await db.category.findOne({_id: categoryId});
    return categoryVals;
}

//returns one plan object, plan has "workoutsInfo" with necessary info
async function getPlanById(planId){
    const planVals = await db.plan.findOne({_id: planId});
    return planVals;
}

//returns one workout object (including the embedded sets and exercises)
async function getWorkoutById(workoutId){
    const workoutVals = await db.workout.findOne({_id: workoutId});
    return workoutVals;
}

async function subscribe(planId, userId){
    //get the current date
    subscriptionDate = new Date();
    //turn the current date and userId into a subscription object
    const newSubscription = {subscriberId:userId, subscriptionDate:subscriptionDate}
    //update user
    await db.collection("user").updateOne(
        {_id: userId},
        { $addToSet: { "gymGoer.subscriptions": planId } }
    );
    //update plan
    await db.collection("plan").updateOne(
        {_id: planId},
        {$addToSet: {"plan.subscribers": newSubscription } }
    );
}

async function completeWorkout(workoutId, userId) {
    //query to find workout.calories and workout.partOf
    workoutVals = getWorkoutById(workoutId)
    //get the current date
    dateCompleted = new Date();
    //insert all values into the hasCompleted collection
    db.collection("hasCompleted").insertOne({goerId: userId, workoutId: workoutId, partOf: workoutVals.partOf, caloriesBurned: workoutVals.caloriesBurned, dateCompleted: dateCompleted})
}

async function getPlansByUser(userId) {
    const chosenUser = await db.user.findOne({_id:userId});
    planIds = chosenUser.subscriptions;
    const plans = await db.collection("plan").find({ _id: { $in: planIds } }).toArray();
    return plans;
}

export default {getGymGoers, getInfluencers, getCategories, getCategoryById, getPlanById, getWorkoutById, subscribe, completeWorkout, getPlansByUser}