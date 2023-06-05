db = new Mongo().getDB("fitness-app");

db.createCollection("category",{
    validator:{
        $jsonSchema: {
            bsonType: "object",
            properties: {
                id:{
                    bsonType: "int",
                    description: "a unique number identifying the category",
                    required: true
                },
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

                }
            }
        }
    }

});