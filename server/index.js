import express, {urlencoded, json} from 'express';
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
    res.status(200).send({ message: 'Success' });
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

app.post('/fill-database', async (req, res) => {
  try {
    const result = await services.fillDatabase()
    res.status(200).send({ message: result });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/migrate', async (req, res) => {
  try {
    // Connect to mongo db
    await connectToMongo()
    // Call a migrate function that converts rdbms data to nosql data
    // Change to services that use mongo
    services = mongoServices
    res.status(200).send('Successfully Migrated!');
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
})

app.get('/users', async (req, res, next) => {
    try {
      let type = req.query.type;
      if (!type || !['goer', 'influencer'].includes(type)) {
        return res.status(400).send({ error: 'Bad request!' });
      }
      const data = type === 'goer' ? await services.getGymGoers() : await services.getInfluencers()
      res.status(200).send({
        message: 'Success', data: data.map(user => {
          return { id: user.id, username: user.username, email: user.email, avatar: user.avatar }
        })
      });
    } catch
      (err) {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
)

app.get('/categories', async (req, res) => {
    try {
      const data = await services.getCategories();
      res.status(200).send({
        message: 'Success', data
      });
    } catch
      (err) {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
)

app.get('/plan', async (req, res) => {
    try {
      const data = await services.getPlan();
      res.status(200).send({
        message: 'Success', data
      });
    } catch
      (err) {
      res.status(500).send({ error: err});
    }
  }
)

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT,
  () => console.log(`Server is running at port: ${PORT}`));