/* Here is the explanation for the code above:
1. we're importing the constants and schemas objects that we exported in the previous step.
2. we're exporting a new object that contains two properties: constants and schemas.
3. this new object is the module.exports object that will be exposed to the outside world (other files that import this module).
4. the module.exports object is automatically created by Node.js when a file is loaded.
5. we're using the require() function to import the constants and schemas modules.
6. the require() function returns the module.exports object that was exported in the other file.
7. we're using the object destructuring pattern to extract the constants and schemas properties from the object returned by the require() function.
8. we're using the object literal shorthand syntax to create a new object with the constants and schemas properties. */
const constants = require('./constants');
const schemas = require('./schemas');

module.exports = {
  constants,
  schemas
};
