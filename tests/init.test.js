/* eslint-disable import/no-unresolved */
/* Here is the explanation for the code above:
1. require('dotenv').config() : This line of code will load the .env file from the same directory as the script and will parse it into an object called process.env.
2. process.env : This is an object that contains all the environment variables. 
3. process.env.YOUR_VARIABLE : This will give you the value of the environment variable. */
require('dotenv').config();

/* Here is the explanation for the code above:
1. The require function is a Node.js function that allows us to import libraries, and the node:http library allows us to create a server.
2. We are importing the test function from AVA, and the default function allows us to use the test function without using the curly braces.
3. The got library is a function that allows us to make HTTP requests.
4. The test-listen library is a function that allows us to create a local test server. */
const http = require('node:http');
const test = require('ava').default;
const got = require('got');
const listen = require('test-listen');

/* Here is the explanation for the code above:
1. We are requiring the index.js file of our application.
2. We are requiring the jwtSign function from our application. */
const app = require('../src/index');
const {jwtSign} = require('../src/utilities/authentication/helpers');

/* Here is the explanation for the code above:
1. test.before(async (t) => {
2.   t.context.server = http.createServer(app);
3.   t.context.prefixUrl = await listen(t.context.server);
4.   t.context.got = got.extend({
5.     http2: true,
6.     throwHttpErrors: false,
7.     responseType: 'json',
8.     prefixUrl: t.context.prefixUrl
9.   });
10. }); */
test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({http2: true, throwHttpErrors: false, responseType: 'json', prefixUrl: t.context.prefixUrl});
});

/* Here is the explanation for the code above:
1. We are using the test.after.always hook to ensure that the server is closed after all tests have run.
2. The test.after.always hook is the last hook to be executed after all tests have run.
3. It is important to note that the test.after.always hook is run even when a test fails.
4. This means that the server will be closed even if one or more tests fail. */
test.after.always((t) => {
  t.context.server.close();
});

/* Here is the explanation for the code above:
1. We are using the ava library to test the api. It is a testing framework for javascript.
2. The test function takes two arguments. The first argument is the description of the test. The second argument is the function containing the test.
3. We use the got library to make a request to the api. The first argument is the endpoint of the api. The second argument is an object containing the method of the request. We are using the GET method here.
4. The status code is 200. It means that the request was successful.
5. The body of the response is also checked. It is a json object. The success property is true. The sources property is 1. */
test('GET /statistics returns correct response and status code', async (t) => {
  const {body, statusCode} = await t.context.got('general/statistics');
  t.is(body.sources, 1);
  t.assert(body.success);
  t.is(statusCode, 200);
});

/* Here is the explanation for the code above:
1. The test function is called with two arguments: the first is the name of the test and the second is a function that will be executed when the test is run. This function is async because it contains an await statement.
2. The test function is called with the t argument. This argument is an object containing all the methods that are used to run assertions.
3. A token is created by calling the jwtSign function. The jwtSign function is called with an object that contains the id of the user to be authenticated as well as any other data that we want to send to the server.
4. The t.context.got function is called with the URL that we want to make the request to. The t.context.got function is a function that is defined in the beforeEach hook. The t.context.got function is used to send the request and to get the response from the server.
5. After the request is made, an assertion is made to check that the status code of the response is 200. */
test('GET /sources returns correct response and status code', async (t) => {
  const token = jwtSign({id: 1});
  const {statusCode} = await t.context.got(`sources/sources?token=${token}`);
  t.is(statusCode, 200);
});
