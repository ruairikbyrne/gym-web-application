"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const accounts = require('./accounts.js');
const memberDetails = require('../models/user-store.js');
const uuid = require('uuid');


const profile = {
  index(request, response) {
    logger.info("profile rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      memberName: loggedInUser.name,
      address: loggedInUser.address,
      email: loggedInUser.email,
      password: loggedInUser.password,
      gender: loggedInUser.gender,
      startingWeight: loggedInUser.startingWeight,
      height: loggedInUser.height,
    };
    logger.info("about to render ");
    response.render("profile", viewData);
  },

    updateUserProfile(request, response) {
      const loggedInUser = accounts.getCurrentUser;
      
      loggedInUser.email = request.body.email,
      loggedInUser.name = request.body.name,
      loggedInUser.password = request.body.password,
      loggedInUser.address = request.body.address,
      loggedInUser.gender = request.body.gender,
      loggedInUser.height = request.body.height,
      loggedInUser.startingWeight = request.body.startingWeight,
      loggedInUser.save();
    //logger.debug('Updating user profile', updateProfile);
    //memberDetails.updateUser(updateProfile);
    response.redirect('/profile');
    
  },
  
  
};
module.exports = profile;
