const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

// /api/users
router.route('/')
.get(userController.getUsers);
// .post(userController.createUser);

// /api/users/byID/
router.route('/:id/')
.get(userController.getUser)
// .put(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;
