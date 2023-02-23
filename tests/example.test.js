/* eslint-disable import/no-unresolved */
/* Here is the explanation for the code above:
1. We import the 'ava' library into our test file.
2. We import the 'default' property from the 'ava' library.
3. We assign the 'default' property to the 'test' variable. */
const test = require('ava').default;

/* Here is the explanation for the code above:
1. t.pass() is a method that passes the test case.
2. t.fail() is a method that fails the test case.
3. t.equal() is a method that compares the equality of two values.
4. t.deepEqual() is a method that compares the equality of two objects.
5. t.notEqual() is a method that compares the inequality of two values.
6. t.notDeepEqual() is a method that compares the inequality of two objects.
7. t.throws() is a method that checks whether a function throws an error.
8. t.notThrows() is a method that checks whether a function does not throw an error.
9. t.is() is a method that compares the strict equality of two values.
10. t.not() is a method that compares the strict inequality of two values.
11. t.regex() is a method that checks whether a string matches a regular expression.
12. t.ifError() is a method that checks whether the first argument is falsy. */
test('Test to pass', (t) => {
  t.pass();
});

/* Here is the explanation for the code above:
1. 'test' is a global function which is provided by the test runner
2. 'a' is a variable which is scoped to the test function
3. 't.is' is a method which is provided by the test runner
4. 't' is the test context which is provided by the test runner */
test('Test value', async (t) => {
  const a = 1;
  t.is(a + 1, 2);
});

/* Here is the explanation for the code above:
1. We defined a function called "sum" which takes two arguments: "a" and "b".
2. We used the arrow operator to define the function.
3. We used the "return" keyword to return the sum of "a" and "b".
4. We called the function "sum" with the arguments 2 and 3.
5. The function returned the value: 5. */
const sum = (a, b) => a + b;

/* Here is the explanation for the code above:
1. First we import test from ava
2. We declare the sum function that takes 2 arguments
3. We declare the test using test from ava
4. We pass the name of the test and a callback function
5. We use t.plan to specify the number of assertions in this test
6. We use t.pass to pass an assertion
7. We use t.is to check if the sum of 1 and 2 is 3 */
test('Sum of 2 numbers', (t) => {
  t.plan(2);
  t.pass('this assertion passed');
  t.is(sum(1, 2), 3);
});
