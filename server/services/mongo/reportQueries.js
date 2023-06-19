async function getBestPlanByGoer(userId) {
    const pipeline = [
      {
        $match: {
          "goerId": userId,
          "completedOn": {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Filter for last 30 days
          }
        }
      },
      {
        $group: {
          _id: "$associatedPlanId",
          totalCalories: { $sum: "$caloriesBurned" }
        }
      },
      {
        $lookup: {
          from: "plan",
          localField: "_id",
          foreignField: "_id",
          as: "plan"
        }
      },
      {
        $unwind: "$plan"
      },
      {
        $project: {
          _id: 0,
          planTitle: "$plan.title",
          totalCalories: 1
        }
      }
    ];
  
    const result = await db.completedWorkouts.aggregate(pipeline).toArray();
    return result;
  }
  




  async function getPlanWithMostNewSubscribers(categoryName) {
    const pipeline = [
      {
        $match: {
          "category.categoryName": categoryName
        }
      },
      {
        $unwind: "$subscribers"
      },
      {
        $match: {
          "subscribers.subscribeDate": {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Filter for last 30 days $gte means greater than or equal to
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          plan: { $first: "$$ROOT" }, //this stores the plan's data
          newSubscribers: { $sum: 1 }
        }
      },
      {
        $sort: {
          newSubscribers: -1
        }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          planTitle: "$plan.planTitle",
          newSubscribers: 1
        }
      }
    ];
  
    const result = await db.plan.aggregate(pipeline).toArray();
    return result;
  }
  