// server.js or app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv=require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());



const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  time: String,
  note: String,
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);



app.post('/send-booking', async(req, res) => {
    try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: savedAppointment.email,
      subject: 'Appointment Confirmation',
      text: `Hi ${savedAppointment.name},\n\nYour appointment for ${savedAppointment.service} at ${savedAppointment.time} has been successfully booked.\n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    
        res.status(200).json({ message: 'Appointment booked successfully'});
      } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
