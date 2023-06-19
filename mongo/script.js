const db = new Mongo().getDB("fitness-app-mongo-db");

db.createCollection("user", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                email: {
                    bsonType: "string",
                    description: "email address of the user"
                },
                password: {
                    bsonType: "string",
                    description: "password of the user"
                },
                username: {
                    bsonType: "string",
                    description: "username of the user"
                },
                avatar: {
                    bsonType: "string",
                    description: "link to avatar"
                },
                gymGoer: {
                    bsonType: "object",
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
                                bsonType: "object",
                                properties: {
                                    _id: {
                                        bsonType: "ObjectId",
                                        description: "friend's _id"
                                    },
                                    username: {
                                        bsonType: "string",
                                        description: "friend's username"
                                    }
                                }
                            }
                        },
                        subscriptions: {
                            bsonType: "array",
                            description: "array holding the revelant info (for the my plans page) of plans that the user subscribes to",
                            items: {
                                bsonType: "object",
                                properties: {
                                    _id: {
                                        bsonType: "ObjectId",
                                        description: "_id of the plan"
                                    },
                                    title: {
                                        bsonType: "string",
                                        description: "tiel of the plan"
                                    },
                                    goal: {
                                        bsonType: "string",
                                        description: "goal of the plan"
                                    },
                                    duration: {
                                        bsonType: "int",
                                        description: "number of weeks plan takes to complete"
                                    }
                                }
                            }
                        },
                        follows: {
                            bsonType: "array",
                            description: "array holding the ids of the influencer the gym goer follows",
                            items: {
                                bsonType: "object",
                                properties: {
                                    _id: {
                                        bsonType: "ObjectId",
                                        description: "_id of the influencer"
                                    },
                                    username: {
                                        bsonType: "string",
                                        description: "username of the influencer"
                                    }
                                }
                            }
                        }
                    }
                },
        
                fitnessInfluencer: {
                    bsonType: "objectId",
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
                                  description: "_id of plan created by influencer"
                                }  
                            }
                        }
                    }
                }
            }
        }
    }
});
db.user.createIndex({"username": 1, "password": 1})

db.createCollection("completedWorkouts", {
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
                }
            }
        }
    }
})
db.completedWorkouts.createIndex({"goerId":1, "dateCompleted":-1})

db.createCollection("subscription", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                goerId: {
                    bsonType: "ObjectId",
                    description: "user who has subscribed"
                },
                planId: {
                    bsonType: "ObjectId",
                    description: "plan the user subscribed to"
                },
                subscriptionDate: {
                    bsonType: "date",
                    description: "date the user subscribed"
                }
            }
        }
    }
});
db.subscription.createIndex({"planId":1, "subscriptionDate":-1})

db.createCollection("exercise",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                name: {
                    bsonType: "string",
                    description: " name of the exercise"
                },
                description: {
                    bsonType: "string",
                    description: "a brief description of how to do the exercise"
                },
                image: {
                    bsonType: "string",
                    description: "url of the image"
                },
                equipment: {
                    bsonType: "string",
                    description: "list of equipment needed to do the exercise"
                },
                caloriesBurned: {
                    bsonType: "double",
                    description: "how many calories are burned in one rep of the exercise"
                },
                muscleGroups: {
                    bsonType: "array",
                    description: "list of muscle groups targeted by the exercise",
                    items: {
                      bsonType: "string",
                      description: "one muscle group targeted by exercise"
                    }
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
                    description: "title for the plan"
                },
                description: {
                    bsonType: "string",
                    description: "description of the plan"
                },
                goal: {
                    bsonType: "string",
                    description: "goal to be accomplished by the plan"
                },
                duration: {
                    bsonType: "int",
                    description: "number of days the plan takes to complete"
                },
                workoutsInfo: {
                    bsonType: "array",
                    description: "list of workouts in the plan",
                    items: {
                        bsonType: "Object",
                        properties: {
                            _id: {
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
                            },
                            scheduledDay: {
                                bsonType: "int",
                                description: "day number from the start of the plan"
                            }
                        }
                    }
                },
                createdBy: {
                    bsonType: "object",
                    properties: {
                        _id: {
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
                },
                category: {
                    bsonType: "object",
                    properties: {
                        _id: {
                          bsonType: "ObjectId",
                          description: "_id of the category the plan is in"
                        },
                        name: {
                            bsonType: "string",
                            description: "name of the category the plan is in"
                        }
                    }
                }
            }
        }
    }
});
db.plan.createIndex({"category.categoryId": 1});

db.createCollection("workout",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                title: {
                    bsonType: "string",
                    description: "title of the workout"
                },
                difficulty: {
                    bsonType: "string",
                    description: "level of difficulty of the workout"
                },
                duration: {
                    bsonType: "int",
                    description: "how long the workout takes to complete in minutes"
                },
                image: {
                    bsonType: "string",
                    description: "url of image"
                },
                scheduledDay: {
                    bsonType: "int",
                    description: "on which day in the plan does this workout fall"
                },
                caloriesBurned: {
                    bsonType: "double",
                    description: "calories burned in workout"
                },
                plan: {
                    bsonType: "object",
                    properties: {
                        _id: {
                            bsonType: "ObjectId",
                            description: "_id of the plan the workout is part of"
                        },
                        title: {
                            bsonType: "string",
                            description: "title of the plan the workout is part of"
                        }
                    }
                },
                creator:{
                    bsonType: "ObjectId",
                    description: "foreign key referencing the id of the fitness influencer who created this workout"
                },
                sets: {
                    bsonType: "array",
                    description: "array of sets within workout",
                    items: {
                        bsonType: "Object",
                        properties: {
                            setNo: {
                                bsonType: "int",
                                description: "the ordered value in which to perform the set"
                            },
                            reps: {
                                bsonType: "int",
                                description: "the number of reps of the exercise to be done"
                            },
                            breakTime: {
                                bsonType: "int",
                                description: "the amount of time to rest between sets"
                            },
                            caloriesBurned: {
                                bsonType: "double",
                                description: "calories burned by doing all the reps in the set"
                            },
                            exercise: {
                                bsonType: "object",
                                properties: {
                                    name: {
                                        bsonType: "string",
                                        description: " name of the exercise"
                                    },
                                    description: {
                                        bsonType: "string",
                                        description: "a brief description of how to do the exercise"
                                    },
                                    image: {
                                        bsonType: "string",
                                        description: "url of the image"
                                    },
                                    equipment: {
                                        bsonType: "string",
                                        description: "list of equipment needed to do the exercise"                                    },
                                    calories: {
                                        bsonType: "double",
                                        description: "how many calories are burned in one rep of the exercise"                                    },
                                    muscleGroups: {
                                        bsonType: "array",
                                        description: "list of muscle groups targeted by the exercise",
                                        items: {
                                          bsonType: "string",
                                          description: "one muscle group targeted by exercise"
                                        }
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
db.workout.createIndex({"creator": 1});

db.createCollection("category",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                name: {
                    bsonType: "string",
                    description: "name of the category"
                },
                description: {
                    bsonType: "string",
                    description: "a brief description of the category"
                },
                image: {
                    bsonType: "string",
                    description: "url containing image"
                }
            }
        }
    }
});