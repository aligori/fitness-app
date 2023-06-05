import { MongoClient } from 'mongodb';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;


const uri = `mongodb://${username}:${password}@${database}`;
const client = new MongoClient(uri);

export default client