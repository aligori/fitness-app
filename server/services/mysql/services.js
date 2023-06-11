import db from './db.service.js'
import { faker } from '@faker-js/faker'
import {getRandomInt} from "../../utils/helpers.js";
import {defaultCategories} from "../../data/categories.js";
import {defaultExercises} from "../../data/exercises.js";

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

    for (let id = 1; id <= categories.length; id++) {
        const numberOfPlansInCategory = getRandomInt(3, 15)

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

            console.log('plan', plan)

            const planQuery = 'INSERT INTO plan (title, description, goal, duration, created_at, influencer_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
            const params = [plan.title, plan.description, plan.goal, plan.duration, plan.createdAt, plan.influencerId, plan.categoryId]
            await db.executeQuery(planQuery, params)

            console.log('hereeee')

            const [records] = await db.executeQuery('SELECT LAST_INSERT_ID() as planId From plan;')
            const { planId } = records
            console.log('plan id', planId)

            const workouts = [];

            for (let day = 1; day <= planDuration; day++) {
                // Create workouts
                const workout = [
                    faker.lorem.words(),
                    faker.helpers.arrayElement(['easy', 'medium', 'hard']),
                    getRandomInt(30, 120),
                    faker.image.url(),
                    day,
                    planId,
                    influencerId,
                ]
                workouts.push(workout)
            }

            await db.executeQuery('INSERT INTO workout (title, difficulty, duration, image, scheduled_day, plan_id, influencer_id) VALUES ?', [workouts])
        }
    }

    // TODO: FIX THIS: MongoServerError: $jsonSchema keyword 'required' must be an array, but found an element of type bool
    // fitness-app-mongo  | {"t":{"$date":"2023-06-09T19:03:06.112+00:00"},"s":"I",  "c":"NETWORK",  "id":22944,   "ctx":"conn12","msg":"Connection ended","att
    // r":{"remote":"127.0.0.1:47518","uuid":"626451f2-23a4-4cf8-9fa3-b3dfb79cc7b2","connectionId":12,"connectionCount":3}}


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

async function getPlans() {
    return await db.executeQuery('SELECT * FROM plan');
}

export default { createTest, getTest, getGymGoers, getInfluencers, getPlans, getCategories, fillDatabase }