
const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express');

let db = require("../models");
let router = express.Router();



router.get("/scrape", function (req, res) {
  axios.get("https://overwatchleague.com/en-us/news").then(function (response) {

    var $ = cheerio.load(response.data);

    $("div.SearchResult").each(function (i, element) {

      var result = {};

      result.headline = $(this)
        .find("h6")
        .children("a")
        .text();
      result.summary = $(this)
        .find("p.SearchResult-desc")
        .text();
      result.image = $(this)
        .find("div.SearchResult-item")
        .children("a")
        .attr("style").split("\'")[1];
      result.url = 'https://overwatchleague.com/en-us/news' +
        $(this)
          .find("h6")
          .children("a")
          .attr("href");
      result.timeStamp = $(this)
        .find("time")
        .text();

      if (result.headline && result.summary && result.image && result.url && result.timeStamp) {
        db.Article.create(result)
          .then(function () {
          })
          .catch(function (err) {
            return res.json(err);
          });
      }
    });

    res.redirect("/");
  });
});

router.get("/feed", function (req, res) {
  db.Article.find({})
    .then(function (data) {
      res.render('feed', { Article: data })
    })
    .catch(function (err) {
      res.json(err);
    });
});


router.get("/saved", function (req, res) {

  db.Article.find({})
    .populate("note")
    .then(function (data) {
      res.render('saved', { Article: data })
    })
    .catch(function (err) {
      res.json(err);
    });


});

router.post("/article/save/:id", function (req, res) {
  let id = req.params.id
  db.Article.update({ _id: id }, { $set: { saved: true } })
    .then(function () {
      res.redirect("/")
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/article/remove/:id", function (req, res) {
  let id = req.params.id
  db.Article.deleteOne({ _id: id })
    .then(function () {
      res.redirect("/saved")
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/article/clearDB", function (req, res) {
  db.Article.remove({})
    .then(function () {
      res.redirect("/")
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/articles/api", function (req, res) {
  db.Article.find({})
    .then(function (data) {
      res.json(data)
    })
    .catch(function (err) {
      res.json(err)
    })
})
module.exports = router;

