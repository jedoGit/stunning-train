// Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

// For example, "ace" is a subsequence of "abcde".
// A common subsequence of two strings is a subsequence that is common to both strings.

// Example 1:

// Input: text1 = "abcde", text2 = "ace"
// Output: 3
// Explanation: The longest common subsequence is "ace" and its length is 3.
// Example 2:

// Input: text1 = "abc", text2 = "abc"
// Output: 3
// Explanation: The longest common subsequence is "abc" and its length is 3.
// Example 3:

// Input: text1 = "abc", text2 = "def"
// Output: 0
// Explanation: There is no such common subsequence, so the result is 0.

// Constraints:

// 1 <= text1.length, text2.length <= 1000
// text1 and text2 consist of only lowercase English characters.

// TC: O(n*m), we'll be visiting all the cells in our grid
// SC: O(n*m), we'll be creating a grid of size n x m

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  // The intuition for this 2-D DP is to setup an nxm grid where n and m are the length of the text input.
  // To perform bottoms up solution, we need to add a column of zeros to the rightmost side and a row of zeros
  // to the bottom of the grid.
  // Starting at arr[n-1][m-1] position, we perform this algorithm:
  // If text1[n-1] === text2[m-1], we calculate arr[n-1][m-1] = 1 + arr[n][m]
  //            basically 1 + the cell diagonal to the current cell
  // If text1[n-1] !== text2[m-1], we calculate arr[n-1][m-1] = max(arr[n][m-1], arr[n-1][m])
  //            basically, the max of the cell to the bottom and right of the current cell
  // The longest subsequence value will be in dp[0][0]

  // text1 = abcde , text2 = ace
  //          a   c   e
  //          0   1   2   3
  //          -------------
  //   a  0 | 3   2   1   0
  //   b  1 | 2   2   1   0
  //   c  2 | 2   2   1   0
  //   d  3 | 1   1   1   0
  //   e  4 | 1   1   1   0
  //      5 | 0   0   0   0

  let n = text1.length;
  let m = text2.length;

  // Create a grid with extra row and column and fill with zeros
  let dp = new Array(n + 1).fill().map(() => new Array(m + 1).fill(0));

  // Perform the algorithm:
  // If text1[n-1] === text2[m-1], we calculate arr[n-1][m-1] = 1 + arr[n][m]
  //            basically 1 + the cell diagonal to the current cell
  // If text1[n-1] !== text2[m-1], we calculate arr[n-1][m-1] = max(arr[n][m-1], arr[n-1][m])
  //            basically, the max of the cell to the bottom and right of the current cell
  for (let i = n - 1; i > -1; --i) {
    for (let j = m - 1; j > -1; --j) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      }
      if (text1[i] !== text2[j]) {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // The longest subsequence value will be in dp[0][0]
  return dp[0][0];
};
