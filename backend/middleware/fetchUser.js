var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Aliyaisagoodgirl'

const fetchUser = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('authtoken');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" }); // Use return here
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" }); // Use return here
    }
}

module.exports = fetchUser;
