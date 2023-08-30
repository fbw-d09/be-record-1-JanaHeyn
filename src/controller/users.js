const User = require('../models/User.js');

/** ROUTE ('/users')*/
// get
// alle user anzeigen
exports.getUsers = (req, res) => {
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
exports.getUser = (req, res) => {
    const { id } = req.params;
    // console.log(req.params);

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
// exports.updateUser = (req, res, next) => {
//     const { id } = req.params;

//     User
//     .findByIdAndUpdate(id)
    
// }

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
