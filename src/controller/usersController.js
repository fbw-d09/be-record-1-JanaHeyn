const User = require('../models/User.js');

/** ROUTE ('/users')*/
// get
// alle user anzeigen
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            amount: users.length,
            data: users
        })

    } catch(error) {
        next(error)

    }
};

// post
// user erstellen
const createUser = async (req, res, next) => {
    try {
        const { firstname, lastname, username, birthday, role, email, password, profile } = req.body;
    
        const newUser = new User({ firstname, lastname, username, birthday, role, email, password, profile });
    
        await newUser.save();
        res.status(201).json({
            success: true,
            data: newUser,
            message: 'Der user wurde angelegt.'
        });
    } catch(error) {
        next(error);
    }

};


/** ROUTE ('/users/id/') */
// get
// einen bestimmten user anhand der ID anzeigen
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            data: user
        });

    } catch(error) {
        next(error);
    }
}

// put
// bestimmten user bearbeiten
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;

        const user = await User.findByIdAndUpdate(id, updatedUser, 
            {
                new: true
            });
        res.status(201).json({
            success: true,
            updated: user !== null ? true : false,
            data: user
        });
    } catch(error) {
        next(error);
    }
};

// delete
// bestimmten user löschen
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            deleted: user !== null ? true : false,
            data: user
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
    updateUser
}