import mongoServices from './mongo/services.js'
import mysqlDb from './mysql/db.service.js'
import {db} from "./mongo/db.service.js";

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

    return await Promise.all(gymGoerDocuments.map(async (user) => {
        const subscriptions = await mysqlDb.executeQuery('SELECT plan_id FROM subscription WHERE goer_id = ?', [user._id])
        const friends = await mysqlDb.executeQuery('SELECT IF(goer_a_id = ?, goer_b_id, goer_a_id) AS friend_id FROM friendship WHERE goer_a_id = ? OR goer_b_id = ?;', [user._id, user._id, user._id])
        const following = await mysqlDb.executeQuery('SELECT influencer_id FROM follower WHERE goer_id = ?', [user._id])

        return {
            ... user,
            subscriptions: subscriptions.map(sub => sub.plan_id),  // TODO: check these if ids or obj
            friends: friends.map(friend => friend.friend_id),      // TODO: check these if ids or obj
            following: following.map(influencer => influencer.influencer_id)   // TODO: check these if ids or obj
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

    return await Promise.all(influencerDocuments.map(async (user) => {
        const createdPlans = await mysqlDb.executeQuery('SELECT id FROM plan WHERE influencer_id = ?', [user._id])
        return {
            ... user,
            createdPlans: createdPlans.map(plan => plan.id),  // TODO: check these if ids or obj
            // Followers
            // TODO: not so sure about unpublished workouts
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
    const categoryDocs = categories.map(({id, ...rest}) => { return { _id: id, ...rest }})

    const result =  await db.collection('category').insertMany(categoryDocs);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating categories!");
    }
}

async function migrateExercises(){
    const exercises = await mysqlDb.executeQuery('SELECT * FROM exercise;');
    const exerciseDocs = exercises.map(({id, calories_burned, muscle_groups, ...rest}) => {
        return {
            _id: id,
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
    const plans = await mysqlDb.executeQuery('SELECT * FROM plan AS p INNER JOIN fitness_influencer AS f ON f.influencer_id = p.influencer_id INNER JOIN category AS c ON c.id = p.category_id;');
    const planDocuments = await Promise.all(
      plans.map(async (plan) => {
        const workouts = await mysqlDb.executeQuery('SELECT id, title, difficulty, duration, scheduled_day FROM workout WHERE plan_id = ?', [plan.id])
        const subscribers = await mysqlDb.executeQuery('SELECT goer_id, subscribe_date FROM subscription WHERE plan_id = ?', [plan.id])

        return {
            _id: plan.id,
            title: plan.title,
            description: plan.description,
            goal: plan.goal,
            duration: plan.duration,
            createdAt: plan.created_at,
            createdBy: {
                creatorId: plan.influencer_id,
                firstName: plan.first_name,
                lastName: plan.last_name
            },
            category: {
                categoryId: plan.category_id,
                categoryName: plan.name
            },
            workoutsInfo: workouts.map(({id, scheduled_day, ...rest}) => { return { _id: id, scheduledDay: scheduled_day, ...rest}}),
            subscribers: subscribers.map(({ goer_id, subscribe_date }) => { return { subscriberId: goer_id, subscribeDate: subscribe_date}})
        }
    }));

    const result =  await db.collection('plan').insertMany(planDocuments);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating plans!");
    }
}

async function migrateWorkouts() {
    const workouts = await mysqlDb.executeQuery('SELECT * FROM workout AS w;');
    const workoutDocuments = await Promise.all(
      workouts.map(async (workout) => {
          const exerciseSets = await mysqlDb.executeQuery('SELECT * FROM `set` AS s INNER JOIN exercise AS e ON s.exercise_id = e.id WHERE s.workout_id = ?', [workout.id])

          return {
              _id: workout.id,
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
      }));

    const result =  await db.collection('workout').insertMany(workoutDocuments);

    if(!result.acknowledged) {
        throw new Error("Something went wrong while migrating workouts!");
    }
}


export async function migrateDatabase(){
    await mongoServices.resetDatabase()
    await migrateUsers()
    await migrateCategories()
    await migrateExercises()
    await migratePlans()
    await migrateWorkouts()
    // migrate workout completions
}
