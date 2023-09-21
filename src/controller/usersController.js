const User = require('../models/User.js');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');

const Address = require('../models/Address.js');

// to generate a production based secret for the .env file:
// console.log(crypto.randomBytes(64).toString('hex'));

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

        const newAddress = new Address({
            street: address.street,
            city: address.city
        });

        const newUser = new User({ 
            firstname, 
            lastname, 
            username, 
            birthday, 
            role, 
            email, 
            password, 
            profile, 
            address: newAddress._id});

        newUser.password = newUser.hashPassword(password); 
        
        await newAddress.save();
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'New user created!',
            data: newUser
        });
    } catch(error) {
        // console.log(error);
        next(error);
    }
};

// get
// alle user anzeigen
const getUsers = async(req, res, next) => {
    // console.log('role:', req.role);
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: `You are ${req.role}`,
            amount: users.length,
            data: users
        });
    } catch(error) {
        // console.log(error);
        next(error);
    }
};

// delete
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


/** ROUTE ('/users/id/') */
// get
// einen bestimmten user anhand der ID anzeigen
const getUser = async(req, res, next) => {
    const { id } = req.params;
    // console.log('loggedinid', req.loggedInId);
    // console.log('role:', req.role);
    
    try {
        if(req.loggedInId === id) {
            const user = await User.findById(id).populate('address', '-_id -__v');
            // console.log('firstname:', req.firstname);
            res.status(200).json({
                success: true,
                role: req.role,
                data: user
            });
        } else {
            res.status(400).json({
                message: 'User not auhtorized!'
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


/** ROUTE ('/users/login')*/
// post
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});     
    
        if(user) {
            if(user.comparePassword(password)) {
                const token = jwt.sign({ username, id: user._id, role: user.role }, secret);
                // const token = jwt.sign({ username, id: user._id}, secret);

                res
                .cookie('access_token', token,
                {
                    maxAge: 24 * 60 * 60* 1000,
                    httpOnly: true
                })
                .status(200)
                .json({
                    success: true,
                    mesage: `User ${username} logged in and is ${user.role}`
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


/** ROUTE ('/users/logout')*/
// post
const clearCookie = (req, res) => {
    return res
            .clearCookie('access_token')
            .status(200)
            .json({
                success: true,
                message: 'Successfully logged out!'
            });
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    deleteUsers,
    loginUser,
    clearCookie
}
