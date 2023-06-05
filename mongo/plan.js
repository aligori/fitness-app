db = new Mongo().getDB("fitness-app");

db.createCollection("plan", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                id: {
                    bsonType: "int",
                    description: "",
                    required: true
                },
                title: {
                    bsonType: "string",
                    description: "title for the plan",
                    required: true
                },
                desciption: {
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
                }
            }
        }
    }
});