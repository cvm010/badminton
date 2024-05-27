const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const uri = "mongodb+srv://cvm:<password>@badminton.yzngbua.mongodb.net/?retryWrites=true&w=majority&appName=badminton";

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

app.post('/submit_booking',(req,res)=>{
    const newBooking = new Booking(req.body);
    newBooking.save((err)=>{
        if(err){
            req.status(500).send('Error saving booking');
        }else{
            req.status(200).send('Booking saved sucessfully');
        }
    });
})


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/../frontEnd/index.html');
    // i think here is an error
});

app.listen(port, ()=>{
    console.log("server is running in " + process.env.PORT )
});

