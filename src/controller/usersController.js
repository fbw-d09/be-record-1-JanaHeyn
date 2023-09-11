const User = require('../models/User.js');
const validator = require('express-validator');

/** ROUTE ('/users')*/
// post
// user erstellen
const createUser = async(req, res, next) => {
    try {
        const { firstname, lastname, username, birthday, role, email, password, profile, address } = req.body;

        // validationResults + Fehler
        const error = validator.validationResult(req).errors;
        if(error.length > 0 ) {
            return res.status(400).json({
                success: false,
                message: error.map(err => err.msg)
            });
        };

        const newUser = new User({ firstname, lastname, username, birthday, role, email, password, profile, address });
    
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'New user created!',
            data: newUser
        });
    } catch(error) {
        console.log(error);
        next(error);
    }
};


// get
// alle user anzeigen
const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            amount: users.length,
            data: users
        })

    } catch(error) {
        next(error)

    }
};

/** ROUTE ('/users/id/') */
// get
// einen bestimmten user anhand der ID anzeigen
const getUser = async(req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        res.status(200).json({
            data: user
        });

    } catch(error) {
        next(error);
    }
}

// put
// bestimmten user bearbeiten
const updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;

        const updatedUser = req.body;

        // validationResults + Fehler
        const error = validator.validationResult(req).errors;
        if(error.length > 0 ) {
            return res.status(400).json({
                success: false,
                message: error.map(err => err.msg)
            });
        }; 

        const user = await User.findByIdAndUpdate(id, updatedUser, 
            {
                new: true
            });
        res.status(201).json({
            message: 'User updated!',
            data: user
        });
    } catch(error) {
        next(error);
    }
};

// delete
// bestimmten user löschen
const deleteUser = async(req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        res.status(201).json({
            message: 'User deleted!',
            data: user
        });
    } catch(error) {
        next(error);
    }
}

// /api/users
// alle user löschen
const deleteUsers = async (req, res, next) => {
    try {
        await User.deleteMany();
        res.status(201).json({
            success: true,
            message: 'All users deleted'
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    deleteUsers
}
