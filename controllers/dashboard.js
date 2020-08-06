"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const accounts = require('./accounts.js');
const memberAssessments = require('../models/assessment-store.js');
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    
    const viewData = {
      memberName: loggedInUser.name,
      //memberBMI: analytics.calculateBMI,  look at addAssessment to figure out
      assessments: memberAssessments.getUserAssessments(loggedInUser.id),
    };
    logger.info("about to render ", memberAssessments.getAllAssessments());
    response.render("dashboard", viewData);
  },



  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    logger.debug('Creating a new Assessment', newAssessment);
    memberAssessments.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },

};
module.exports = dashboard;
