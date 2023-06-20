import mongoServices from './mongo/services.js'
import mysqlDb from './mysql/db.service.js'
import {db} from "./mongo/db.service.js";
import {ObjectId} from "mongodb";

let userIdMapper = {}
let planIdMapper = {}
let categoryIdMapper = {}
let exerciseIdMapper = {}
let workoutIdMapper = {}

async function initializeIdMappers() {
    const categories = await mysqlDb.executeQuery('SELECT * FROM category');
    categoryIdMapper = categories.reduce((prev, cur) => ({...prev, [cur.id]: new ObjectId(cur.id)}), {});

    const plans = await mysqlDb.executeQuery('SELECT * FROM plan');
    planIdMapper = plans.reduce((prev, cur) => ({...prev, [cur.id]: new ObjectId(cur.id)}), {});

    const workouts = await mysqlDb.executeQuery('SELECT * FROM workout');
    workoutIdMapper = workouts.reduce((prev, cur) => ({...prev, [cur.id]: new ObjectId(cur.id)}), {});

    const users = await mysqlDb.executeQuery('SELECT * FROM user');
    userIdMapper = users.reduce((prev, cur) => ({...prev, [cur.id]: new ObjectId(cur.id)}), {});

    const exercises = await mysqlDb.executeQuery('SELECT * FROM exercise');
    exerciseIdMapper = exercises.reduce((prev, cur) => ({...prev, [cur.id]: new ObjectId(cur.id)}), {});
}

async function migrateGymGoers() {
    const gymGoers = await mysqlDb.executeQuery('SELECT * FROM user AS u INNER JOIN gym_goer AS gg ON u.id = gg.goer_id');

    const gymGoerDocuments = gymGoers.map((row) => {
        return {
            _id: row.id,
            email: row.email,
            password: row.password,
            username: row.username,
            avatar: row.avatar,
            gymGoer: {
                weight: row.weight,
                height: row.height,
                age: row.age,
                birthday: row.birthday,
                membershipType: row.membership_type
            },
        }
    });

    return await Promise.all(gymGoerDocuments.map(async ({_id, ...user}) => {
        const subscriptionsQuery = 'SELECT p.id, p.title, p.goal, p.duration FROM subscription AS s INNER JOIN plan AS p ' +
          'ON p.id = s.plan_id WHERE s.goer_id = ?'
        const subscriptions = await mysqlDb.executeQuery(subscriptionsQuery, [_id])

        const friendsQuery = 'SELECT u.id, u.username FROM user AS u WHERE u.id IN (' +
          'SELECT IF(goer_a_id = ?, goer_b_id, goer_a_id) AS friend_id FROM friendship WHERE goer_a_id = ? OR goer_b_id = ?);'
        const friends = await mysqlDb.executeQuery(friendsQuery, [_id, _id, _id])

        const followingQuery = 'SELECT u.id, u.username FROM follower AS f INNER JOIN fitness_influencer AS i ON ' +
          'i.influencer_id = f.influencer_id INNER JOIN user as u ON u.id = i.influencer_id WHERE goer_id = ?'
        const following = await mysqlDb.executeQuery(followingQuery, [_id])

        return {
            _id: userIdMapper[_id],
            ... user,
            subscriptions: subscriptions.map(row => {
                return {
                    _id: planIdMapper[row.id],
                    title: row.title,
                    duration: row.duration,
                    goal: row.goal
                }
            }),
            friends: friends.map(friend => {
                return {
                    _id: userIdMapper[friend.id],
                    username: friend.username
                }
            }),
            following: following.map(influencer => {
                return {
                    _id: userIdMapper[influencer.id],
                    username: influencer.username
                }
            })
        }
    }));
}

async function migrateInfluencers() {
    const influencers = await mysqlDb.executeQuery('SELECT * FROM user AS u INNER JOIN fitness_influencer AS i ON u.id = i.influencer_id;');
    const influencerDocuments = influencers.map((row) => {
        return {
            _id: row.id,
            email: row.email,
            password: row.password,
            username: row.username,
            avatar: row.avatar,
            fitnessInfluencer: {
                firstName: row.first_name,
                lastName: row.last_name,
                experience: row.experience,
                bio: row.bio,
                website: row.website
            },
        }
    });

    return await Promise.all(influencerDocuments.map(async ({_id, ...user}) => {
        const createdPlans = await mysqlDb.executeQuery('SELECT id FROM plan WHERE influencer_id = ?', [_id])
        return {
            _id: userIdMapper[_id],
            ... user,
            createdPlans: createdPlans.map(plan => plan.id),
        }
    }));
}

async function migrateUsers(){
    const gymGoers = await migrateGymGoers()
    const influencers = await migrateInfluencers()
    const result =  await db.collection('user').insertMany([...gymGoers, ...influencers]);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating users!");
    }
}

async function migrateCategories(){
    const categories = await mysqlDb.executeQuery('SELECT * FROM category;');
    const categoryDocs = categories.map(({id, ...rest}) => { return { _id: categoryIdMapper[id], ...rest }})

    const result =  await db.collection('category').insertMany(categoryDocs);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating categories!");
    }
}

async function migrateExercises(){
    const exercises = await mysqlDb.executeQuery('SELECT * FROM exercise;');
    const exerciseDocs = exercises.map(({id, calories_burned, muscle_groups, ...rest}) => {
        return {
            _id: exerciseIdMapper[id],
            caloriesBurned: calories_burned,
            muscleGroups: muscle_groups,
            ...rest
        }
    })

    const result =  await db.collection('exercise').insertMany(exerciseDocs);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating exercises!");
    }
}

async function migratePlans() {
    const plans = await mysqlDb.executeQuery('SELECT p.id, p.title, p.description as plan_desc, p.goal, p.duration, p.created_at, ' +
      'p.image, f.influencer_id, f.first_name, f.last_name, c.id as category_id, c.name as category_name FROM plan AS p ' +
      'INNER JOIN fitness_influencer AS f ON f.influencer_id = p.influencer_id INNER JOIN category AS c ON c.id = p.category_id;');

    const planDocuments = await Promise.all(
      plans.map(async (row) => {
        const workouts = await mysqlDb.executeQuery('SELECT id, title, difficulty, duration, scheduled_day FROM workout WHERE plan_id = ?', [row.id])

        return {
            _id: planIdMapper[row.id],
            title: row.title,
            description: row.plan_desc,
            goal: row.goal,
            duration: row.duration,
            createdAt: row.created_at,
            image: row.image,
            createdBy: {
                _id: userIdMapper[row.influencer_id],
                firstName: row.first_name,
                lastName: row.last_name
            },
            category: {
                _id: categoryIdMapper[row.category_id],
                name: row.category_name
            },
            workouts: workouts.map(({id, scheduled_day, ...rest}) => {
                return {
                    _id: workoutIdMapper[id],
                    scheduledDay: scheduled_day,
                    ...rest}
            }),
        }
    }));

    const result =  await db.collection('plan').insertMany(planDocuments);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating plans!");
    }
}
async function migrateSubscriptions() {
    const subscriptions = await mysqlDb.executeQuery('SELECT * FROM subscription;');

    const result =  await db.collection('subscription').insertMany(subscriptions.map((s) => {
        return {
           planId: planIdMapper[s.plan_id],
           goerId: userIdMapper[s.goer_id],
           subscribeDate: s.subscribe_date,
        }
    }));


    if(!result.acknowledged) {
        throw new Error("Error while migrating subscriptions!");
    }
}

async function migrateWorkouts() {
    const workouts = await mysqlDb.executeQuery('SELECT * FROM workout AS w;');
    const workoutDocuments = await Promise.all(
      workouts.map(async (workout) => {
          const exerciseSets = await mysqlDb.executeQuery('SELECT * FROM `set` AS s INNER JOIN exercise AS e ON s.exercise_id = e.id WHERE s.workout_id = ?', [workout.id])

          const workoutDoc = {
              _id: workoutIdMapper[workout.id],
              title: workout.title,
              difficulty: workout.difficulty,
              duration: workout.duration,
              image: workout.image,
              scheduledDay: workout.scheduled_day,
              caloriesBurned: workout.calories_burned,
              sets: exerciseSets.map((row) => {
                  return {
                      setNo: row.set_no,
                      reps: row.reps,
                      breakTime: row.break_time,
                      calories: row.calories,
                      exercise: {
                          exerciseName: row.name,
                          description: row.description,
                          image: row.image,
                          equipment: row.equipment,
                          muscleGroups: row.muscle_groups,
                      }
                  }
              })
          }

          if (workout.plan_id) {
              const [row] = await mysqlDb.executeQuery('SELECT title FROM plan WHERE id = ?', [workout.plan_id]);

              workoutDoc.plan = {
                  _id: planIdMapper[workout.plan_id],
                  title: row.title,
              }
          }
          return workoutDoc
      }));

    const result =  await db.collection('workout').insertMany(workoutDocuments);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating workouts!");
    }
}

async function migrateCompletedWorkouts() {
    const completions = await mysqlDb.executeQuery('SELECT * FROM gym_goer_workout;');

    const result =  await db.collection('completedWorkout').insertMany(completions.map((c) => {
        return {
            workoutId: workoutIdMapper[c.workout_id],
            goerId: userIdMapper[c.goer_id],
            dateCompleted: c.completed_date,
        }
    }));


    if(!result.acknowledged) {
        throw new Error("Error while migrating completed workouts!");
    }
}


export async function migrateDatabase(){
    await mongoServices.resetDatabase()
    await initializeIdMappers()

    await migrateUsers()
    await migrateCategories()
    await migrateExercises()
    await migratePlans()
    await migrateSubscriptions()
    await migrateWorkouts()
    await migrateCompletedWorkouts()
}
