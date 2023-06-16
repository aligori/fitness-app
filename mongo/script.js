mongo/script.js

// db = new Mongo().getDB("fitness-app-mongo-db");

db.createCollection("testCollection", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        properties: {
          email: {
            bsonType: "int",
            description: "email address",
            required: true
          },
          firstname: {
            bsonType: "string",
            description: "firstname of the user",
            required: true
          },
          lastname: {
            bsonType: "string",
            description: "lastname for the user",
            required: true
          }
        }
      }
    }
});

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
              bsonType: "objectId",
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
                  hasCompleted: {
                      bsonType: "array",
                      description: "array holding the workouts completed by the gym goer",
                      items: {
                          bsonType: "object",
                          properties: {
                            referencedWorkout: {
                              bsonType: "ObjectId",
                              description: "_id from completed workout"
                            },
                            completionDate: {
                              bsonType: "date",
                              description: "date workout was completed"
                            }
                          }
                      }
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
                      description: "array holding the name of plans that the user subscribes to",
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
                  createdWorkouts: {
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
          },
        }
      }
    }
  });
db.user.createIndex({completionDate:-1})

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
                imagePath: {
                    bsonType: "string",
                    description: "path to get to the image",
                    required: true
                },
                equipment: {
                    bsonType: "array",
                    description: "list of equipment needed to do the exercise",
                    items: {
                      bsonType: "string",
                      description: "one piece of equipment necessary"
                    },
                    required: true
                },
                caloriesBurned: {
                    bsonType: "int",
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
                workoutIds: {
                  bsonType: "array",
                  description: "list of workouts in the plan",
                  items: {
                    workoutId: {
                      bsonType: "ObjectId",
                      description: "id of workout in plan"
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
                }
            }
        }
    }
});
db.plan.createIndex({"subscriptionDate":-1});

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
                image: {      //i think maybe we should get rid of this
                    bsonType: "string",
                    description: "path to image",
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
                      composedOf: {
                        bsonType: "ObjectId",
                        description: "foreign key referencing the associated exercise"
                      },
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
                      calories: {
                        bsonType: "int",
                        description: "calories burned by doing all the reps in the set",
                      }
                    }
                  },

                }
            }
        }
    }
});
// db.createCollection("set",{
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             properties: {
//                 workoutID: {
//                     bsonType: "objectId", 
//                     description: "foreign key referencing the associated workout",
//                     required: true}, //the workout the set belongs to, uses objectId automatically generated by MongoDB
//                 composedOf: {
//                     bsonType: "objectId", 
//                     description: "foreign key referencing the associated exercise",
//                     required: true}, //the exercise that the set is made of, uses objectId automatically generated by MongoDB
//                 setNo: {
//                     bsonType:"int", 
//                     description: "the ordered value in which to perform the sets",
//                     required: true},
//                 reps: {
//                     bsonType:"int", 
//                     description: "the number of reps of the exercise to be done",
//                     required: true},
//                 breakTime: { 
//                     bsonType: "int", 
//                     description: "the amount of time to rest between sets",
//                     required: true},
//                 calories: {
//                     bsonType: "int",
//                     description: "calories burned by doing all reps of exercise in the set", 
//                     required: true}
//             }
//         }
//     }

// });

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
                imagePath: {
                    bsonType: "string",
                    description: "string containing the path to the image",
                    required: true
                },
                planList: {
                    bsonType: "array",
                    description: "array holding the ids of the plans in the category",
                    items: {
                        planId: {
                          bsonType: "ObjectId",
                          description: "id of plan in the category"
                        }
                    }
                }
            }
        }
    }
});
db.collection.createIndex({"title": 1}, {unique:true});