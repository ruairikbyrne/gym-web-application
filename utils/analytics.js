const accounts = require('../controllers/accounts.js');
const conversion = require('./conversion.js');
const logger = require("./logger");

const analytics = {
  

  
    calculateBMI(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser.height <= 0){
      logger.info("not calculating BMI: " + loggedInUser);
      return 0;
    }
    else {
      logger.info("calculating BMI: " + loggedInUser);
      return conversion.round((loggedInUser.weight / (loggedInUser.height * loggedInUser.height)), 2);
    }
    
  },

};