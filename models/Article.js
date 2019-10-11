var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  //"summary is optional"
  summary: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
      type: Date,
      required: true
  },
  saved: {
      type: Boolean,
      default: false
  },

  //checking for category type
  business: {
      type: Boolean,
      default: false
  },
  codeswitch: {
    type: Boolean,
    default: false
  },
  health: {
    type: Boolean,
    default: false
  },
  news: {
    type: Boolean,
    default: false
  },
  politics: {
    type: Boolean,
    default: false
  },
  science: {
    type: Boolean,
    default: false
  },
  technology: {
    type: Boolean,
    default: false
  },
  world: {
    type: Boolean,
    default: false
  },

  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  noteId: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;