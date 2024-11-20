// There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

// Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

// The test cases are generated so that the answer will be less than or equal to 2 * 109.

// Example 1:

// Input: m = 3, n = 7
// Output: 28
// Example 2:

// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

// Constraints:

// 1 <= m, n <= 100

// TC: O(n*m) because you'll need to visit all the cells and perform calculations
// SC: O(n*m), because you'll have to create the nxm matrix to perform calcs

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // The intuition here is let's say you have a 3x3 matrix
  // from the bottom right corner arr[2][2], it will take it
  // 2 moves from arr[1][1] since you can only go down and right direction.
  // So, using bottom up approach, to move arr[1][1] to arry[2][2],
  // it will be the sum of values below that cell and the right of that cell
  // For example, arr[1][1] = arr[2][1] (bottom cell) + arr[1][2] (right cell)
  // To setup the bottom up approach, we need to fill the bottom row and righmost column with 1
  // because, when you're in these cells, you only have 1 way, which is to move right (if youre in the bottom)
  // or move down (if you're in the rightmost column).

  // m = 3, n = 3
  //          0   1   2
  //          ---------
  //      0 | 6   3   1
  //      1 | 3   2   1
  //      2 | 1   1   1

  // If you want to do Top-down approach or memiozation, you'll need to setup a DFS.
  // Your base case is if you've reached x === m-1 && y = n-1
  // You'll need to mark all the cells you've visited so you don't do a double count... Use a set for that or another array that you'll
  // m = 3, n = 3
  //          0   1   2
  //          ---------
  //      0 | 1   1   1
  //      1 | 1   2   3
  //      2 | 1   3   6

  // Create 2D matrix and fill with zeros
  let dp = new Array(m).fill().map(() => new Array(n).fill(0));

  // Initialize the rightmost col and bottom row with 1
  for (let i = 0; i < m; i++) {
    dp[i][n - 1] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[m - 1][j] = 1;
  }

  // Perform bottoms up calculation of dp[i][j] = dp[i+1][j] + dp[i][j+1];
  // Starting at arr[m-2][n-2]
  for (let i = m - 2; i > -1; --i) {
    for (let j = n - 2; j > -1; --j) {
      dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
    }
  }

  // After all the calc, the value in arr[0][0] will contain the num of possible unique paths
  return dp[0][0];
};
