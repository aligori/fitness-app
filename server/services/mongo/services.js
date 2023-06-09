import {db} from './db.service.js'

async function createTest(data){
    await db.collection('testCollection').insertOne({ firstName: data.firstname, lastName: data.lastname, email: data.email });
    return 'Creating with MONGO'
}

async function getTest(){
    return await db.collection('testCollection').find().toArray();
}

export default { createTest, getTest }