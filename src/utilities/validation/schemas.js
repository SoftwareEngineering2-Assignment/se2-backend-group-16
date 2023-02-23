/* Here is the explanation for the code above:
1. We are importing the ramda library and the min constant from the constants file
2. We are importing yup from the yup library */
const {isNil} = require('ramda');

const yup = require('yup');
const {min} = require('./constants');

/* Here is the explanation for the code above:
1. We are using the string() method to get the string object from the yup library.
2. The lowercase() method converts the string to lowercase.
3. The trim() method removes whitespace from both sides of a string.
4. The email() method validates if the value is an email. */
const email = yup
  .string()
  .lowercase()
  .trim()
  .email();

/* Here is the explanation for the code above:
1. Create a variable called username.
2. Use the .string() method to create a string.
3. Use the .trim() method to remove any blank space before and after the string. */
const username = yup
  .string()
  .trim();

  /* Here is the explanation for the code above:
1. We create a variable of type string called password.
2. We trim the value and remove any whitespace from password.
3. We check if password is less than the minimum length required. */
const password = yup
  .string()
  .trim()
  .min(min);

  /* Here is the explanation for the code above:
1. Since we want to validate a request object, we create a new object with a single key.
2. The key is username and we mark it as required.
3. Yup will then validate the request object to make sure it has a username property.
4. This is helpful when you’re validating the request object from an endpoint that requires a username parameter. */
const request = yup.object().shape({username: username.required()});

/* Here is the explanation for the code above:
1. We are creating a variable named authenticate with the value of yup.object().shape().
2. We are calling the shape() method of the object() method of the yup package. The shape() method takes an object as an argument.
3. The object we are passing to the shape() method has two properties: username and password.
4. The values of the username and password properties are the result of calling the required() method of the username and password variables. */
const authenticate = yup.object().shape({
  username: username.required(),
  password: password.required()
});

/* Here is the explanation for the code above:
1. The register variable is declared and assigned to an object shape.
2. The shape is the equivalent of a schema. It is what determines what the object will look like.
3. The shape has a property called email. The email property is assigned to the email variable.
4. The email variable is assigned to the email object shape.
5. The email object shape has a property called required. The required property is assigned to a function that returns a string. The string is the error message. The function is called when the validation fails.
6. The same happens for the password and username variables. */
const register = yup.object().shape({
  email: email.required(),
  password: password.required(),
  username: username.required()
});

/* Here is the explanation for the code above:
1. We create a new schema using yup.object().shape() with the username and password schema
2. We add a test on this schema using test() with a custom message and a test function
3. The test function takes an object with the username and password values as parameters
4. We then test if these values are null, and if they are, we return false and the test fails
5. If they are not null, we return true and the test passes */
const update = yup.object().shape({
  username,
  password
}).test({
  message: 'Missing parameters',
  test: ({username: u, password: p}) => !(isNil(u) && isNil(p))
});

/* Here is the explanation for the code above:
1. change is the name of the object
2. The shape of the object is an object with a password field
3. The password field is required */
const change = yup.object().shape({password: password.required()});

/* Here is the explanation for the code above:
1. The first line is a JavaScript module definition for the module.exports object.  This is a Node.js convention that allows other modules to access the functions in the module (authenticate, register, request, change, update).
2. The following lines are the function definitions for the functions in the module.  The authenticate function is the first function defined.  The authenticate function takes two parameters: username and password.  The function returns a Promise object that is resolved or rejected based on the result of the authentication.  The register function is the second function defined.  The register function takes two parameters: username and password.  The function returns a Promise object that is resolved or rejected based on the result of the registration.  The request function is the third function defined.  The request function takes one parameter: username.  The function returns a Promise object that is resolved or rejected based on the result of the request.  The change function is the fourth function defined.  The change function takes two parameters: username and password.  The function returns a Promise object that is resolved or rejected based on the result of the change.  The update function is the fifth function defined.  The update function takes two parameters: username and password.  The function returns a Promise object that is resolved or rejected based on the result of the update.
3. The last line in the file is a closing curly brace that closes the module.exports object. */
module.exports = {
  authenticate, register, request, change, update
};
