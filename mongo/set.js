db = new Mongo().getDB("fitness-app");

db.createCollection("set",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                workoutID: {bsonType: "objectId", required: true}, //the workout the set belongs to
                composedOf: {bsonType: "objectId", required: true}, //the exercise that the set is made of
                setNo: {bsonType:"int", required: true},
                reps: {bsonType:"int", required: true},
                break: {bsonType: "int", required: true},
                calories: {bsonType: "int", required: true}
            }
        }
    }

});