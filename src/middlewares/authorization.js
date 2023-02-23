/* Here is the explanation for the code above:
1. We import the jwt library which is used to create and verify the token.
2. We import the path library which is used to get the authorization header from the request object.
3. We import the ifElse library which is used to create conditional statements.
4. We import the isNil library which is used to check if the authorization header is null.
5. We import the startsWith library which is used to check if the authorization header starts with the word 'Bearer'.
6. We import the slice library which is used to get the token from the authorization header.
7. We import the identity library which is used to return the token.
8. We import the pipe library which is used to compose functions. */
const jwt = require('jsonwebtoken');
const {path, ifElse, isNil, startsWith, slice, identity, pipe} = require('ramda');

/* Here is the explanation for the code above:
1. We are using the process object to access the environment variables.
2. The process object is a global object that provides information about, and control over, the current Node.js process.
3. The process.env property returns an object containing the user environment.
4. The SERVER_SECRET is the name of the environment variable.
5. And the secret variable will be used to store the value of the environment variable. */
const secret = process.env.SERVER_SECRET;

/* Here is the explanation for the code above:
1. The pipe function is used to compose the functions
2. The first function in the pipe function is used to retrieve the token from the request object
3. The second function in the pipe function is used to remove the Bearer from the token
4. The third function in the pipe function is used to verify the token and pass the data to the next function
5. The fourth function in the pipe function is used to handle errors
6. The fifth function in the pipe function is used to pass the decoded data to the next function */
module.exports = (req, res, next) => {
  /**
     * @name authorization
     * @description Middleware that checks a token's presence and validity in a request
    */
  pipe(
    (r) =>
      path(['query', 'token'], r)
          || path(['headers', 'x-access-token'], r)
          || path(['headers', 'authorization'], r),
    ifElse(
      (t) => !isNil(t) && startsWith('Bearer ', t),
      (t) => slice(7, t.length, t).trimLeft(),
      identity
    ),
    ifElse(
      isNil,
      () =>
        next({
          message: 'Authorization Error: token missing.',
          status: 403
        }),
      (token) =>
        jwt.verify(token, secret, (e, d) =>
          ifElse(
            (err) => !isNil(err),
            (er) => {
              if (er.name === 'TokenExpiredError') {
                next({
                  message: 'TokenExpiredError',
                  status: 401,
                });
              }
              next({
                message: 'Authorization Error: Failed to verify token.',
                status: 403
              });
            },
            (_, decoded) => {
              req.decoded = decoded;
              return next();
            }
          )(e, d))
    )
  )(req);
};
