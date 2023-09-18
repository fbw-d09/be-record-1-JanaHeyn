// importieren folgender module (vorher müssen diese installiert werden!)

/** EXTERNAL DEPENDENCIES */ 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


/** IMPORTS */
const { setCors } = require('./middleware/cors');
const userRoutes = require('./routes/users');
const recordRoutes = require('./routes/records');
const orderRoutes = require('./routes/orders');


/** VARIABLES */
const app = express();
// const port = 5001;
const port = process.env.PORT;
const databaseUrl = `${process.env.DB_URL}/${process.env.DB_NAME}`;
const db = mongoose
    .connect(databaseUrl)
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log('Connection failed', err.message));

// console.log(crypto.randomBytes(64).toString ('hex'));


/** MIDDLEWARE */
// external middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
// custom middleware
// Teilaufgabe 2 (middleware)
app.get('/api/records/middleware', setCors, (req, res) => {
    console.log('Test...');
    res.send('middleware-test');
})


/** ROUTES */
// Teilaufgabe 3: Routes
app.use('/api/users', userRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/orders', orderRoutes);


/** ERROR HANDLING */
// 1. Fehler übergeben:
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

// 2. Fehler ausgeben:
app.use((error, req, res, next) => {
     return res
        .status(error.status || 500)
        .json({
            error: {
                message: error.message
            }
    });
});


/** LISTENER */
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
