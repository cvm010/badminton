const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();
port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const mongoose = require('mongoose');

const uri = "mongodb+srv://cvm:simple1@badminton.yzngbua.mongodb.net/?retryWrites=true&w=majority&appName=badminton";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});





// Define a schema and model for bookings
const bookingSchema = new mongoose.Schema({
    email: String,
    username: String,
    mobile: String,
    duration: String
});


const Booking = mongoose.model('Booking', bookingSchema);
app.post('/submit_booking',async (req,res)=>{
    console.log("req is " + req);

    const newBooking = new Booking(req.body);
    console.log(newBooking);
    newBooking.save().then(()=>res.send("success")
).catch(e=>console.log(e));
})


app.get('/',(req,res)=>{
    dirName = path.resolve("../frontEnd/index.html" );
    console.log(dirName);

    res.sendFile(dirName);
    // i think here is an error
});

app.listen(port, ()=>{
    console.log("server is running in " + port )
});

