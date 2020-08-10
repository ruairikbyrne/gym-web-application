"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const accounts = require('./accounts.js');
const memberAssessments = require('../models/assessment-store.js');
const uuid = require('uuid');


const trainerdashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: 'Member',
    };
    
    response.render("trainerdashboard", viewData);
  },

};
module.exports = trainerdashboard;
