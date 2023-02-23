/* eslint-disable func-names */
/* Here is the explanation for the code above:
1. We require mongoose - library that will help us to work with MongoDB.
2. We require mongoose-beautiful-unique-validation - library that will help us to create beautiful errors for unique fields.
3. We require constants from the validation.js file. */
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {constants: {expires}} = require('../utilities/validation');

/* Here is the explanation for the code above:
1. The username is required and has to be lowercase.
2. The token is required.
3. The expireAt field is a Date type and it expires after 1 hour. */
const ResetSchema = new mongoose.Schema({
  username: {
    index: true,
    type: String,
    required: true,
    unique: 'A token already exists for that username!',
    lowercase: true
  },
  token: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {expires},
  },
});

// Plugin for Mongoose that turns duplicate errors into regular Mongoose validation errors.
/* Here is the explanation for the code above:
1. We require the beautifyUnique module
2. We define our schema
3. We add the beautifyUnique plugin to our schema
4. We export our schema */
ResetSchema.plugin(beautifyUnique);

/* Here is the explanation for the code above:
1. In this case, we are using the same model for both the User and the ResetToken, so we need to specify the name of the collection. The first argument of the module.exports is the name of the collection. In this case, we are using the name “reset-tokens”.
2. We don’t want to use the plural form of the name of the collection, so we need to set the pluralize to null.
3. The second argument of the module.exports is the schema of the collection. */
mongoose.pluralize(null);
module.exports = mongoose.model('reset-tokens', ResetSchema);
