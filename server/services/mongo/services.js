import {db} from './db.service.js'

async function createTest(data){
    await db.collection('testCollection').insertOne({ firstName: data.firstname, lastName: data.lastname, email: data.email });
    return 'Creating with MONGO'
}

async function getTest(){
    return await db.collection('testCollection').find().toArray();
}

async function resetDatabase() {
    await db.collection('user').deleteMany({});
    await db.collection('category').deleteMany({});
    await db.collection('exercise').deleteMany({});
    await db.collection('plan').deleteMany({});
    await db.collection('workout').deleteMany({});
}

export default { resetDatabase }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //returns array where each object is a gym goer
// async function getGymGoers() {
//     const gymGoers = await db.user.find({gymGoer: {$exists: true}}, {'gymGoer': 1, 'username': 1, 'email': 1, 'password':1}).toArray();
//     return gymGoers;
// }

// //returns array where each object is a fitness influencer
// async function getInfluencers() {
//     const influencers = await db.user.find({fitnessInfluencer: {$exists: true}}, {'fitnessInfluencer': 1, 'username': 1, 'email': 1, 'password':1}).toArray();
//     return influencers;
// }

// //returns array where each object is a category
// async function getCategories() {
//     const categories = await db.collection("category").find().toArray();
//     return categories;
// }

// //returns one category object
// async function getCategoryById(categoryId){
//     const categoryVals = await db.category.findOne({_id: categoryId});
//     return categoryVals;
// }

// //returns one plan object, plan has "workoutsInfo" with necessary info
// async function getPlanById(planId){
//     const planVals = await db.plan.findOne({_id: planId});
//     return planVals;
// }

// //returns one workout object (including the embedded sets and exercises)
// async function getWorkoutById(workoutId){
//     const workoutVals = await db.workout.findOne({_id: workoutId});
//     return workoutVals;
// }

// async function subscribe(planId, goerId){
//     //check subscriptions to make sure the current combination doesn't already exist
//     existingRecord = await db.subscription.findOne({planId:planId,goerId:goerId});
//     //existingRecordInUser = await db.user.findOne({_id:goerId,gymGoer.subscriptions.planId:planId}) I don't know how to check for this
//     if(existingRecord){
//         return error;
//     } else {
//         //get the current date
//         subscriptionDate = new Date();
//         //update subscription
//         await db.collection("subscription").insertOne({planId:planId,goerId:goerId,subscriptionDate:subscriptionDate});
//         //update goer's subscribe list
//         planObject = await db.subscription.findOne({_id:planId})
//         await db.collection("user").updateOne(
//             {_id:goerId},
//             {$addToSet: {"gymGoer.subscriptions": {_id:planId, title:planObject.title, goal:planObject.goal, duration:planObject.duration}}}
//         );
//     }
// }

// async function completeWorkout(workoutId, goerId) {
//     //check completedWorkout to make sure the current combination doesn't already exist
//     existingRecord = await db.completedWorkouts.findOne({workoutId: workoutId, goerId: goerId});
//     if(existingRecord){
//         return error;
//     } else {
//         //get current date to put in as date completed
//         dateCompleted = new Date();
//         //insert into collection
//         await db.collection("completedWorkouts").insertOne({goerId:goerId, workoutId:workoutId, dateCompleted:dateCompleted});
//         return "Workout complete!";        
//     }
// }

// async function getPlansByUser(userId) {
//     const chosenUser = await db.user.findOne({_id:userId});
//     planIds = chosenUser.subscriptions;
//     const plans = await db.collection("plan").find({ _id: { $in: planIds } }).toArray();
//     return plans;
// }

// export default {getGymGoers, getInfluencers, getCategories, getCategoryById, getPlanById, getWorkoutById, subscribe, completeWorkout, getPlansByUser, resetDatabase}