// importieren folgender module (vorher müssen diese installiert werden!)

/** EXTERNAL DEPENDENCIES */ 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


/** IMPORTS */
const { myMiddleware } = require('./middleware/myMiddleware');
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



/** MIDDLEWARE */
// external middleware
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
// custom middleware
// Teilaufgabe 2 (middleware)
app.get('/api/records/middleware', myMiddleware, (req, res) => {
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
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



/** LISTENER */
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
