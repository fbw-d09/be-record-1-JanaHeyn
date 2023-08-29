const Chance = require('chance');
const mongoose = require('mongoose');

/** IMPORT DER VERBINDUNG */
const { connect, closeConnection } = require('./config/db.js');
/** IMPORTS DER MODELS */
const Record = require('./models/Record.js');
const User = require('./models/User.js');
const Order = require('./models/Order.js');

const chance = new Chance();

const generateUsers = (num) => 
{
    const users = [];
    // const newUser = new User();
    
    for (let i = 0; i < num; i++) {

        const firstname = chance.first();
        const lastname = chance.last();
        const username = chance.animal();
        const birthday = chance.birthday({string: true, american: false});
        const role = 'admin';
        const email = chance.email();
        const profile = { darkmode: true };
        // newUser.password = newUser.hashPassword('ABCD123ef');

        users.push([
            firstname, 
            lastname,
            username,
            birthday,
            role,
            email,
            profile
            // newUser.password
        ])
    }
    return users;
}

const generateRecords = (num) => 
{
    const records = [];
    
    for (let i = 0; i < num; i++) {
        const title = chance.sentence({ words: 5 });
        const artist = chance.sentence({ words: 2 });
        const year = chance.year({ min: 1900, max:2023 });
        const price = chance.natural({ min: 1, max: 20 });

        records.push({
            title,
            artist,
            year,
            price
        });
    }
    return records;
}

const generateOrders = (num) => 
{
    const orders = [];
    
    for (let i = 0; i < num; i++) {
        const title = chance.sentence({ words: 5 });
        const artist = chance.sentence({ words: 2 });
        const quantity = chance.integer({ min: 1, max: 10 });

        orders.push({
            title,
            artist,
            quantity
        });
    }
    return orders;
}


const seed = async () => 
{
    await connect().then(async () =>
    {
        await User
        .insertMany(generateUsers(1))
        .then(docs => {
            console.log(docs);
        })
        .catch(err => {
            console.log(err.message)   
        })

        await Record
        .insertMany(generateRecords(1))
        .then(docs => {
            console.log(docs);
        })
        .catch(err => {
            console.log(err.message);
        })

        await Order
        .insertMany(generateOrders(1))
        .then(docs => {
            console.log(docs);
        })
    
        await closeConnection();
    })
}

seed();
