// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
let router = require('express').Router();
let db = require("../models");

// Routes
// =============================================================

router.get("/", function (req, res) {
  res.redirect('/feed');
});

router.get("/feed", function (req, res) {
  res.render('feed');
});

router.get("/saved", function (req, res) {
  res.render('saved')
})

module.exports = router;