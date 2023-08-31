const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/User.js');

/** ROUTE ('/users')*/
// get
// alle user anzeigen
exports.getUsers = (req, res, next) => {
    User
    .find()
    .then(users => {
        res.status(200).json({
            success: true,
            amount: users.length,
            data: users
        })
    })
    .catch(err => console.log(err.message))
};

// post
// user erstellen
// exports.createUser = (req, res) => {
//     res.status(201).json({
//         success: true,
//         message: 'Neuer user wurde erstellt'
//         // data: user
//     })
// }


/** ROUTE ('/users/id/') */
// get
// einen bestimmten user anhand der ID anzeigen
exports.getUser = (req, res, next) => {
    const { id } = req.params;

    User
    .findById(id)
    .then(user => {
        res.status(200).json({
            success: true,
            data: user
        })
    })
    .catch(err => console.log(err.message));
}

// put
// bestimmten user bearbeiten
exports.updateUser = (req, res, next) => {
    const { id } = req.params;

    User
    .findByIdAndUpdate(id,
    {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        birthday: req.body.birthday,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password, 
        profile: req.body.profile
    },
    {
        new: true,
    })
    .then(user => {
        res.status(201).json({
            success: true,
            updated: user !== null ? true : false,
            data: user
        });
    })
    .catch(err => console.log(err.message))
};

// delete
// bestimmten user löschen
exports.deleteUser = (req, res, next) => {
    const { id } = req.params;

    User
    .findByIdAndDelete(id)
    .then(user => {
        res.status(201).json({
            success: true,
            deleted: user !== null ? true : false,
            data: user 
        })
    })
    .catch(err => console.log(err.message));
}
