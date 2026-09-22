// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

// Example 1:

// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 4
// Example 2:

// Input: matrix = [["0","1"],["1","0"]]
// Output: 1
// Example 3:

// Input: matrix = [["0"]]
// Output: 0

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaximalSquareRecord {
  constructor(matrix, expected) {
    this.matrix = matrix;
    this.expected = expected;
  }
}

class Solution {
  /**
   * Top-down memoization: each (r,c) caches the side length of the largest
   * square whose top-left corner is that cell.
   * @param {character[][]} matrix
   * @return {number}
   */
  maximalSquare(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let cache = {}; // map each(r,c) -> maxLength of square

    let helper = (r, c) => {
      if (r >= rows || c >= cols) {
        return 0;
      }

      if (!(`${r},${c}` in cache)) {
        let down = helper(r + 1, c);
        let right = helper(r, c + 1);
        let diag = helper(r + 1, c + 1);

        cache[`${r},${c}`] = 0;
        if (matrix[r][c] == "1") {
          cache[`${r},${c}`] = 1 + Math.min(down, right, diag);
        }
      }
      return cache[`${r},${c}`];
    };

    helper(0, 0);

    // Find the maxvalue from the array of values
    let res = [...Object.values(cache)].reduce((a, b) => (a > b ? a : b));

    return Math.pow(res, 2);
  }

  /**
   * Bottom-up tabulation: dp[i][j] is the side length of the largest square
   * whose bottom-right corner is matrix[i-1][j-1], padded with a zero row/col.
   * @param {character[][]} matrix
   * @return {number}
   */
  maximalSquareDP(matrix) {
    if (!matrix) {
      return 0;
    }

    let rows = matrix.length;
    let cols = matrix[0].length;

    let dp = Array(rows + 1)
      .fill()
      .map(() => Array(cols + 1).fill(0));

    let max_side = 0;

    for (let i = 1; i < rows + 1; i += 1) {
      for (let j = 1; j < cols + 1; j += 1) {
        if (matrix[i - 1][j - 1] === "1") {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
          max_side = Math.max(max_side, dp[i][j]);
        }
      }
    }

    return Math.pow(max_side, 2);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.maximalSquareDP(record.matrix);
  const pass = result === record.expected;

  console.log(`Input: matrix = ${JSON.stringify(record.matrix)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MaximalSquareRecord(
    [
      ["1", "0", "1", "0", "0"],
      ["1", "0", "1", "1", "1"],
      ["1", "1", "1", "1", "1"],
      ["1", "0", "0", "1", "0"],
    ],
    4
  ),
  new MaximalSquareRecord(
    [
      ["0", "1"],
      ["1", "0"],
    ],
    1
  ),
  new MaximalSquareRecord([["0"]], 0),
  new MaximalSquareRecord([["1"]], 1),
  new MaximalSquareRecord(
    [
      ["1", "1", "1"],
      ["1", "1", "1"],
      ["1", "1", "1"],
    ],
    9
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
