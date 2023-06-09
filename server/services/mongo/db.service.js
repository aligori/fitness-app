import { MongoClient } from 'mongodb';

const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const dbName = process.env.MONGO_INITDB_DATABASE

const uri = `mongodb://${user}:${pass}@${host}:${port}`;

const client = new MongoClient(uri, { useUnifiedTopology: true });

export let db;

export async function connectToMongo() {
    try {
      // Connect the client to the server
      const conn = await client.connect();
      db = conn.db(dbName)

      // PING to confirm a successful connection
      await client.db(dbName).command({ ping: 1 });
      console.log("Pinged your deployment. Successfully connected to MongoDB!");
    } catch (error) {
      throw error
    }
}