
const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express');

let db = require("../models");
let router = express.Router();

router.post("/note/create/:id", function (req, res) {
    id = req.params.id;
    body = req.body.body
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id },{$push:{ note: dbNote._id }}, { new: true });
        })
        .then(function (dbArticle) {
            res.redirect("/saved")
        })
        .catch(function (err) {
            res.json(err)
        })
});

router.post("/note/remove/:id", function (req, res) {
    let id = req.params.id
    db.Note.deleteOne({ _id: id })
      .then(function () {
        res.redirect("/saved")
      })
      .catch(function (err) {
        res.json(err);
      });
  });
router.get("/notes/api", function (req, res) {
    db.Note.find({})
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            res.json(err)
        })
})

module.exports = router;
