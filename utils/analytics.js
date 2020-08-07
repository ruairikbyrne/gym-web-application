'use strict';

const accounts = require('../controllers/accounts.js');
const conversion = require('./conversion.js');
const logger = require("./logger");

const analytics = {
  

  
    calculateBMI(request, response) {
    var memberBMI = 0;  
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser.height <= 0){
      logger.info("not calculating BMI: " + loggedInUser.name);
      return 0;
    }
    else {
      logger.info("calculating BMI: " + loggedInUser.name);
      //return conversion.round((loggedInUser.weight / (loggedInUser.height * loggedInUser.height)), 2);
      //memberBMI = (Number(loggedInUser.weight) / (Number(loggedInUser.height) * Number(loggedInUser.height)));
      memberBMI = (Number(loggedInUser.startingWeight) / (Number(loggedInUser.height) * Number(loggedInUser.height)));
      logger.info("calculated BMI: " + memberBMI);
      return memberBMI;
    }
    
  },

};

    determineBMICategory(request, response) {
        var determinedCategory = "";
        const bmiValue = analytics.calculateBMI(request)
        if (bmiValue < 16) {
            determinedCategory = "SEVERELY UNDERWEIGHT";
        }
        else if ((bmiValue >= 16) && (bmiValue < 18.5)) {
            determinedCategory =  "UNDERWEIGHT";
        }
        else if ((bmiValue >= 18.5) && (bmiValue < 25)){
            determinedCategory = "NORMAL";
        }
        else if  ((bmiValue >= 25) && (bmiValue < 30)) {
            determinedCategory = "OVERWEIGHT";
        }
        else if  ((bmiValue >= 30) && (bmiValue < 35)) {
            determinedCategory = "MODERATELY OBESE";
        }
        else if  (bmiValue >= 35) {
            determinedCategory = "SEVERELY OBESE";
        }
        return determinedCategory;
    }

module.exports = analytics;