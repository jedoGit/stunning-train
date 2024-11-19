// You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.

// Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 109 + 7.

// In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

// Example 1:

// Input: n = 3
// Output: 5
// Explanation: The five different ways are show above.
// Example 2:

// Input: n = 1
// Output: 1

// Constraints:

// 1 <= n <= 1000

// TC: O(n) looping through n times to compute the number of ways
// SC: O(1) in place processing

/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
  // This is not straigth forward and intuitive. You'll need to draw out the dominoes and trominoes to see the pattern.
  // After seeing the patter, you'll need to create an equation to solve using DP.
  // The formula to solve is dp[n] = (2*dp[n-1] + dp[n-3])%MOD
  // You have the values for the first 3 solution which is dp=[0,1,2,5]
  const MOD = 10 ** 9 + 7;
  let dp = {};

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;

  for (let i = 4; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
  }

  return dp[n];
};
