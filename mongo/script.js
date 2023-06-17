// db = new Mongo().getDB("fitness-app-mongo-db");

// db.createCollection("testCollection", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         properties: {
//           email: {
//             bsonType: "int",
//             description: "email address",
//             required: true
//           },
//           firstname: {
//             bsonType: "string",
//             description: "firstname of the user",
//             required: true
//           },
//           lastname: {
//             bsonType: "string",
//             description: "lastname for the user",
//             required: true
//           }
//         }
//       }
//     }
// });

db.createCollection("user", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                email: {
                    bsonType: "string",
                    description: "email address of the user",
                    required: true
                },
                password: {
                    bsonType: "string",
                    description: "password of the user", //needs to be hashed somehow
                    required: true
                },
                username: {
                    bsonType: "string",
                    description: "username of the user",
                    required: true
                },
                gymGoer: {
                    bsonType: "object",
                    required: ["weight", "height", "birthday", "age", "membershipType"],
                    properties: {
                        weight: {
                            bsonType: "int",
                            description: "gym goer's weight"
                        },
                        height: {
                            bsonType: "int",
                            description: "gym goer's height"
                        },
                        birthday: {
                            bsonType: "date",
                            description: "gym goer's birthday"
                        },
                        age: {
                            bsonType: "int",
                            description: "gym goer's age"
                        },
                        membershipType: {
                            bsonType: "string",
                            description: "gym goer's selected membership type"
                        },
                        friends: {
                            bsonType: "array",
                            description: "array holding the user's list of friends",
                            items: {
                              friendId: {
                                bsonType: "ObjectId",
                                description: "_id of friend of user"
                              }
                            }
                        },
                        subscriptions: {
                            bsonType: "array",
                            description: "array holding the _id of plans that the user subscribes to",
                            items: {
                              planId: {
                                bsonType: "ObjectId",
                                description: "_id of the plan the user is subscribed to"
                              }
                            }
                        },
                        follows: {
                            bsonType: "array",
                            description: "array holding the ids of the influencer the gym goer follows",
                            items: {
                                influencerId: {
                                  bsonType: "ObjectId",
                                  description: "_id of the influencer the gym goer follows"
                                }
                            }
                        }
                    }
                },
        
                fitnessInfluencer: {
                    bsonType: "objectId",
                    required: ["firstName", "lastName", "experience", "bio"],
                    properties: {
                        firstName: {
                            bsonType: "string",
                            description: "fitness influencer's first name"
                        },
                        lastName: {
                            bsonType: "string",
                            description: "fitness influencer's last name"
                        },
                        experience: {
                            bsonType: "int",
                            description: "years of experience fitness influencer has"
                        },
                        website: {
                            bsonType: "string",
                            description: "link to the fitness influencer's personal website"
                        },
                        bio: {
                            bsonType: "string",
                            description: "fitness influencer's biography"
                        },
                        createdPlans: {
                            bsonType: "array",
                            description: "array holding id's for plans created by the influencer",
                            items: {
                                planId: {
                                  bsonType: "ObjectId",
                                  description: "id for plan created by influencer"
                                }
                            }
                        },
                        unpublishedWorkouts: {
                            bsonType: "array",
                            description: "array holding ids for workouts created by the influencer",
                            items: {
                                workoutId:{
                                  bsonType: "ObjectId",
                                  description: "id for workout created by the influencer"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
//db.user.createIndex({"gymGoer.hasCompleted.completionDate":-1})

db.createCollection("hasCompleted", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                goerId: {
                    bsonType: "ObjectId",
                    description: "_id of the user who completed the workout"
                },
                workoutId: {
                    bsonType: "ObjectId",
                    description: "_id of the workout the user completed"
                },
                dateCompleted: {
                    bsonType: "date",
                    description: "date the workout was completed by the user"
                },
                caloriesBurned: {
                    bsonType: "double",
                    description: "calories burned in the workout -- from workout.caloriesBurned where workout._id = workoutId"
                },
                associatedPlanId: {
                    bsonType: "ObjectId",
                    description: "_id of the plan the workout is part of -- from workout.planId where workout.partOf = associatedPlanId"
                }
            }
        }
    }
})
db.hasCompleted.createIndex({"goerId":1, "dateCompleted":-1})

db.createCollection("exercise",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                name: {
                    bsonType: "string",
                    description: " name of the exercise",
                    required: true
                },
                description: {
                    bsonType: "string",
                    description: "a brief description of how to do the exercise",
                    required: true
                },
                image: {
                    bsonType: "string",
                    description: "url of the image",
                    required: true
                },
                equipment: {
                    bsonType: "string",
                    description: "list of equipment needed to do the exercise",
                    required: true
                },
                caloriesBurned: {
                    bsonType: "double",
                    description: "how many calories are burned in one rep of the exercise",
                    required: true
                },
                muscleGroups: { //array
                    bsonType: "array",
                    description: "list of muscle groups targeted by the exercise",
                    items: {
                      bsonType: "string",
                      description: "one muscle group targeted by exercise"
                    },
                    required: true
                }
            }
        }
    }
});

db.createCollection("plan", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                title: {
                    bsonType: "string",
                    description: "title for the plan",
                    required: true
                },
                description: {
                    bsonType: "string",
                    description: "description of the plan",
                    required: true
                },
                goal: {
                    bsonType: "string",
                    description: "goal to be accomplished by the plan",
                    required: true
                },
                duration: {
                    bsonType: "int",
                    description: "number of weeks the plan takes to complete",
                    required: true
                },
                workoutsInfo: { //this is an example of denormalization
                    bsonType: "array",
                    description: "list of workouts in the plan",
                    items: {
                        workoutVals: "Object", 
                        properties: {
                            workoutId: {
                                bsonType: "ObjectId",
                                description: "_id of workout in plan"
                            },
                            title: {
                                bsonType: "string",
                                description: "title of the workout in the plan"
                            },
                            difficulty: {
                                bsonType: "string",
                                description: "difficulty of the workout in the plan"
                            },
                            duration: {
                                bsonType: "int",
                                description: "length of the workout in the plan"
                            }
                        }
                    }
                },
                subscribers: {
                    bsonType: "array",
                    description: "array holding the subscriber ids and subscription dates",
                    items: {
                        bsonType: "object",
                        properties: {
                            subscriberId: {
                                bsonType: "ObjectId",
                                description: "id of goer who subscribed to the plan"
                            },
                            subscriptionDate: {
                                bsonType: "date",
                                description: "date the subscriber subscribed to the plan"
                            }
                        }
                    }
                },
                createdBy: {
                    bsonType: "array",
                    description: "array holding info about the creator of the plan",
                    items: {
                        bsonType: "object",
                        properties: {
                            creatorId: {
                                bsonType: "ObjectId",
                                description: "_id for the creator of the plan"
                            },
                            firstName: {
                                bsonType: "string",
                                description: "first name of the creator of the plan"
                            },
                            lastName: {
                                bsonType: "string",
                                description: "last name of the creator of the plan"
                            }
                        }
                    }
                },
                category: {
                    bsonType: "object",
                    properties: {
                        categoryId: {
                          bsonType: "ObjectId",
                          description: "_id of the category the plan is in"
                        },
                        categoryName: {
                            bsonType: "string",
                            description: "name of the category the plan is in"
                        }
                    }
                }
            }
        }
    }
});
db.plan.createIndex({"category.categoryId": 1},{"subscribers.subscriptionDate":-1});

db.createCollection("workout",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                title: {
                    bsonType: "string",
                    description: "title of the workout",
                    required: true
                },
                difficulty: {
                    bsonType: "string",
                    description: "level of difficulty of the workout",
                    required: true
                },
                duration: {
                    bsonType: "int",
                    description: "how long the workout takes to complete in minutes",
                    required: true
                },
                image: {  
                    bsonType: "string",
                    description: "url of image",
                    required: true
                },
                scheduledDay: {
                    bsonType: "int",
                    description: "on which day in the plan does this workout fall",
                    required: true
                },
                partOf: {
                    bsonType: "objectId",
                    description: "foreign key referencing the id of the Plan this Workout is a part of",
                    required: true
                },
                sets: {
                    bsonType: "array",
                    description: "array of sets within workout",
                    items: {
                        bsonType: "Object",
                        properties: {
                            setNo: {
                                bsonType: "int",
                                description: "the ordered value in which to perform the set",
                                required: true
                            },
                            reps: {
                                bsonType: "int",
                                description: "the number of reps of the exercise to be done",
                                required: true
                            },
                            breakTime: {
                                bsonType: "int",
                                description: "the amount of time to rest between sets",
                                required: true
                            },
                            caloriesBurned: {
                                bsonType: "double",
                                description: "calories burned by doing all the reps in the set",
                            },
                            exercise: {
                                bsonType: "object",
                                properties: {
                                    title: {
                                        bsonType: "string",
                                        description: " name of the exercise",
                                        required: true
                                    },
                                    description: {
                                        bsonType: "string",
                                        description: "a brief description of how to do the exercise",
                                        required: true
                                    },
                                    image: {
                                        bsonType: "string",
                                        description: "url of the image",
                                        required: true
                                    },
                                    equipment: {
                                        bsonType: "string",
                                        description: "list of equipment needed to do the exercise",
                                        required: true
                                    },
                                    caloriesBurned: {
                                        bsonType: "double",
                                        description: "how many calories are burned in one rep of the exercise",
                                        required: true
                                    },
                                    muscleGroups: { //array
                                        bsonType: "array",
                                        description: "list of muscle groups targeted by the exercise",
                                        items: {
                                          bsonType: "string",
                                          description: "one muscle group targeted by exercise"
                                        },
                                        required: true
                                    }
                                }
                            }
                        }
                    },
                }
            }
        }
    }
});

db.createCollection("category",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                title: {
                    bsonType: "string",
                    description: "title of the category",
                    required: true
                },
                description: {
                    bsonType: "string",
                    description: "a brief description of the category",
                    required: true
                },
                image: {
                    bsonType: "string",
                    description: "url containing image",
                    required: true
                }
            }
        }
    }
});