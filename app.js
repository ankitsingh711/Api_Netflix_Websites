let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 9700
const mongoUrl = "mongodb://localhost:27017"
const mongoliveUrl = "mongodb+srv://local:test12345@netflix.rddsa.mongodb.net/netflixdata?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');

// middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())



app.get('/',(req,res) => {
    res.send("Welcome to Netflix")
})

//webseries

app.get('/webseries',(req,res) => {
    db.collection('webseries').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// webseries on the basis of Category





app.get('/webseries/:id',(req,res) => {
    let WebId = Number(req.params.id);
    // let WebId = mongo.ObjectId(req.params.id)
    db.collection('webseries').find({webseries_id:WebId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})



//premium list

app.get('/premium',(req,res)=>{
    db.collection('premium').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

//premium details by id

app.get('/premium/:id', (req,res) => {
    let PremId = Number(req.params.id)
    db.collection('premium')
    .find({premium_id:PremId})
    .toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//movies

app.get('/movies',(req,res)=>{
    db.collection('movies').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

//Movies Details By Id

app.get('/movies/:id',(req,res) => {
    let MovieId = Number(req.params.id);
    // let WebId = mongo.ObjectId(req.params.id)
    db.collection('movies').find({movie_id:MovieId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// Movies on the basis of Category


//mylist

app.get('/mylist',(req,res)=>{
    db.collection('mylist').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})


// Add to Mylist
app.post('/addList',(req,res) => {
    db.collection('mylist').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Added to Mylist')
    })
})

// View Mylist
    app.get('/viewList',(req,res) => {
        let email = req.query.email;
        let query = {};
        if(email){
            query = {"email":email}
        }
        db.collection('mylist').find(query).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    })  

// Remove mylist
    app.delete('/removeList',(req,res)=>{
        db.collection('mylist').remove({},(err,result) => {
            res.send('Removed From List')
        })
    })

    // Add Premium 
app.post('/addPremium',(req,res) => {
    db.collection('premiums').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Premium Added')
    })
})

// View Premium Type
app.get('/viewPremium',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query = {"email":email}
    }
    db.collection('premiums').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})  



    //Add Premium Type
app.put('/premium/:id',(req,res) => {
    console.log(">>>id",req.params.id)
    console.log(">>>id",req.body)
    let pId = Number(req.params.id)
    db.collection('premiums').updateOne(
        {id:pId},
        {$set:{
            "status":req.body.status,
            "bank_name":req.body.bank_name,
            "date":req.body.date
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})



//tvshows

    app.get('/tvshows',(req,res)=>{
        db.collection('tvshows').find().toArray((err,result) => {
            if (err) throw err;
            res.send(result)
        })
    })

//Tv Shows Details By Id

    app.get('/tvshows/:id',(req,res) => {
        let TvId = (req.params.id);
        db.collection('tvshows').find({tvshows_id:TvId}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    })


//Tv shows on basis of langauge




//connection with dbs
    MongoClient.connect(mongoliveUrl,(err,client) =>{
        if (err) console.log(`Error while Connecting`)
        db = client.db('netflixdata');
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    })