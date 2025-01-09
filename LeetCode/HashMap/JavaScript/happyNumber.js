// Write an algorithm to determine if a number n is happy.

// A happy number is a number defined by the following process:

// Starting with any positive integer, replace the number by the sum of the squares of its digits.
// Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
// Those numbers for which this process ends in 1 are happy.
// Return true if n is a happy number, and false if not.

// Example 1:

// Input: n = 19
// Output: true
// Explanation:
// 12 + 92 = 82
// 82 + 22 = 68
// 62 + 82 = 100
// 12 + 02 + 02 = 1
// Example 2:

// Input: n = 2
// Output: false

// Constraints:

// 1 <= n <= 231 - 1

// TC: O(k*r) where k is the number of values computed as sum of square of digits until we find 1 or a duplicate. It could go to the limit of an integer.
//            r is the number of digits per iteration to compute the sum of squares.
// SC: O(k) where k is the number of values computed as sum of square of digits until we find 1 or a duplicate. It could go to the limit of an integer

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // We'll use a set to store the values that we've already visited
  // This is used to detect if we've reached a loop
  let visited = new Set();

  while (!visited.has(n)) {
    // add n to our visited list
    visited.add(n);

    // compute the new n which is the square of each digits of the previous n
    n = computeN(n);
    // console.log(n_)

    // check if it's a happy number
    if (n === 1) {
      return true;
    }
  }

  // This is our helper function
  function computeN(n) {
    let res = 0;
    // This goes through all the digit of n and accumulate the square of all the digits
    while (n) {
      let temp = n % 10; // This returns the most significant digit
      res += temp ** 2; // let's square the most significant digit and accumulate it on the res variable
      n = (n / 10) | 0; // we want to perform an integer division so we can get the next digit
      // console.log(n_)
    }

    return res;
  }

  return false;
};
