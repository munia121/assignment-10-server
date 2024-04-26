const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6irp4bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        // await client.connect();
        // Send a ping to confirm a successful connection

        const database = client.db("FoodCraft");
        const textileCollection = database.collection("food");


        app.get('/textileArt/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await textileCollection.findOne(query);
            console.log(result)
            res.send(result);
        })



        app.post('/textileArt', async (req, res) => {
            const foods = req.body;
            console.log(foods)
            const result = await textileCollection.insertOne(foods);
            res.send(result);
        })


        app.get('/textileArt', async(req, res) =>{
            const cursor = textileCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        



        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('server sunning successfully!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})