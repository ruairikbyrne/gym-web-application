const accounts = require('./accounts.js');

const analytics = {
  
    calculateBMI(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser.height <= 0){
      return 0;
    }
    else {
      return (loggedInUser.weight / (loggedInUser.height * loggedInUser.height));
    }
    
  },

};