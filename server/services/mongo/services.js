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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// async function getGymGoers() {
//     const gymGoers = await db.user.find({gymGoer: {$exists: true}}, {'gymGoer': 1, 'username': 1, 'email': 1, 'password':1}).toArray();
//     return gymGoers;
// }

// async function getInfluencers() {
//     const influencers = await db.user.find({fitnessInfluencer: {$exists: true}}, {'fitnessInfluencer': 1, 'username': 1, 'email': 1, 'password':1}).toArray();
//     return influencers;
// }

// async function getCategories() {
//     const categories = await db.collection("category").find().toArray();
//     return categories;
// }

// async function getPlans() {
//     const plan = await db.collection("plan").find().toArray();
//     return plans;
// }

// async function getPlansFromCategory(categoryId) {
//     const plans = await db.category.find(
//         { _id: categoryId },
//         { plans: 1 }
//     );
//     return db.plan.find({ _id: {$in: plans}}).toArray();
// }

// async function getCategory(categoryId) {
//     const category = db.category.find({_id: categoryId}, {title: 1, description: 1});
//     const plans = getPlansFromCategory(categoryId);
//     category.plans = plans;
//     return category;
// }

// async function getPlansFromUser(userId) {
//     const plans = await db.user.findOne(
//         {_id: userId},
//         {"gymGoer.subscriptions": 1}
//     );
//     return db.plan.find({_id: {$in: plans}}).toArray();
// }

// async function getWorkoutsFromPlan(planId) {
//     const workouts = await db.plan.findOne(
//         {_id: planId},
//         { workoutIds: 1}
//     );
//     return db.workout.find({_id: {$in: workouts}}).toArray();
// }

// async function getPlan(planId){
//     const plan = db.plan.findOne({ _id: planId }, { title: 1, description: 1 });
//     const workouts = getWorkoutsFromPlan(planId);
//     plan.workouts = workouts;
//     return plan;
// }

// //does not need two steps like get plan because "sets" is a property of workout
// async function getWorkout(workoutId){
//     const workoutVals = await db.workout.findOne({_id: workoutId});
//     return workoutVals;
// }

//insert statements


export default { resetDatabase }