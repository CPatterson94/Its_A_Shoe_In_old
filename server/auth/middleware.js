// const jwt = require("jsonwebtoken");
// const process = require("process");
// const protection = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).send("No token provided.");
//   }

//   try {
//     req.user = jwt.verify(token, process.env.JWT);
//     next();
//   } catch (error) {
//     return res.status(403).send("Failed to authenticate token.");
//   }
// };

// module.exports = protection;
const jwt = require('jsonwebtoken');
const jwtSecret = 'Whitegyalshoes'; // we can change it if ya wanna

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
