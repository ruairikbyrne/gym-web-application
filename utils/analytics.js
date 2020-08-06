const accounts = require('./accounts.js');
const conversion = require('./conversion.js');

const analytics = {
  
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