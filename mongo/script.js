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

// db.createCollection("user", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         properties: {
//           id: {
//               bsonType: "int",
//               description: "unique ID for each user",
//               required: true
//           },
//           email: {
//               bsonType: "string",
//               description: "email address of the user",
//               required: true
//           },
//           password: {
//               bsonType: "string",
//               description: "password of the user", //needs to be hashed somehow
//               required: true
//           },
//           username: {
//               bsonType: "string",
//               description: "username of the user",
//               required: true
//           },
//    /*       
//           passwordHash: {
//             bsonType: "string",
//             description: "hashed and salted password",
//             required: true
//           },
//    */
//           gymGoer: {
//               bsonType: "objectId",
//               required: ["weight", "height", "birthday", "age", "membershipType"],
//               properties: {
//                   weight: {
//                       bsonType: "int",
//                       description: "gym goer's weight"
//                   },
//                   height: {
//                       bsonType: "int",
//                       description: "gym goer's height"
//                   },
//                   birthday: {
//                       bsonType: "date",
//                       description: "gym goer's birthday"
//                   },
//                   age: {
//                       bsonType: "int",
//                       description: "gym goer's age"
//                   },
//                   membershipType: {
//                       bsonType: "string",
//                       description: "gym goer's selected membership type"
//                   }
//               }
//           },
  
//           fitnessInfluencer: {
//               bsonType: "objectId",
//               required: ["firstName", "lastName", "experience", "bio"],
//               properties: {
//                   firstName: {
//                       bsonType: "string",
//                       description: "fitness influencer's first name"
//                   },
//                   lastName: {
//                       bsonType: "string",
//                       description: "fitness influencer's last name"
//                   },
//                   experience: {
//                       bsonType: "int",
//                       description: "years of experience fitness influencer has"
//                   },
//                   website: {
//                       bsonType: "string",
//                       description: "link to the fitness influencer's personal website"
//                   },
//                   bio: {
//                       bsonType: "string",
//                       description: "fitness influencer's biography"
//                   }
  
//               }
//           },
  
//           /*
//           admin: {
//             bsonType: "objectId",
//             required: ["realName", "profileDescription"],
//             properties: {
//               realName: {
//                 bsonType: "string",
//                 description: "the real name of the admin"
//               },
//               profileDescription: {
//                 bsonType: "string",
//                 description: "a short description of the profile"
//               },
//               promotedBy: {
//                 bsonType: "string",
//                 description: "the username of the admin who promoted this admin"
//               }
//             }
//           }
//           */
//         }
//       }
//     }
//   });
  
//   db.user.createIndex({"username":1}, {unique:true});

// db.createCollection("exercise",{
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             properties: {
//                 id:{
//                     bsonType: "int",
//                     description: "unique ID to identify exercises",
//                     required: true
//                 },
//                 name: {
//                     bsonType: "string",
//                     description: " name of the exercise",
//                     required: true
//                 },
//                 description: {
//                     bsonType: "string",
//                     description: "a brief description of how to do the exercise",
//                     required: true
//                 },
//                 image: {

//                 },
//                 equipment: { //array

//                 },
//                 caloriesBurned: {
//                     bsonType: "int",
//                     description: "how many calories are burned in one rep of the exercise",
//                     required: true
//                 },
//                 muscleGroups: { //array

//                 }
//             }
//         }
//     }

// });

// db.createCollection("plan", {
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             properties: {
//                 id: {
//                     bsonType: "int",
//                     description: "",
//                     required: true
//                 },
//                 title: {
//                     bsonType: "string",
//                     description: "title for the plan",
//                     required: true
//                 },
//                 desciption: {
//                     bsonType: "string",
//                     description: "description of the plan",
//                     required: true
//                 },
//                 goal: {
//                     bsonType: "string",
//                     description: "goal to be accomplished by the plan",
//                     required: true
//                 },
//                 duration: {
//                     bsonType: "int",
//                     description: "number of weeks the plan takes to complete",
//                     required: true
//                 }
//             }
//         }
//     }
// });

// db.createCollection("workout",{
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             properties: {
//                 id:{
//                     bsonType: "objectId",
//                     description: "unique ID to identify workouts",
//                     required: true
//                 },
//                 title: {
//                     bsonType: "string",
//                     description: "title of the workout",
//                     required: true
//                 },
//                 difficulty: {
//                     bsonType: "string",
//                     description: "level of difficulty of the workout",
//                     required: true
//                 },
//                 duration: {
//                     bsonType: "int",
//                     description: "how long the workout takes to complete in minutes",
//                     required: true
//                 },
//                 image: {

//                 },
//                 scheduledDay: {
//                     bsonType: "int",
//                     description: "on which day in the plan does this workout fall",
//                     required: true
//                 }
//             }
//         }
//     }
// });

// db.createCollection("set",{
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             properties: {
//                 workoutID: {bsonType: "objectId", required: true}, //the workout the set belongs to
//                 composedOf: {bsonType: "objectId", required: true}, //the exercise that the set is made of
//                 setNo: {bsonType:"int", required: true},
//                 reps: {bsonType:"int", required: true},
//                 break: {bsonType: "int", required: true},
//                 calories: {bsonType: "int", required: true}
//             }
//         }
//     }

// });

// db.createCollection("category",{
//     validator:{
//         $jsonSchema: {
//             bsonType: "object",
//             properties: {
//                 id:{
//                     bsonType: "int",
//                     description: "a unique number identifying the category",
//                     required: true
//                 },
//                 title: {
//                     bsonType: "string",
//                     description: "title of the category",
//                     required: true
//                 },
//                 description: {
//                     bsonType: "string",
//                     description: "a brief description of the category",
//                     required: true
//                 },
//                 image: {

//                 }
//             }
//         }
//     }
// });