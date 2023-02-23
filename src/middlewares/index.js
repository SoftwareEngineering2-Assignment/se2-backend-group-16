/* Here is the explanation for the code above:
1. ./authorization is the file containing the authorization logic
2. ./error is the file containing the error handling logic
3. ./validation is the file containing the validation logic */
const authorization = require('./authorization');
const error = require('./error');
const validation = require('./validation');

/* Here is the explanation for the code above:
1. We import the http-status-codes package to use the constant values.
2. We create the module.exports object and add the three functions to it.
3. The authorization function takes the request and response objects as arguments.
4. We use the response object to send the error message using the status method and the UNAUTHORIZED constant value.
5. We use the json method to send the message as JSON data.
6. The error function takes the request and response objects as arguments.
7. We use the response object to send the error message using the status method and the INTERNAL_SERVER_ERROR constant value.
8. We use the json method to send the message as JSON data.
9. The validation function takes the request, response, and errors objects as arguments.
10. We use the response object to send the error message using the status method and the UNPROCESSABLE_ENTITY constant value.
11. We use the json method to send the message as JSON data. */
module.exports = {
  authorization,
  error,
  validation,
};
