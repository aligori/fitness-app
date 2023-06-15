import db from './db.service.js'
import { faker } from '@faker-js/faker'
import {getRandomInt} from "../../utils/helpers.js";
import {defaultCategories} from "../../data/categories.js";
import {defaultExercises} from "../../data/exercises.js";
import moment from "moment";

async function createTest(data) {
    const query = 'INSERT INTO test (firstname, lastname, email) VALUES (?, ?, ?)';
    const params = [data.firstname, data.lastname, data.email]

    return await db.executeQuery(query, params);
}

async function getTest() {
    const query = 'SELECT * FROM test';
    return await db.executeQuery(query);
}

async function fillDatabase() {
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

    const influencerIds = Array.from({length: 20}, (_, i) => i + 100);
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
        const numberOfPlansInCategory = getRandomInt(3, 15)
        availablePlans += numberOfPlansInCategory;

        for (let i = 1; i <= numberOfPlansInCategory; i++) {
            const planDuration = getRandomInt(7, 30);
            const influencerId = getRandomInt(100, 119);

            const plan = {
                title: faker.lorem.words(),
                description: faker.lorem.paragraph(),
                goal: faker.lorem.words(),
                duration: planDuration,
                createdAt: faker.date.recent(),
                influencerId,
                categoryId: id,
            }

            const planQuery = 'INSERT INTO plan (title, description, goal, duration, created_at, influencer_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const params = [plan.title, plan.description, plan.goal, plan.duration, plan.createdAt, plan.influencerId, plan.categoryId]
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
            // const planId = getRandomInt(1, 10)
            const planId = getRandomInt(1, availablePlans)
            if (subscribedPlanIds.includes(planId)) continue;   // Skip if randomly generated plan already subscribed

            const subscriptionDate = faker.date.past({ years: 1 })
            subscriptions.push([gymGoerId, planId, subscriptionDate])
            subscribedPlanIds.push(planId)
        }
    }

    await db.executeQuery('INSERT INTO subscription (goer_id, plan_id, subscribe_date) VALUES ?', [subscriptions])

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
    const query = 'SELECT * FROM user as u inner join gym_goer as gg on u.id = gg.goer_id';
    return await db.executeQuery(query);
}

async function getInfluencers() {
    const query = 'SELECT * FROM user as u inner join fitness_influencer as f on u.id = f.influencer_id';
    return await db.executeQuery(query);
}

async function getCategories() {
    return await db.executeQuery('SELECT * FROM category');
}

async function getPlan() {
    // Use Mapper
    return await db.executeQuery('SELECT w.plan_id AS plan_id, p.title AS plan_title,w.id AS workout_id, w.title AS workout_title FROM plan AS p inner join workout AS w ON p.id = w.plan_id WHERE p.id = 1');
}

export default { createTest, getTest, getGymGoers, getInfluencers, getPlan, getCategories, fillDatabase }