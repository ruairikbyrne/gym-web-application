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
      const updatedProfile = {
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        address: request.body.address,
        gender: request.body.gender,
        height: request.body.height,
        startingWeight: request.body.startingWeight,
          
      }
      
    memberDetails.updateProfile(loggedInUser, updatedProfile);
    
    response.redirect('/profile');
    
  },
  
  
};
module.exports = profile;
