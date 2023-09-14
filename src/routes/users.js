const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController.js');
// import der validierung
const userValidations = require('../validations/userValidations.js');
const authUser = require('../middleware/auth_user.js');


// /api/user
router
    .route('/')
    .get(userController.getUsers)
    .post(
        userValidations.password,
        userValidations.username,
        userController.createUser)
    .delete(userController.deleteUsers);

// login
router
    .route('/login')
    .post(
        userController.loginUser);

// /api/users/idnummer/
router
    .route('/:id/')
    .get(
        authUser,
        userController.getUser)
    .put(
        authUser,
        userValidations.password,
        userValidations.username,
        userController.updateUser)
    .delete(
        // authorized,
        userController.deleteUser);

module.exports = router;
