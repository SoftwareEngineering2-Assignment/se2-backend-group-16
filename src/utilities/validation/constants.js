/* Here is the explanation for the code above:
1. min is the minimum number of characters that a user must enter in order to get a recommendation.
2.  expires is the time period that a recommendation should stay in the database.  In this case, the recommendation will stay in the database for 12 hours. */
const min = 5;
const expires = '12h';

module.exports = {min, expires};
