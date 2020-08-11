"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const accounts = require('./accounts.js');
const memberAssessments = require('../models/assessment-store.js');
const uuid = require('uuid');


const profile = {
  index(request, response) {
    logger.info("profile rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      memberName: loggedInUser.name,
      memberBMI: analytics.calculateBMI(request),
      categoryBMI: analytics.determineBMICategory(request),
      idealWeight: analytics.isIdealBodyWeight(request),
      assessments: memberAssessments.getUserAssessments(loggedInUser.id),
    };
    logger.info("about to render ", memberAssessments.getAllAssessments());
    response.render("profile", viewData);
  },




    updateUserProfile(request, response) {
      const loggedInUser = accounts.getCurrentUser;
      const updateProfile = {
        email: request.body.email,
        name: request.body.name,
        password: request.body.password,
        address: request.body.address,
        gender: request.body.gender,
        height: request.body.height,
        startingWeight: request.body.startingWeight,
      };
    
  },
  
  
};
module.exports = profile;
