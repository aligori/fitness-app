db = new Mongo().getDB("fitness-app");

db.createCollection("exercise",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                id:{
                    bsonType: "int",
                    description: "unique ID to identify exercises",
                    required: true
                },
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

                },
                equipment: { //array

                },
                caloriesBurned: {
                    bsonType: "int",
                    description: "how many calories are burned in one rep of the exercise",
                    required: true
                },
                muscleGroups: { //array

                }
            }
        }
    }

});