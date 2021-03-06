const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
let db = require("./models");

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
//=================================================//
app.use(logger("dev"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// // parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));
//=================================================//

// Set Handlebars
//=================================================//
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//=================================================//

// Connect to the Mongo DB
//=================================================//
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/OverwatchLeagueNews";

// Connect Mongoose to db
mongoose.connect(MONGODB_URI, function (error) {
  // Log any errors connection with mongoose
  if (error) {
      console.log(error);
  }
  // or log a success message
  else {
      console.log("mongoose connection is successful");
  }
});
//=================================================//


// Routes
//=================================================//
const articleController = require("./controllers/article-controller");
const noteController = require("./controllers/note-controller")
const viewController = require("./controllers/view-controller");

app.use(articleController);
app.use(noteController);
app.use(viewController);
//=================================================//

// Start Server
app.listen(PORT, function() {
    console.log("App listening on PORT @ http://localhost:" + PORT);
  });