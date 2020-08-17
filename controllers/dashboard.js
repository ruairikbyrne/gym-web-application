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
      memberBMI: analytics.calculateBMI(request),
      categoryBMI: analytics.determineBMICategory(request),
      idealWeight: analytics.isIdealBodyWeight(request),
      assessments: memberAssessments.getUserAssessments(loggedInUser.id),
    };
    logger.info("about to render ", memberAssessments.getAllAssessments());
    response.render("dashboard", viewData);
  },



  addAssessment(request, response) {
    var positiveTrend = false;
    const loggedInUser = accounts.getCurrentUser(request);
    const arrAssessment = memberAssessments.getUserAssessments(loggedInUser.id);
    const lastAssessment = arrAssessment.length;
    logger.info("No of assessment " + lastAssessment);
    
    if (lastAssessment == 0) {
      if (loggedInUser.startingWeight > request.body.weight) {
        positiveTrend = true;
      } else {
        positiveTrend = false;
      }
    } else {
      if (arrAssessment[arrAssessment.length - 1].weight > request.body.weight) {
        positiveTrend = true;
      } else {
        positiveTrend = false;
      }
        
    };
  
      
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend: positiveTrend,
      date: analytics.determineDate(),
    };
    logger.debug('Creating a new Assessment', newAssessment);
    memberAssessments.addAssessment(newAssessment);
    
    response.redirect('/dashboard');
  },


  addComment(request, response) {
    const assessmentId = request.params.id;
    const assessment = memberAssessments.getAssessment(assessmentId);
    const memberId = assessment.userid;
    const trainerComment = {
      comment: request.body.comment,
    };
    memberAssessments.updateAssessment(assessment, trainerComment);
        
    const viewData = {
      title: 'Member Assessments',
      assessments: memberAssessments.getUserAssessments(memberId),
    };
    response.render('trainer-member', viewData);
    
  },
  
  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.info("Deleting Assessment" + assessmentId);
    logger.debug('Deleting Assessment ${assessmentId}');
    memberAssessments.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  }
  
  
};
module.exports = dashboard;
