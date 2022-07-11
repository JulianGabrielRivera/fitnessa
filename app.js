require('dotenv/config');

//connects to the database
require('./db');

// handles http requests
const express = require('express');

// handles handlerbars
const hbs = require('hbs');

const app = express();
require('./config/session.config')(app);

require('./config')(app);

// custom midware
app.use((req, res, next) => {
  if (req.session.currentUser === undefined) {
    app.set('view options', { layout: 'loggedout-layout' });
  } else {
    app.set('view options', { layout: 'loggedin-layout' });
  }

  next();
});

const index = require('./routes/index');
app.use('/', index);

const authRouter = require('./routes/auth.routes');
app.use('/', authRouter);

const calculatorRouter = require('./routes/calculators.routes');
app.use('/', calculatorRouter);

const shopAllRouter = require('./routes/shop.routes');
app.use('/', shopAllRouter);

// const publicRouter = express.Router();
// publicRouter.get('/my-public-route'), (req, res) => res.send('public');
// app.use('/', publicRouter);

const isLoggedIn = require('./middleware/route-guard').isLoggedIn;
app.use(isLoggedIn);
//for handling errors if we have routes that dont exist
require('./error-handling')(app);

module.exports = app;
