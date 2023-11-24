const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/error.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin // Ajoutez le champ isAdmin au payload du JWT
    },
    process.env.TOKEN_SECRET,
    { expiresIn: maxAge }
  );
};


  module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {gender, firstname, lastname, email, password, phone, birthdate, city, country, photo, category, isAdmin } = req.body


      try {
        const user = await UserModel.create({gender, firstname, lastname, email, password, phone, birthdate, city, country, photo, category, isAdmin });
        res.status(201).json({ user: user._id});
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send({ errors })   
  }
  }
    

  module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.login(email, password);
      const token = createToken(user);
      console.log('JWT Token:', token);

      // Renvoyer le jeton JWT dans l'en-tête 'Authorization'
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({ message: 'Authentication successful' });
    } catch (err) {
      const errors = signInErrors(err);
      res.status(400).json({errors});
    }
  }
  
  
  // module.exports.logout = (req, res) => {
  //   res.cookie('jwt', '', { maxAge: 1 });
  //   res.redirect('/');
  // }