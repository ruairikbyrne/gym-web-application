"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const accounts = require('./accounts.js');
const memberAssessments = require('../models/assessment-store.js');
const member = require('../models/user-store.js');
const uuid = require('uuid');


const trainerdashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: 'Member',
      members: member.getAllUsers(),
    };
    
    response.render("trainerdashboard", viewData);
  },
  
  retrieveMember(request, response){
    const memberId = request.params.id;
    logger.info('Member id = ' + memberId);
    const viewData = {
      title: 'Member Assessments',
      assessments: memberAssessments.getUserAssessments(memberId),
    }
    response.render('trainer-member', viewData);
    
      
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.info("Deleting Member " + memberId);
    logger.debug("Deleting member ${memberId}");
    member.deleteMember(memberId);
    response.redirect("/trainerdashboard");
  }

};
module.exports = trainerdashboard;
