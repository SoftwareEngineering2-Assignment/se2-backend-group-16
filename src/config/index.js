/* Here is the explanation for the code above:
1. We require in the ./mongoose.js file which contains the code for connecting to the database.
2. We then export the mongoose object which contains the models and the connection object. */
const mongoose = require('./mongoose');

module.exports = {mongoose}; 
