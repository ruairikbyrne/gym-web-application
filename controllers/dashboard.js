"use strict";

const logger = require("../utils/logger");
const accounts = require('./accounts.js');
const memberAssessments = require('../models/assessment-store.js');
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("logged in user " + loggedInUser);
    const viewData = {
      assessments: memberAssessments.getUserAssessments(loggedInUser.id),
    };
    response.render("dashboard", viewData);
  },



  addAssessment(request, response) {
    const id = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    memberAssessments.addAssessment(id, newAssessment);
    response.redirect('/assessment/' + id)
  },

};
module.exports = dashboard;
