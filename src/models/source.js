/* eslint-disable func-names */
/* Here is the explanation for the code above:
1. We import mongoose
2. We import mongoose-beautiful-unique-validation */
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

/* Here is the explanation for the code above:
1. mongoose.pluralize(null); // This line will remove the pluralization of the collection name
2. const Schema = mongoose.Schema; // This line will create a schema variable
3. const UserSchema = new Schema({ // This line will create a UserSchema variable
4.     name: String, // This line will set the name for the collection
5.     email: String, // This line will set the email for the collection
6.     password: String, // This line will set the password for the collection
7.     isAdmin: Boolean // This line will set the isAdmin for the collection
8. }); // This line will close the schema
9. module.exports = mongoose.model('User', UserSchema); // This line will export the model */
mongoose.pluralize(null);

/* Here is the explanation for the code above:
1. The schema has a name property that is required and indexed.
2. The schema has a type property that is a string.
3. The schema has a url property that is a string.
4. The schema has a login property that is a string.
5. The schema has a passcode property that is a string.
6. The schema has a vhost property that is a string.
7. The schema has a owner property that is a reference to a User document.
8. The schema has a createdAt property that is a date. */
const SourceSchema = new mongoose.Schema(
  {
    name: {
      index: true,
      type: String,
      required: [true, 'Source name is required']
    },
    type: {type: String},
    url: {type: String},
    login: {type: String},
    passcode: {type: String},
    vhost: {type: String},
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {type: Date}
  }
);

// Plugin for Mongoose that turns duplicate errors into regular Mongoose validation errors.
/* Here is the explanation for the code above:
1. We import mongoose and beautify-unique
2. We create a variable called SourceSchema which is a Schema
3. We add a field called name of type string
4. We add a field called url of type string
5. We add a field called description of type string
6. We add a field called tags of type Array
7. We add a field called language of type string
8. We add a plugin called beautifyUnique to SourceSchema */
SourceSchema.plugin(beautifyUnique);

// Pre save hook that hashes passwords
/* Here is the explanation for the code above:
1. We use the pre() method to register a middleware function that will be called before the schema is saved. The pre() method takes two arguments: the first is the name of the middleware hook, the second is the callback function that will be executed. In this case, we are using the save() hook, which is called before the document is saved.
2. We use the isModified() method to check whether the name field was modified. If the name field was modified, we set the createdAt field to the current date using the Date object.
3. We call the next() method to pass control to the next middleware in the stack. If you do not call next(), the request will hang and will never be saved. */
SourceSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.createdAt = Date.now();
  }
  return next();
});

/* Here is the explanation for the code above:
1. We use the mongoose.model() method to create a model based on the schema. We pass two arguments:
    - The name of the model (in this case, "sources")
    - The schema (in this case, SourceSchema)
2. We export the model (in this case, Source) so that we can use it in other files. */
module.exports = mongoose.model('sources', SourceSchema);
