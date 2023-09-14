require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

const authAdmin = (req, res, next) => {
    
}