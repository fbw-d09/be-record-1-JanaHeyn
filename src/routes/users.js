const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController.js');
// import der validierung
const userValidations = require('../validations/userValidations.js');


// /api/user
router
    .route('/')
    .get(userController.getUsers)
    .post(
        userValidations.password,
        // userValidations.passwordConfirmation,
        userValidations.username,
        userController.createUser)
    .delete(userController.deleteUsers);

// /api/users/idnummer/
router
    .route('/:id/')
    .get(userController.getUser)
    .put(
        userValidations.password,
        // userValidations.passwordConfirmation,
        userValidations.username,
        userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
