db = new Mongo().getDB("fitness-app");

db.createCollection("user", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        id: {
            bsonType: "int",
            description: "unique ID for each user",
            required: true
        },
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
 /*       
        passwordHash: {
          bsonType: "string",
          description: "hashed and salted password",
          required: true
        },
 */
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
                }

            }
        },

        /*
        admin: {
          bsonType: "objectId",
          required: ["realName", "profileDescription"],
          properties: {
            realName: {
              bsonType: "string",
              description: "the real name of the admin"
            },
            profileDescription: {
              bsonType: "string",
              description: "a short description of the profile"
            },
            promotedBy: {
              bsonType: "string",
              description: "the username of the admin who promoted this admin"
            }
          }
        }
        */
      }
    }
  }
});

db.user.createIndex({"username":1}, {unique:true});