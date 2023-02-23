/* eslint-disable no-console */
/* Here is the explanation for the code above:
1. pipe - allows to pipe functions as arguments
2. has - checks if an object has a property
3. ifElse - checks if the first argument is true and if so, executes the second argument, otherwise executes the third
4. assoc - creates a new object by setting a property on an object
5. identity - returns the first argument it receives
6. allPass - takes a list of predicates and returns a new function that is the logical and of all of them
7. propEq - creates a function that checks if the property of an object is equal to a given value */
const {pipe, has, ifElse, assoc, identity, allPass, propEq} = require('ramda');

/* Here is the explanation for the code above:
1. All the functions in the array are evaluated one after another. 
2. ifElse() will always evaluate the 3 functions, because it is curried. 
3. If all the predicates are true (status = 500 and NODE_ENV = 'production'), then the 3rd function (assoc) is returned.
4. If any of the predicates is false, then the 2nd function (identity) is returned. */
const withFormatMessageForProduction = ifElse(
  allPass([propEq('status', 500), () => process.env.NODE_ENV === 'production']),
  assoc('message', 'Internal server error occurred.'),
  identity
);

/* Here is the explanation for the code above:
1. The first pipe is to create an object that has the error's message as a property.
2. The ifElse is to check if the error object has a status property, if so, it returns the error object itself. If not, it returns a new error object with a status property set to 500.
3. The withFormatMessageForProduction is a function that formats the message property of the error object to be more user-friendly. The function is explained in the next section.
4. The last pipe is to send the error object to the client. The response status is set to the error status and the response body is set to the error object itself. */
module.exports = (error, req, res, next) => 
  /**
     * @name error
     * @description Middleware that handles errors
     */
  pipe(
    (e) => ({...e, message: e.message}),
    ifElse(has('status'), identity, assoc('status', 500)),
    withFormatMessageForProduction,
    (fError) => res.status(fError.status).json(fError)
  )(error);
