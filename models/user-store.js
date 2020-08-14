'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },


  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  updateProfile(user, updatedProfile) {
    user.name = updatedProfile.name;
    user.email = updatedProfile.email;
    user.password = updatedProfile.password;
    user.address = updatedProfile.address;
    user.gender = updatedProfile.gender;
    user.height = updatedProfile.height;
    user.startingWeight = updatedProfile.startingWeight;
    this.store.save()
  },
  
  deleteMember(id){
    const member = this.getUserById(id);
    this.store.remove(this.collection, member);
    this.store.save();    
  },
  
};

module.exports = userStore;