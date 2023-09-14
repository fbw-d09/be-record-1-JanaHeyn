require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

const authUser = (req, res, next) => {
    const token = req.cookies.access_token;

    try {
        const data = jwt.verify(token, secret);
    
        req.loggedInId = data.id;
        
        next();
        // console.log(req.loggedInId);

    } catch(err) {
        return res.sendStatus(403);
    } 
}

module.exports = authUser;