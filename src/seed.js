require('dotenv').config();

const Chance = require('chance');
const mongoose = require('mongoose');
const chance = new Chance();

/** ERSTELLUNG DER VERBINDUNG */
const databaseUrl = `${process.env.DB_URL}/${process.env.DB_NAME}`;
mongoose
.connect(databaseUrl)
.then(() => console.log('connected to database'))
.catch((err) => console.log('connection failed', err.message));

/** IMPORTS DER MODELS */
const User = require('./models/User.js');
const Order = require('./models/Order.js');
const {Record} = require('./models/Record.js');

const generateFakeData = async () => {
    try {
        let fakeUsers = []
        const fakeRecords = [];
        const fakeOrders = [];

        // fakeUsers
        for (let i = 0; i < 5; i++) {
            const user = {
                firstname: chance.first(),
                lastname: chance.last(),
                username: chance.animal({ type: 'pet' }),
                birthday: chance.birthday({string: true, american: false}),
                role: Math.random() < 0.4 ? 'admin' : 'member',
                email: chance.email({ domain: 'example.com' }),
                password: chance.hash({length: 10}),
                profile: { darkmode: true },
                // address: chance.address(),
            };
            fakeUsers.push(user);

            await User.insertMany(user);
        }

        // fakeRecords
        for (let i = 0; i < 5; i++) {
            const record = {
                title: chance.sentence({ words: 2 }),
                artist: chance.name(),
                year: chance.year({min: 1950, max: 2023}), 
                price: chance.euro({ max: 25 }),
            };
            fakeRecords.push(record);

            await Record.insertMany(record);
        }

        //fakeOrders
        for (let i = 0; i < 5; i++) {
            const order = {
                quantity: chance.integer({ min: 1, max: 10 }),
            };

            fakeOrders.push(order);

            await Order.insertMany(order);
        }

    } catch (error) {
        console.log(error);
    }

    mongoose.connection.close();
}
generateFakeData();
