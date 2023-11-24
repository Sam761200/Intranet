const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    UserModel.findById(decodedToken.id, (err, user) => {
      if (err || !user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé.' });
      }

      if (user.isAdmin) {
        next(); 
      } else {
        res.status(403).json({ error: 'Accès refusé. Réservé aux administrateurs.' });
      }
    });
  } catch {
    res.status(401).json({ error: 'Requête non authentifiée !' });
  }
};

module.exports = checkAdmin;
