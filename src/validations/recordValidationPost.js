const validator = require('express-validator');

const title = validator.body('title')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Title must not be empty!');

const artist = validator.body('artist')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Please add an artist!');

const year = validator.body('year')
    .not()
    .isEmpty()
    .withMessage('The year must not be empty!')
    .trim()
    .isInt({min:1901, max:2023})
    .withMessage('Please enter a valid year!');

const price = validator.body('price')
    .not()
    .isEmpty()
    .withMessage('The price must not be empty!');

module.exports = {
    title,
    artist,
    year,
    price
}


