import express, { urlencoded, json } from 'express';
import * as dotenv from 'dotenv'
import mysqlServices from './services/mysql/services.js'

dotenv.config()
const app = express();
let services = mysqlServices
  
app.use(urlencoded({ extended: true }))
app.use(json())

// JUST FOR TESTING - NEED TO BE REMOVED
app.post('/test', async (req, res) => {
   try {
     const results = await services.createTest(req.body)
     res.status(200).send(results);
   } catch (error) {
     res.status(500).send({ error });
   }
});

 app.get('/test', async (req, res) => {
   try {
      const results = await services.getTest()
      res.status(200).send(results);
   } catch (err) {
      res.status(500).send('Error fetching!');
   }
})
  
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, 
   () => console.log(`Server is running at port: ${PORT}`));