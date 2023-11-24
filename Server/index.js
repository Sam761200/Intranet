const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
// const passengerRoutes = require('./routes/passenger.routes');
require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');
const UserModel = require('./models/user.model');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId', 'Authorization'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);
// app.use('/api/passenger', passengerRoutes);

// jwt
app.get('/jwtid', checkUser, async (req, res) => {
  if (req.token) {
    let user = await UserModel.findById(req.token.id);
    res.status(200).send(user.id);
  } else {
    res.status(403).send('No token');
  }
});


require('./config/db').then(() => app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
}))