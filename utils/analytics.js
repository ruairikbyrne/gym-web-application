const accounts = require('./accounts.js');
const conversion = require('./conversion.js');
const memberStats = require('./memberStats.js');

const analytics = {
  
    generateMemberStats(request, response){
      memberStats = new memberStats();
      memberStats.bmi = analytics.calculateBMI();
      
    },
  
    calculateBMI(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser.height <= 0){
      return 0;
    }
    else {
      return conversion.round((loggedInUser.weight / (loggedInUser.height * loggedInUser.height)), 2);
    }
    
  },

};