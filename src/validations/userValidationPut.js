const validator = require('express-validator');

// prüfen ob passwort den vorgaben entspricht
const password = validator.body('password')
    .not()
    .isEmpty()
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters!')
    .not()
    .isIn(['password', 'passwort', 'password123', 'passwort123', 'test1234', '00000000', 'hallo123', 'helloworld', 'hallowelt', '12345678'])
    .withMessage('Invalid password!');

// username = email ?
const username = validator.body('username')
    .isEmail()
    .normalizeEmail()
    .trim()
    .optional()
    .withMessage('Username must be an email address!');

module.exports = {
    password,
    username
}
