"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const profile = require("./controllers/profile.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const about = require("./controllers/about.js");
const accounts = require("./controllers/accounts.js");

router.get("/about", about.index);
router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);


router.get("/dashboard", dashboard.index);

router.post("/dashboard/addAssessment", dashboard.addAssessment);
router.post("/dashboard/addComment/:id", dashboard.addComment);
router.get("/dashboard/deleteAssessment/:id", dashboard.deleteAssessment);
router.get("/profile", profile.index);
router.post("/updateprofile", profile.updateUserProfile);
router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerdashboard/:id", trainerdashboard.retrieveMember);
router.get("/trainerdashboard/deleteMember/:id", trainerdashboard.deleteMember);


module.exports = router;
