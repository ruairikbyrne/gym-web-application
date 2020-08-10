'use strict';

const userstore = require('../models/user-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Application',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('dashboard', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Application',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (user) {
      response.cookie('dashboard', user.email);
      logger.info(`authenticating ${user.email}`);
      response.redirect('/dashboard');
    }
    else if (trainer) {
      response.cookie('trainerdashboard', trainer.email);
      logger.info(`authenticating ${trainer.email}`);
      response.redirect('/trainerdashboard');
    }
    else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.dashboard;
    if (userstore.getUserByEmail(userEmail)) {
      return userstore.getUserByEmail(userEmail);    
        }
    else {
      return trainerstore.getTrainerByEmail(userEmail);    
    }
  },
};

module.exports = accounts;