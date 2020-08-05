const accounts = require('./accounts.js');

const analytics = {
  
    calculateBMI(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    logger.debug('Creating a new Assessment', newAssessment);
    memberAssessments.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },

};