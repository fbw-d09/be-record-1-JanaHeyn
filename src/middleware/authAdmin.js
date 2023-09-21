require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;

const authAdmin = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return res.sendStatus(403);
     }
    
    try {
        const user = jwt.verify(token, secret);

        // req.loggedInId = user.id;
        req.role = user.role;
        // console.log(req.role);

        if(req.role === 'admin') {
            console.log('User is admin!');
            next();
        } else {
            console.log('User is not admin!');
        }

    } catch(error) {
        next(error);
    }
}

module.exports = authAdmin;
