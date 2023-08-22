// Teilaufgabe 1 (lowdb)
// importieren folgender module (vorher müssen diese installiert werden!)
const express = require('express');
const path = require('path');
const low = require('lowdb');
const bodyParser = require('body-parser');
// adapter importieren für synchrones arbeiten
const FileSync = require('lowdb/adapters/FileSync');

// instanz von express setzen
const app = express();

const port = 5001;

// adapter erstellen
const adapter = new FileSync('db.json');

// instanz von lowdb setzen
const db = low(adapter);

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Objekt mit werten für Datenbank:
const defaultData = 
{   
    records: [
        {
            id: 1,
            title: 'Lullaby',
            artist: 'The Cure',
            year: 1989,
            price: 17.99
        },
        {
            id: 2,
            title: 'Lola',
            artist: 'The Kinks',
            year: 1970,
            price: 15.99
        }
    ]
}

db.defaults(defaultData).write();

app.get('/api/records', (req, res) => {

    const records = db.get('records').value();

    res.status(200).json(records);
});

app.post('/api/records', (req, res) => {

    const { id, title, artist, year, price } = req.body;
    const newRecord = { id, title, artist, year, price };

    db.get('records').push(newRecord).write();

    res.status(200).json({success: true, message: 'Daten erfolgreich hinzugefügt', data: newRecord })
});

// Teilaufgabe 2 (middleware)
const { myMiddleware } = require('./middleware/myMiddleware');

app.get('/api/records/middleware', myMiddleware, (req, res) => {
    console.log('Test...');
    res.send('middleware-test');
})

// Teilaufgabe 3: Routes
const recordRoutes = require('./routes/records');
app.use('/api/records', recordRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

// Error handling:
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

app.listen(port, () => {
    console.log(`Der Server läuft auf Port ${port}`);
})
