let mongoose = require("mongoose");

// Save a reference to the Schema constructor
let Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
let ArticleSchema = new Schema({
  // `title` is required and of type String
  headline: {
    type: String,
    // required: true
  },
  summary: {
    type: String,
  },
  image: {
    type: String,
  },
  // `link` is required and of type String
  url: {
    type: String,
    required: true
  },
  timeStamp: {
    type: String
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
let Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
