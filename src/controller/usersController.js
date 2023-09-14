const User = require('../models/User.js');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');

// mit Secret_token aus .env datei erstezen
const secret = process.env.SECRET_TOKEN;

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
                message: error
                // message: error.map(err => err.msg) 
            });
        };

        const newUser = new User({ firstname, lastname, username, birthday, role, email, password, profile, address });

        newUser.password = newUser.hashPassword(password); 
    
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
    // console.log('loggedinid', req.loggedInId);
    const { id } = req.params;

    try {
        if(req.loggedInId === id) {
            const user = await User.findById(id);
            res.status(200).json({
                data: user
            });
        } else {
            res.status(400).json({
                message: 'user not auhtorized!'
            });
        }

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
                message: error
                // message: error.map(err => err.msg)
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

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});     
    
        if(user) {

            if(user.comparePassword(password)) {
                const token = jwt.sign({ username, id: user._id }, process.env.SECRET_TOKEN);
    
                res
                .cookie('access_token', token,
                {
                    maxAge: 24 * 60 * 60* 1000,
                    httpOnly: true
                })
                .status(200)
                .json({
                    success: true,
                    mesage: `user ${username} eingeloggt`
                });

            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect login data!'
                });
            }
            
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

    } catch(error) {
        next(error)
    }
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    deleteUsers,
    loginUser
}
