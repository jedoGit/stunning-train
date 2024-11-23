// Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

// You have the following three operations permitted on a word:

// Insert a character
// Delete a character
// Replace a character

// Example 1:

// Input: word1 = "horse", word2 = "ros"
// Output: 3
// Explanation:
// horse -> rorse (replace 'h' with 'r')
// rorse -> rose (remove 'r')
// rose -> ros (remove 'e')
// Example 2:

// Input: word1 = "intention", word2 = "execution"
// Output: 5
// Explanation:
// intention -> inention (remove 't')
// inention -> enention (replace 'i' with 'e')
// enention -> exention (replace 'n' with 'x')
// exention -> exection (replace 'n' with 'c')
// exection -> execution (insert 'u')

// Constraints:

// 0 <= word1.length, word2.length <= 500
// word1 and word2 consist of lowercase English letters.

// TC: O(n*m) because we'll have to create a grid and visit each grid
// SC: O(n*m) because we'll have to create a grid and visit each grid

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let n = word1.length;
  let m = word2.length;
  let dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(Infinity));

  // Fill the right most column and bottom row with our base cases
  // If W1 is empty and W2 is not, it will take W2.length of operations to convert W1 to W2
  // If W1 is not empty and W2 is empty, it will take W1.length of operations to convert W1 to W2
  // Fill the rightmost column
  for (let i = 0; i < n + 1; i++) {
    dp[i][m] = n - i;
  }
  // Fill the bottom row
  for (let j = 0; j < m + 1; j++) {
    dp[n][j] = m - j;
  }

  // If W1 == W2, there's no operation, just take the value from the lower diagonal [i+1][j+1]
  // If W1 != W2, first, we'll find the min from the 3 operations and add 1:
  // Delete:  [i+1][j], a delete is equivalent to moving the i pointer of W1 in terms of operations required
  // Insert:  [i][j+1], an insert is equivalent to moving the j pointer of W2 in terms of operations required
  // Replace: [i+1][j+1], a replace is equivalent to doing a delete and insert

  // We'll do bottoms up approach of 2D DP.
  for (let i = n - 1; i > -1; i--) {
    for (let j = m - 1; j > -1; j--) {
      // Check if W1 and W2 is equal
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i + 1][j + 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1]);
      }
    }
  }

  // The min value will be saved in dp[0][0]
  return dp[0][0];
};
