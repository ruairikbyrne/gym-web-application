'use strict';

const accounts = require('../controllers/accounts.js');
const conversion = require('./conversion.js');
const logger = require("./logger");

const analytics = {
  

  
    calculateBMI(request) {
    var memberBMI = 0;  
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser.height <= 0){
      logger.info("not calculating BMI: " + loggedInUser.name);
      return 0;
    }
    else {
      logger.info("calculating BMI: " + loggedInUser.name);
      //return conversion.round((loggedInUser.weight / (loggedInUser.height * loggedInUser.height)), 2);
      memberBMI = (Number(loggedInUser.weight) / (Number(loggedInUser.height) * Number(loggedInUser.height)));
      return memberBMI;
    }
    
  },

};

module.exports = analytics;