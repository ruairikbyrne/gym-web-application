'use strict';

const _ = require("lodash");

const assessmentCollection = {
  
  assessmentCollection: require('./assessment-store.json').assessmentCollection,

  getAllAssessments() {
    return this.assessmentCollection;
  },

  getMember(id) {
    return _.find(this.assessmentCollection, { id: id});

  },

  getUserAssessments(memberId) {
    return this.store.findby(this.collection, { memberId: memberId});
  },
      
  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessment.push(assessment);
  },
};

module.exports = assessmentCollection;