const jwt = require("jsonwebtoken");
require("dotenv").config();

function userShouldBeLoggedIn(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(401)
        req.username = decoded;
        next()
    } )
}

module.exports = userShouldBeLoggedIn;