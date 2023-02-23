/* eslint-disable func-names */
/* Here is the explanation for the code above:
1. We require mongoose as usual.
2. We require mongoose-beautiful-unique-validation for customizing the error messages for unique fields.
3. We require our passwordDigest and comparePassword functions.
4. We require the constants from our validation utility. */
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {passwordDigest, comparePassword} = require('../utilities/authentication/helpers');
const {constants: {min}} = require('../utilities/validation');

/* Here is the explanation for the code above:
1. The first line tells Mongoose to use native promises
2. The second line tells Mongoose to use ES6 implementation of promises
3. The third line tells Mongoose to not pluralize the name of the model (i.e. model name as it is) */
mongoose.pluralize(null);

/* Here is the explanation for the code above:
1. The user email is required and must be unique.
2. The user password is required, must be at least 8 characters long and must be stored in the database as an encrypted value.
3. The username is required and must be unique.
4. The registrationDate is a timestamp that is automatically created when a new user is created. */
const UserSchema = new mongoose.Schema(
  {
    email: {
      index: true,
      type: String,
      unique: 'A user already exists with that email!',
      required: [true, 'User email is required'],
      lowercase: true
    },
    username: {
      index: true,
      type: String,
      unique: 'A user already exists with that username!',
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
      select: false,
      minlength: min
    },
    registrationDate: {type: Number}
  }
);

// Plugin for Mongoose that turns duplicate errors into regular Mongoose validation errors.
/* Here is the explanation for the code above:
1. require mongoose
2. require beautify-unique
3. create your schema
4. add beautify-unique to your schema
5. export your schema */
UserSchema.plugin(beautifyUnique);

// Pre save hook that hashes passwords
/* Here is the explanation for the code above:
1. Password is hashed before it is stored in the database.
2. Registration date is set when the user registers for the first time. */
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = passwordDigest(this.password);
  }
  if (this.isModified('email') || this.isModified('username')) {
    this.registrationDate = Date.now();
  }
  return next();
});

// Model method that compares hashed passwords
/* Here is the explanation for the code above:
1. The comparePassword method takes a password as a parameter.
2. The comparePassword function is then called with the password and the user's password as parameters.
3. If the password is equal to the user's password, then the method returns true.
4. Else, the method returns false. */
UserSchema.methods.comparePassword = function (password) {
  return comparePassword(password, this.password);
};

/* Here is the explanation for the code above:
1. mongoose.model() is a function that takes two parameters, the first one is the name of the model, and the second one is the schema.
2. mongoose.Schema() is a function that creates a schema.
3. The schema is a blueprint of how the data is going to be stored in the database. The schema is the structure of the data.
4. The schema has three properties: name, email, and password.
5. The name property is of type String, and it's required.
6. The email property is of type String, and it's required.
7. The password property is of type String, and it's required.
8. The module.exports exports the model. */
module.exports = mongoose.model('users', UserSchema);
