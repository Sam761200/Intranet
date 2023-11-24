const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send('No token');
  }

  const token = authHeader.slice(7); // Supprime le préfixe 'Bearer ' du token

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.token = decodedToken;
    next();
  } catch (err) {
    console.log('Invalid token provided:', err.message);
    return res.status(403).send('Invalid token');
  }
};
