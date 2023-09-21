require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

const authUser = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(token);

    if(!token) {
       return res.sendStatus(403);
    } 

    try {
        const user = jwt.verify(token, secret);
    
        req.loggedInId = user.id;
        req.role = user.role;
        // console.log(req.loggedInId);
        // console.log(req.role); 
        next();

    } catch(error) {
        next(error);
    } 
}

module.exports = authUser;
