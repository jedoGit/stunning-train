// Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right,
// which minimizes the sum of all numbers along its path.

// Note: You can only move either down or right at any point in time.

// Example 1:

// Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
// Output: 7
// Explanation: Because the path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum.
// Example 2:

// Input: grid = [[1,2,3],[4,5,6]]
// Output: 12

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 200
// 0 <= grid[i][j] <= 200

// TC: O(m * n) we visit each cell once
// SC: O(m * n) for the padded dp table

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MinPathSumRecord {
  constructor(grid, expected) {
    this.grid = grid;
    this.expected = expected;
  }
}

class Solution {
  /**
   * Bottom-up tabulation: res[i][j] is the minimum path sum from (i,j) to the
   * bottom right cell. The table is padded with one extra row/col of
   * MAX_SAFE_INTEGER so out of bound moves are never picked, except for the
   * sentinel below the last cell which is seeded with 0.
   * @param {number[][]} grid
   * @return {number}
   */
  minPathSum(grid) {
    let ROWS = grid.length;
    let COLS = grid[0].length;

    let res = Array(ROWS + 1)
      .fill(null)
      .map(() => Array(COLS + 1).fill(Number.MAX_SAFE_INTEGER));

    res[ROWS][COLS - 1] = 0;

    for (let i = ROWS - 1; i > -1; i -= 1) {
      for (let j = COLS - 1; j > -1; j -= 1) {
        res[i][j] = grid[i][j] + Math.min(res[i + 1][j], res[i][j + 1]);
      }
    }

    return res[0][0];
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.minPathSum(record.grid);
  const pass = result === record.expected;

  console.log(`Input: grid = ${JSON.stringify(record.grid)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MinPathSumRecord(
    [
      [1, 3, 1],
      [1, 5, 1],
      [4, 2, 1],
    ],
    7
  ),
  new MinPathSumRecord(
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    12
  ),
  new MinPathSumRecord([[5]], 5),
  new MinPathSumRecord([[1, 2, 5]], 8),
  new MinPathSumRecord([[3], [1], [4]], 8),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
