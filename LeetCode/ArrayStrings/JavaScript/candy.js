// There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

// You are giving candies to these children subjected to the following requirements:

// Each child must have at least one candy.
// Children with a higher rating get more candies than their neighbors.
// Return the minimum number of candies you need to have to distribute the candies to the children.

// Example 1:

// Input: ratings = [1,0,2]
// Output: 5
// Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
// Example 2:

// Input: ratings = [1,2,2]
// Output: 4
// Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
// The third child gets 1 candy because it satisfies the above two conditions.

// Constraints:

// n == ratings.length
// 1 <= n <= 2 * 104
// 0 <= ratings[i] <= 2 * 104

// TC: O(4n) => O(n) because we have to initialize candy array of n students with 1, loop left, then right then accumulate the sum of n student ratings
// SC: O(n) because we have to create an array to store the candies for each students

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  // We need to set an candiesay to capture how many candies were given per student and initialize with zero
  // index  0,1,2,3,4,5
  // candies = [1,1,1,1,1,1]
  const n = ratings.length;
  let candies = new Array(n).fill(1);

  // For the first pass, we need to loop from left to right and compare if the left rating is less than the current rating
  // If so, the value of the current candy is the left candy plus 1
  for (let i = 1; i < n; i++) {
    if (ratings[i - 1] < ratings[i]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // The second pass, we need to loop from right to left and compare if the right rating is less than the current rating
  // If so, we take the max of the current candy and the right candy plus 1 and assign to the current candy.
  for (let i = n - 2; i > -1; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // Finally we need to sum all values of the candies candiesay and return it
  const ret = candies.reduce((acc, curVal) => acc + curVal, 0);

  return ret;
};
