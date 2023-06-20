import db from './db.service.js'
import { faker } from '@faker-js/faker'
import {getRandomInt} from "../../utils/helpers.js";
import {defaultCategories} from "../../data/categories.js";
import {defaultExercises} from "../../data/exercises.js";
import {planMapper} from "../../utils/mappers/plan.js";
import {workoutMapper} from "../../utils/mappers/workout.js";
import moment from "moment";
import {profileMapper} from "../../utils/mappers/profile.js";
import {categoryPlansMapper} from "../../utils/mappers/categoryPlans.js";

async function resetDatabase() {
    await db.executeQuery('DELETE FROM user')
    await db.executeQuery("ALTER TABLE user AUTO_INCREMENT=1")
    await db.executeQuery('DELETE FROM plan')
    await db.executeQuery("ALTER TABLE plan AUTO_INCREMENT=1")
    await db.executeQuery('DELETE FROM workout')
    await db.executeQuery("ALTER TABLE workout AUTO_INCREMENT=1")
    await db.executeQuery('DELETE FROM exercise')
    await db.executeQuery("ALTER TABLE exercise AUTO_INCREMENT=1")
    await db.executeQuery('DELETE FROM category')
    await db.executeQuery("ALTER TABLE category AUTO_INCREMENT=1")
}

async function fillDatabase() {
    // TODO: Prune database before inserting
    await resetDatabase();

    // Creating Gym Goer Users
    const gymGoerUsers = Array.from({ length: 100 }, () => ([
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.internet.avatar(),
    ]));

    const gymGoerIds = Array.from({length: 100}, (_, i) => i + 1);
    const gymGoers = gymGoerIds.map((id) => [
        id,
        parseFloat(faker.number.float({ min: 30, max: 150, precision: 0.1 })),            // Weight
        parseFloat(faker.number.float({ min: 140, max: 230, precision: 0.1 })),           // Height
        faker.date.past({ years: 60 }),                                                   // Birthday
        faker.helpers.arrayElement(['free', 'basic', 'silver', 'gold'])                     // Membership Type
    ])

    await db.executeQuery('INSERT INTO user (email, password, username, avatar) VALUES ?', [gymGoerUsers])
    await db.executeQuery('INSERT INTO gym_goer (goer_id, weight, height, birthday, membership_type) VALUES ?', [gymGoers])

    // Creating Fitness Influencer Users
    const influencerUsers = Array.from({ length: 20 }, () => ([
        faker.internet.email(),
        faker.internet.password(),
        faker.internet.userName(),
        faker.internet.avatar(),
    ]));

    const influencerIds = Array.from({length: 20}, (_, i) => i + 101);
    const influencers = influencerIds.map((id) => [
        id,
        faker.person.firstName(),
        faker.person.lastName(),
        getRandomInt(1, 20),
        faker.internet.avatar(),
        faker.internet.url(),
        faker.lorem.text()
    ])

    await db.executeQuery('INSERT INTO user (email, password, username, avatar) VALUES ?', [influencerUsers])
    await db.executeQuery('INSERT INTO fitness_influencer (influencer_id, first_name, last_name, experience, photo, website, bio) VALUES ?', [influencers])

    // Creating Categories
    const categories = defaultCategories.map((c) => [c.name, c.description, faker.image.urlLoremFlickr()])
    await db.executeQuery('INSERT INTO category (name, description, image) VALUES ?', [categories])

    // Creating Exercises
    const exercises = defaultExercises.map((e) => [e.name, e.description, e.equipment, e.calories_burned, JSON.stringify(e.muscle_groups), faker.image.urlLoremFlickr()])
    await db.executeQuery('INSERT INTO exercise (name, description, equipment, calories_burned, muscle_groups, image) VALUES ?', [exercises])

    let availablePlans = 0;

    for (let id = 1; id <= categories.length; id++) {
        const numberOfPlansInCategory = 1
        // const numberOfPlansInCategory = getRandomInt(3, 15)
        availablePlans += numberOfPlansInCategory;

        for (let i = 1; i <= numberOfPlansInCategory; i++) {
            const planDuration = getRandomInt(7, 30);
            const influencerId = getRandomInt(101, 119);

            const plan = {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                goal: faker.lorem.words(),
                duration: planDuration,
                image: faker.image.url(),
                createdAt: faker.date.recent(),
                influencerId,
                categoryId: id,
            }

            const planQuery = 'INSERT INTO plan (title, description, goal, duration, created_at, image, influencer_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
            const params = [plan.title, plan.description, plan.goal, plan.duration, plan.createdAt, plan.image, plan.influencerId, plan.categoryId]
            await db.executeQuery(planQuery, params)

            const [records] = await db.executeQuery('SELECT LAST_INSERT_ID() as planId From plan;')
            const { planId } = records
            console.log('plan id', planId)

            // Create workouts for the whole plan duration (1 workout for each day)
            for (let day = 1; day <= planDuration; day++) {

                const workout = {
                    title: faker.lorem.words(),
                    difficulty: faker.helpers.arrayElement(['easy', 'medium', 'hard']),
                    duration: getRandomInt(30, 120),
                    image: faker.image.url(),
                    scheduledDay: day,
                    planId,
                    influencerId,
                }

                await db.executeQuery('INSERT INTO workout (title, difficulty, duration, image, scheduled_day, plan_id, influencer_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                    workout.title, workout.difficulty, workout.duration, workout.image, workout.scheduledDay, workout.planId, workout.influencerId
                ])

                const [records] = await db.executeQuery('SELECT LAST_INSERT_ID() as workoutId From workout;')
                const { workoutId } = records

                // Create a random number of sets for the workout
                const numberOfSets = getRandomInt(10, 20)
                const sets = []

                for (let setNo = 1; setNo <= numberOfSets; setNo++) {
                    const exerciseId = getRandomInt(1, defaultExercises.length)
                    const reps = getRandomInt(1, 3)
                    let durationInSeconds = faker.helpers.arrayElement([10, 15, 30, 60])    // Duration in seconds
                    let duration = moment.duration(durationInSeconds, 'seconds');
                    let breakTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

                    const set = [
                        setNo,
                        workoutId,
                        exerciseId,
                        reps,
                        breakTime,
                    ]

                    sets.push(set)
                }

                await db.executeQuery('INSERT INTO `set` (set_no, workout_id, exercise_id, reps, break_time) VALUES ?', [sets])
            }
        }
    }

    // Make some subscriptions
    const subscriptions = []

    for (let gymGoerId = 1; gymGoerId <= gymGoerIds.length; gymGoerId++ ) {
        // Choose a random number of plans to subscribe to
        const plansToSubscribe = getRandomInt(5, 10)
        const subscribedPlanIds = []


        for (let i = 0; i < plansToSubscribe; i++) {
            // Select a random plan to subscribe to, from the list of available plans
            const planId = getRandomInt(1, availablePlans)
            if (subscribedPlanIds.includes(planId)) continue;   // Skip if randomly generated plan already subscribed

            const subscriptionDate = faker.date.past({ years: 1 })
            subscriptions.push([gymGoerId, planId, subscriptionDate])
            subscribedPlanIds.push(planId)
        }
    }

    await db.executeQuery('INSERT INTO subscription (goer_id, plan_id, subscribe_date) VALUES ?', [subscriptions])

    // Complete some workouts
    const completedWorkouts = []

    for (let gymGoerId = 1; gymGoerId <= gymGoerIds.length; gymGoerId++ ) {

        const subscribedPlans = await db.executeQuery('SELECT p.id FROM subscription AS s INNER JOIN plan AS p ON p.id = s.plan_id WHERE goer_id = ?', [gymGoerId])

        for (const plan of subscribedPlans) {
            const planWorkouts = await db.executeQuery('SELECT id FROM workout WHERE plan_id = ?', [plan.id])
            const workoutsToSubscribe = getRandomInt(2, planWorkouts.length)
            for (let i = 0; i < workoutsToSubscribe; i++) {
                const workoutId = planWorkouts[i].id
                const completedDate = faker.date.past({ years: 1 })
                completedWorkouts.push([gymGoerId, workoutId, completedDate])
            }
        }
    }

    await db.executeQuery('INSERT INTO gym_goer_workout (goer_id, workout_id, completed_date) VALUES ?', [completedWorkouts])

   // Create friendships between gym_goers
   const friendships = []

   for (let i = 0; i < gymGoerIds.length - 1; i++) {
    const otherGoers = gymGoerIds.slice(i + 1)
    const randomIndex = getRandomInt(0, otherGoers.length - 2)
    friendships.push([gymGoerIds[i], otherGoers[randomIndex]])
   }
    await db.executeQuery('INSERT INTO friendship (goer_a_id, goer_b_id) VALUES ?', [friendships])

   // Create followers
   let followers = []

   for (const influencerId of influencerIds) {
        const followersIds = []
        const numberOfFollowers = getRandomInt(0, 20)
        for (let i = 0; i < numberOfFollowers; i++) {
            const gymGoerId = getRandomInt(1, 100)
            if (followersIds.includes(gymGoerId)) continue
            followersIds.push(gymGoerId)
        }
        followers = [...followers, ...followersIds.map((followerId) => { return [influencerId, followerId]})]
    }

    await db.executeQuery('INSERT INTO follower (influencer_id, goer_id) VALUES ?', [followers])

    return 'Database filled!'
}

async function getGymGoers() {
    const query = 'SELECT u.id, u.username, u.email, u.avatar FROM user as u inner join gym_goer as gg on u.id = gg.goer_id';
    return await db.executeQuery(query);
}

async function getInfluencers() {
    const query = 'SELECT u.id, u.username, u.email, u.avatar FROM user as u inner join fitness_influencer as f on u.id = f.influencer_id';
    return await db.executeQuery(query);
}

async function getCategories() {
    return await db.executeQuery('SELECT * FROM category');
}

async function getCategoryPlans(id) {
    const query = 'SELECT c.id as category_id, c.name, c.image, ' +
      'p.id as plan_id, p.title, p.description as plan_description, p.goal, p.duration, p.created_at  ' +
      'FROM plan as p INNER JOIN category as c ON p.category_id = c.id WHERE c.id = ?;';

    const result = await db.executeQuery(query, [id]);
    return categoryPlansMapper(result)
}

async function getPlanById(id, userId) {
    const query = 'SELECT p.id as plan_id, p.title as plan_title, p.description, p.goal, p.duration as plan_duration, p.created_at, p.influencer_id, ' +
      'w.id as workout_id, w.title as workout_title, w.difficulty, w.duration as workout_duration, w.image, w.scheduled_day, s.subscribe_date, ' +
      'CONCAT(f.first_name, \' \', f.last_name) as influencer_name FROM plan as p INNER JOIN workout as w ON p.id = w.plan_id ' +
      'INNER JOIN fitness_influencer AS f ON f.influencer_id = p.influencer_id LEFT OUTER JOIN subscription as s on s.plan_id = p.id AND s.goer_id = ? ' +
      'WHERE p.id = ? ORDER BY w.scheduled_day ASC;'
    const result = await db.executeQuery(query, [userId, id]);
    return planMapper(result)
}

async function getWorkoutById(id, userId) {
    const query = 'SELECT w.id AS workout_id, w.title, w.difficulty, w.duration, w.scheduled_day, s.set_no, s.reps, ' +
      's.break_time, s.calories, e.name as exercise_name, e.description as exercise_desc, e.image as exercise_image, e.equipment, e.muscle_groups, gw.completed_date FROM workout AS w ' +
      'INNER JOIN `set` AS s ON w.id = s.workout_id INNER JOIN exercise AS e ON s.exercise_id = e.id LEFT OUTER JOIN gym_goer_workout as gw ' +
      'ON gw.workout_id = w.id AND gw.goer_id = ? WHERE w.id = ?;'
    const result = await db.executeQuery(query, [userId, id]);
    return workoutMapper(result)
}

async function subscribe(planId, userId) {
    const results = await db.executeQuery('SELECT * FROM subscription WHERE goer_id = ? AND plan_id = ?', [userId, planId]);
    if (results.length)
        throw new Error('Plan already subscribed!')

    const query = 'INSERT INTO subscription (goer_id, plan_id) VALUES (?, ?)'
    return await db.executeQuery(query, [userId, planId]);
}

async function completeWorkout(workoutId, userId) {
    const results = await db.executeQuery('SELECT * FROM gym_goer_workout WHERE goer_id = ? AND workout_id = ?', [userId, workoutId]);
    if (results.length)
        throw new Error('Workout already completed!')
    const query = 'INSERT INTO gym_goer_workout (goer_id, workout_id) VALUES (?, ?)'
    return await db.executeQuery(query, [userId, workoutId]);
}

async function getNextWorkoutId(workoutId, planId) {
    const query = 'SELECT * FROM workout AS w INNER JOIN plan AS p ON w.plan_id = p.id WHERE w.id > ? AND p.id = ? ORDER BY w.id LIMIT 1;'
    return await db.executeQuery(query, [workoutId, planId]);
}

// Report 1
//does not include date range
async function getBestPlanByGoer(goerId){
    const query = 'select plan.title, sum(calories_burned) as total_calories from gym_goer_workout join workout on gym_goer_workout.workout_id = workout.id join plan on workout.plan_id = plan.id where gym_goer_workout.goer_id = ? and gym_goer_workout.completed_date >= date_sub(now(), interval 30 day) group by plan.id order by total_calories desc limit 1;'
    return await db.executeQuery(query, [goerId]);
}

// Report 2
//does not include date range
async function getBestPlanByCategory(categoryId){
     const query = 'select plan.title, count(goer_id) as total_subscribers from subscription join plan on subscription.plan_id = plan.id join category on plan.category_id = category.id where category_id = ? and subscription.subscribe_date >= date_sub(now(), interval 30 day) group by plan.id order by total_subscribers desc limit 1;'
     return await db.executeQuery(query, [categoryId])
}

async function getProfileInfo(userId) {
    const [gymGoerInfo] = await db.executeQuery('SELECT * FROM gym_goer AS gg INNER JOIN user AS u ON u.id = gg.goer_id WHERE u.id = ?', [userId])

    const subscriptionsQuery = 'SELECT p.id, p.title, p.goal, p.duration FROM subscription AS s INNER JOIN plan AS p ' +
      'ON p.id = s.plan_id WHERE s.goer_id = ?'
    const subscriptions = await db.executeQuery(subscriptionsQuery, [userId])

    const friendsQuery = 'SELECT u.id, u.username FROM user AS u WHERE u.id IN (' +
      'SELECT IF(goer_a_id = ?, goer_b_id, goer_a_id) AS friend_id FROM friendship WHERE goer_a_id = ? OR goer_b_id = ?);'
    const friends = await db.executeQuery(friendsQuery, [userId, userId, userId])

    const followingQuery = 'SELECT u.id, u.username FROM follower AS f INNER JOIN fitness_influencer AS i ON ' +
      'i.influencer_id = f.influencer_id INNER JOIN user as u ON u.id = i.influencer_id WHERE goer_id = ?'
    const following = await db.executeQuery(followingQuery, [userId])
    return profileMapper(gymGoerInfo, friends, following, subscriptions)
}


export default {
    getGymGoers,
    getInfluencers,
    getCategoryPlans,
    getCategories,
    fillDatabase,
    getPlanById,
    getWorkoutById,
    subscribe,
    completeWorkout,
    getNextWorkoutId,
    getBestPlanByGoer,
    getBestPlanByCategory,
    getProfileInfo
}