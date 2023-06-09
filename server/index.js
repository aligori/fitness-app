import express, { urlencoded, json } from 'express';
import * as dotenv from 'dotenv'
import mysqlServices from './services/mysql/services.js'
import mongoServices from './services/mongo/services.js'
import {connectToMongo} from './services/mongo/db.service.js'

dotenv.config()
const app = express();

// Using MySql services by default
let services = mysqlServices
  
app.use(urlencoded({ extended: true }))
app.use(json())

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

// JUST FOR TESTING - NEED TO BE REMOVED
app.post('/test', async (req, res) => {
   try {
     const results = await services.createTest(req.body)
     res.status(200).send({message: 'Success'});
   } catch (error) {
     res.status(500).send({ error });
   }
});

app.get('/test', async (req, res) => {
   try {
      const results = await services.getTest()
      res.status(200).send({ message: 'Fetch success', data: results });
   } catch (err) {
      res.status(500).send('Error fetching!');
   }
})

app.post('/migrate', async (req, res) => {
   try {
      // Connect to mongo db
      connectToMongo()
      // Call a migrate function that converts rdbms data to nosql data
      // Change to services that use mongo
      services = mongoServices
      res.status(200).send('Successfully Migrated!');
   } catch (err) {
      res.status(500).send('Error fetching!');
   }
})
  
const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, 
   () => console.log(`Server is running at port: ${PORT}`));