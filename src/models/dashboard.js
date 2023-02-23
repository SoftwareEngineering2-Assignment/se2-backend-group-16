/* eslint-disable func-names */
/* Here is the explanation for the code above:
1. We import mongoose, mongoose-beautiful-unique-validation and the authentication helpers. 
2. We will use the passwordDigest and comparePassword functions to hash and compare passwords */
const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {passwordDigest, comparePassword} = require('../utilities/authentication/helpers');

/* Here is the explanation for the code above:
1. The first line is a comment.
2. The second line imports the mongoose library.
3. The third line is a comment.
4. The fourth line sets the mongoose version.
5. The fifth line is a comment.
6. The sixth line sets the mongoose connection.
7. The seventh line is a comment.
8. The eighth line sets the mongoose pluralization to null. */
mongoose.pluralize(null);

/* Here is the explanation for the code above:
1. We start by creating a Mongoose schema for the Dashboard model. The Dashboard model will be the
main model of our application. It will contain all the data that we need to render the dashboard
page.
2. The name field of the Dashboard model is the only required field. We use the index option to
create an index on this field. We need to create an index on this field because we are going to
use the name field to query for the dashboard.
3. The layout field contains the layout of the dashboard. It is an array of objects. Each object
contains the ID of the item in the dashboard and the position of the item on the dashboard. The
layout field is an array because it is possible to save multiple layouts for the dashboard. The
layout field is initialized with an empty array.
4. The items field contains the actual items that are displayed on the dashboard. It is an object
with the keys being the ID of the item and the value being the definition of the item. The items
field is initialized with an empty object.
5. The nextId field contains the next ID that will be assigned to an item. We need this field to
assign a unique ID to each item. The nextId field is initialized to 1.
6. The password field contains the password for the dashboard. The password is used to protect
the dashboard from unauthorized access. The password field is initialized to null.
7. The shared field contains a Boolean value that indicates whether the dashboard is shared or
not. If the dashboard is shared, the dashboard can be accessed by anyone who knows the name
of the dashboard. If the dashboard is not shared, only the owner of the dashboard can access the
dashboard. The shared field is initialized to false.
8. The views field contains the number of views for the dashboard. We are going to use this
field to display the number of views for a dashboard on the dashboard page. The views field is
initialized to 0.
9. The owner field contains the ID of the owner of the dashboard. The owner field is initialized
to null.
10. The createdAt field contains the date and time when the dashboard was created. The
createdAt field is initialized to the current date and time. */
const DashboardSchema = new mongoose.Schema(
  {
    name: {
      index: true,
      type: String,
      required: [true, 'Dashboard name is required']
    },
    layout: {
      type: Array,
      default: []
    },
    items: {
      type: Object,
      default: {}
    },
    nextId: {
      type: Number,
      min: 1,
      default: 1
    },
    password: {
      type: String,
      select: false,
      default: null
    },
    shared: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {type: Date}
  }
);

// Plugin for Mongoose that turns duplicate errors into regular Mongoose validation errors.
/* Here is the explanation for the code above:
1. It is a mongoose plugin which beautifies the error message when a 
unique field is violated
2. It is a mongoose plugin which beautifies the error message when a 
unique field is violated
3. It is a mongoose plugin which beautifies the error message when a 
unique field is violated */
DashboardSchema.plugin(beautifyUnique);

// Pre save hook that hashes passwords
/* Here is the explanation for the code above:
1. "Schema.pre" is a method that is executed before the "Schema" is saved into the database
2. "this.isModified('password')" is a method that checks if the password has been modified. If the password is modified, the passwordDigest function will be executed and the hashed password will be saved into the database
3. "this.isModified('name')" is a method that checks if the name has been modified. If the name is modified, the Date.now() method will be executed and the current date will be saved into the database */
DashboardSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = passwordDigest(this.password);
  }
  if (this.isModified('name')) {
    this.createdAt = Date.now();
  }
  return next();
});

// Model method that compares hashed passwords
/* Here is the explanation for the code above:
1. We are creating a method called comparePassword which accepts a parameter called password.
2. This method is going to compare the password passed in to the hashed password stored in the database.
3. To do this, we are going to call the function we created earlier called comparePassword.
4. The comparePassword function is expecting a password and a hashed password.
5. The first parameter is the password passed in to the method.
6. The second parameter is the password stored in the database (this.password).
7. This function will return the result of the comparison. */
DashboardSchema.methods.comparePassword = function (password) {
  return comparePassword(password, this.password);
};

/* Here is the explanation for the code above:
1. First, we import the mongoose module and create a schema using the mongoose.Schema() method.
2. Next, we create a schema for the dashboard collection. In this schema, we define the dashboard's name and the widgets array.
3. We then create a model for the dashboard collection by using the mongoose.model() method. */
module.exports = mongoose.model('dashboards', DashboardSchema);
