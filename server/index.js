const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection Error:', err));

app.listen(3000, () => {
    console.log('Server is running on 3000');
});

app.get('/test',(req, res) => {
    res.send('Hello World')
})

app.use(express.json());

app.use(cookieParser());

app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    });
});


app.use('/server/user', userRouter)
app.use('/server/auth', authRouter)