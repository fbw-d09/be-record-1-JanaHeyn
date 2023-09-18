const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController.js');
// import der validierung
const userValidationPost = require('../validations/userValidationPost.js');
const userValidationPut = require('../validations/userValidationPut.js');
const authUser = require('../middleware/authUser.js');
const authAdmin = require('../middleware/authAdmin.js');

// /api/users/login
router
    .route('/login')
    .post(
        userController.loginUser);

// /api/users
router
    .route('/')
    .get(
        authAdmin,
        userController.getUsers)
    .post(
        userValidationPost.password,
        userValidationPost.username,
        userController.createUser)
    .delete(
        authAdmin,
        userController.deleteUsers);

// /api/users/idnummer/
router
    .route('/:id/')
    .get(
        authUser,
        userController.getUser)
    .put(
        authUser,
        userValidationPut.password,
        userValidationPut.username,
        userController.updateUser)
    .delete(
        authUser,
        userController.deleteUser);

// /api/users/logout/
router
    .route('/logout')
    .post(
        authUser, 
        userController.clearCookie);

module.exports = router;
