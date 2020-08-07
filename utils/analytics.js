'use strict';

const accounts = require('../controllers/accounts.js');
const memberAssessments = require('../models/assessment-store.js');
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
      
      memberBMI = (Number(loggedInUser.startingWeight) / (Number(loggedInUser.height) * Number(loggedInUser.height)));
      logger.info("calculated BMI: " + memberBMI);
      return memberBMI;
    }
    
  },



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
    },
  
  
      isIdealBodyWeight(request, response){

        var workingHeight = 0;               //hold converted height
        const baseHeight = 60.0;           //base height of 5ft converted to inches
        const baseMaleWeight = 50.0;       //base male weight is 50kgs
        const baseFemaleWeight = 45.5;     //base female weight is 45.5kgs
        const addWeight = 2.3;             //additional weight for every additional inch over baseHeight
        var devineWeight = 0;

        const loggedInUser = accounts.getCurrentUser(request);
        workingHeight = conversion.convertMeterstoInches(loggedInUser.height);   //convert height from metres to inches
        logger.info("Converted height in inches: " + workingHeight);
        //if the member is male and his height is less than 60 inches then return 50kgs
        if (loggedInUser.gender == ("M")) {
            if (workingHeight <= baseHeight){
                devineWeight = baseMaleWeight;
            }
            else {
                //if the male member height is greater than 60 inches for every inch over 60 add 2.3kg to 50kg.
                devineWeight = ((workingHeight - baseHeight)*addWeight) + baseMaleWeight;
            }
        }
        //if the member is female and her height is less than 60 inches then return 45.5kgs
        else if (loggedInUser.gender == ("F")) {
            if (workingHeight <= baseHeight){
                devineWeight = baseFemaleWeight;
            }
            else {
                //if the female member height is greater than 60 inches for every inch over 60 add 2.3kg to 45.5kg.
                devineWeight = ((workingHeight - baseHeight)*addWeight) + baseFemaleWeight;
            }
        }
        else {
            //if the member gender is unspecified and height is less than 60 inches then return 45.5kgs
            if (workingHeight <= baseHeight){
                devineWeight = baseFemaleWeight;
            }
            else {
                //if the members gender is unspecified and height is greater than 60 inches for every inch over 60 add 2.3kg to 45.5kg.
                devineWeight = ((workingHeight - baseHeight)*addWeight) + baseFemaleWeight;
            }
        }
        //System.out.println("Devine weight: " + devineWeight);
        //check tolerance in rounding of +/- 0.2 to determine if member has an ideal body weight
        const lastAssessment = memberAssessments.getLastAssessment();
        if ((lastAssessment.weight >= (devineWeight - 0.2)) && (lastAssessment.weight <= (devineWeight + 0.2))) {
            logger.info("ideal weight")
            return true; //has an ideal body weight
        }
        else {
            logger.info("not ideal weight")
            return false; //does not have an ideal body weight
        }
    }

  
  

  };

module.exports = analytics;