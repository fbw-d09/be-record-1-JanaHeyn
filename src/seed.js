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
const Record = require('./models/Record.js');
const User = require('./models/User.js');
const Order = require('./models/Order.js');

const generateFakeData = async () => {
    try {
        let fakeUsers = []
        const fakeRecords = [];
        const fakeOrders = [];

        // fakeUsers
        for (let i = 0; i < 5; i++) {
            const newFakeUser = {
                firstname: chance.first(),
                lastname: chance.last(),
                username: chance.animal({ type: 'pet' }),
                role: Math.random() < 0.4 ? 'admin' : 'member',
                birthday: chance.birthday({string: true, american: false}),
                email: chance.email({ domain: 'example.com' }),
                password: chance.hash({length: 10}),
                profile: { darkmode: true },
            };
            fakeUsers.push(newFakeUser);

            await User.insertMany(newFakeUser);
        }

        // fakeRecords
        for (let i = 0; i < 5; i++) {
            const record = new Record({
                firstname: chance.first(),
                lastname: chance.last(),
                username: chance.animal({ type: 'pet' }),
                role: Math.random() < 0.4 ? 'admin' : 'member',
                birthday: chance.birthday({string: true, american: false}),
                email: chance.email({ domain: 'example.com' }),
                password: chance.hash({length: 10}),
                profile: { darkmode: true },
            });
            fakeUsers.push(record);

            await Record.insertMany(fakeRecords);
        }

        //fakeOrders
        for (let i = 0; i < 5; i++) {
            const title = chance.sentence({ words: 2 });
            const artist = chance.animal({ type: 'ocean' });
            const quantity = chance.integer({ min: 1, max: 10 });

            fakeOrders.push({
                title,
                artist,
                quantity
            });

            await Order.insertMany(fakeOrders);
        }

    } catch (error) {
        console.log(error);

    }

    mongoose.connection.close();
}
generateFakeData();
