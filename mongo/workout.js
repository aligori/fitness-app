db = new Mongo().getDB("fitness-app");

db.createCollection("workout",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                id:{
                    bsonType: "objectId",
                    description: "unique ID to identify workouts",
                    required: true
                },
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

                },
                scheduledDay: {
                    bsonType: "int",
                    description: "on which day in the plan does this workout fall",
                    required: true
                }
            }
        }
    }

});