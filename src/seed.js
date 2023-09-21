require('dotenv').config();

const Chance = require('chance');
const mongoose = require('mongoose');
const chance = new Chance();
const crypto = require('crypto');
const secret = process.env.SECRET_TOKEN;

/** ERSTELLUNG DER VERBINDUNG */
const databaseUrl = `${process.env.DB_URL}/${process.env.DB_NAME}`;
mongoose
.connect(databaseUrl)
.then(() => console.log('connected to database'))
.catch((err) => console.log('connection failed', err.message));

/** IMPORTS DER MODELS */
// const Order = require('./models/Order.js');
const User = require('./models/User.js');
const { Record } = require('./models/Record.js');

const generateFakeData = async () => {
    try {
        let fakeUsers = []
        const fakeRecords = [];
        // const fakeOrders = [];

//         // fakeUsers
        for (let i = 0; i < 5; i++) {
            const user = new User({
                firstname: chance.first(),
                lastname: chance.last(),
                username: chance.email({ domain: 'example.com' }),
                birthday: chance.birthday({ string: true, american: false }),
                role: Math.random() < 0.4 ? 'admin' : 'member',
                // password: chance.hash({ length: 10 }),
                password: String,
                // password
                profile: { darkmode: true },
                address: {
                    street: chance.street(),
                    city: chance.city()
                }
            });
            hashPassword = (password) => {
                return crypto.createHmac('sha256', secret).update(password).digest('hex');
            }
            

            fakeUsers.push(user);

            await User.insertMany(user);
        }

//         // fakeRecords
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

        // fakeOrders
        // for (let i = 0; i < 5; i++) {
        //     const order = {
        //         quantity: chance.integer({ min: 1, max: 10 }),
        //     };
        //     fakeOrders.push(order);
        //     await Order.insertMany(order);
        // }

    } catch (error) {
        console.log(error);
    }

    mongoose.connection.close();
}
generateFakeData();
