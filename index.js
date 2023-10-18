const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xwdt30p.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const carCollection = client.db('carsDB').collection('cars');

    app.post('/car', async(req, res) => {
      const car = req.body;
      const result = await carCollection.insertOne(car);
      res.send(result);
    })

    app.get('/bugatti', async(req, res) => {
      const query = {brand: "BUGATTI"}
      const bugatti = carCollection.find(query);
      const result = await bugatti.toArray();
      res.send(result);
    })

    app.get('/audi', async(req, res) => {
      const query = {brand: "AUDI"}
      const audi = carCollection.find(query);
      const result = await audi.toArray();
      res.send(result);
    })

    app.get('/bmw', async(req, res) => {
      const query = {brand: "BMW"}
      const bmw = carCollection.find(query);
      const result = await bmw.toArray();
      res.send(result);
    })
    
    app.get('/lamborghini', async(req, res) => {
      const query = {brand: "LAMBORGHINI"}
      const lamborghini = carCollection.find(query);
      const result = await lamborghini.toArray();
      res.send(result);
    })
    app.get('/ferrari', async(req, res) => {
      const query = {brand: "FERRARI"}
      const ferrari = carCollection.find(query);
      const result = await ferrari.toArray();
      res.send(result);
    })

    app.get('/rollsroyce', async(req, res) => {
      const query = {brand: "ROLLS-ROYCE"}
      const rollsroyce = carCollection.find(query);
      const result = await rollsroyce.toArray();
      res.send(result);
    })

  
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Server is running now');
});

app.listen(port, () => {
    console.log(`Server is Running on Port : ${port}`);
});
