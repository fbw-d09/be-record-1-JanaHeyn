const validator = require('express-validator');

// prüfen ob die Eingabe und Passwort aus Body gleich
const passwordConfirmation = (value, { req }) => 
{
    if(value !== req.body.password) {
        throw new Error('passwords do not match');
    }
    return true;
};

// prüfen ob passwort den vorgaben entspricht
const password = validator.body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password to short or to long!')
    .not()
    .isIn(['password', 'passwort', 'password123', 'passwort123', 'test1234', '00000000', 'hallo123', 'helloworld', 'hallowelt'])
    .withMessage('Invalid password!');


// username = email ?
const username = validator.body('username')
.isEmail()
.withMessage('Username must be an email address!');

module.exports = {
    passwordConfirmation,
    password,
    username
}
