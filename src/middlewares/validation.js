/* Here is the explanation for the code above:
1. We are using ES6 destructuring to import the 'schemas' property from the 'validation' module,
   we rename it to 'validationSchemas' for the sake of simplicity
2. The 'validation' module exports a single object with a property called 'schemas', we destructure
   it to be able to access it directly as 'validationSchemas' */
const {schemas: validationSchemas} = require('../utilities/validation');

/* Here is the explanation for the code above:
1. The validation function is an async function that has four parameters:
  - req: the request object
  - res: the response object
  - next: a function that will be called once the validation is complete
  - schema: the schema that the body will be tested against
2. The validation function will first try to validate the body against the schema
3. If there is no error, the next middleware will be called
4. If there is an error, the next middleware will be called with the error object */
module.exports = async (req, res, next, schema) => {
  /**
     * @name validation
     * @description Middleware that tests the validity of a body given a specified schema
     */
  try {
    const {body} = req;
    await validationSchemas[schema].validate(body);
    next();
  } catch (err) {
    next({
      message: `Validation Error: ${err.errors[0]}`,
      status: 400
    });
  }
};
