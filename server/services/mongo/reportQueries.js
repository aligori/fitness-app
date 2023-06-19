// async function bestPlanByGoer(goerId) {
//     const pipeline = [
//       // Match completed workouts for the given goerId
//       {
//         $match: {
//           goerId: goerId,
//           subscriptionDate: {
//             $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Filter for last 30 days
//           }
//         }
//       },
//       // Lookup workout details based on workoutId
//       {
//         $lookup: {
//           from: "Workout",
//           localField: "workoutId",
//           foreignField: "_id",
//           as: "workout"
//         }
//       },
//       // Unwind the workout array
//       {
//         $unwind: "$workout"
//       },
//       // Group by planTitle and calculate the sum of caloriesBurned
//       {
//         $group: {
//           _id: "$workout.plan.title",
//           totalCalories: { $sum: "$workout.caloriesBurned" }
//         }
//       },
//       // Sort by totalCalories in descending order
//       {
//         $sort: {
//           totalCalories: -1
//         }
//       },
//       // Limit to the first document (highest totalCalories)
//       {
//         $limit: 1
//       },
//       // Project the fields for the output
//       {
//         $project: {
//           _id: 0,
//           planTitle: "$_id",
//           totalCalories: 1
//         }
//       }
//     ];
  
//     const result = await db.completedWorkouts.aggregate(pipeline).next();
//     return result;
//   }
  
    
//   async function bestPlanByCategory(categoryId) {
//     const pipeline = [
//       {
//         $lookup: {
//           from: "Plan",
//           localField: "planId",
//           foreignField: "_id",
//           as: "plan"
//         }
//       },
//       {
//         $unwind: "$plan"
//       },
//       {
//         $match: {
//           "plan.category._id": categoryId,
//           subscriptionDate: {
//             $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Filter for last 30 days
//           }
//         }
//       },
//       {
//         $group: {
//           _id: "$planId",
//           plan: { $first: "$plan" },
//           subscriptionCount: { $sum: 1 } //Count each row as 1 after filtering
//         }
//       },
//       {
//         $sort: {
//           subscriptionCount: -1
//         }
//       },
//       {
//         $limit: 1
//       },
//       {
//         $project: {
//           _id: 0,
//           planTitle: "$plan.planTitle",
//           subscriptionCount: 1
//         }
//       }
//     ];
  
//     const result = await db.Subscriptions.aggregate(pipeline).next();
//     return result;
//   }
  