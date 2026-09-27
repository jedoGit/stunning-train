// Given a triangle array, return the minimum path sum from top to bottom.

// For each step, you may move to an adjacent number of the row below. More formally,
// if you are on index i on the current row, you may move to either index i or index i + 1
// on the next row.

// Example 1:

// Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// Output: 11
// Explanation: The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11.
// Example 2:

// Input: triangle = [[-10]]
// Output: -10

// TC: O(n^2) we visit each cell of the triangle once
// SC: O(n) for the 1D dp array

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class TriangleMinTotalRecord {
  constructor(triangle, expected) {
    this.triangle = triangle;
    this.expected = expected;
  }
}

class Solution {
  /**
   * Bottom-up: walk rows from the bottom, dp[i] holds the minimum path sum
   * starting at index i of the current row.
   * Note: reverses the input triangle in place.
   * @param {number[][]} triangle
   * @return {number}
   */
  minimumTotal(triangle) {
    let dp = Array(triangle.length + 1).fill(0);

    for (let row of triangle.reverse()) {
      for (let i of Array.from({ length: row.length }, (_, i) => i)) {
        dp[i] = row[i] + Math.min(dp[i], dp[i + 1]);
      }
    }

    return dp[0];
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.minimumTotal(record.triangle.map((row) => [...row]));
  const pass = result === record.expected;

  console.log(`Input: triangle = ${JSON.stringify(record.triangle)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new TriangleMinTotalRecord([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]], 11),
  new TriangleMinTotalRecord([[-10]], -10),
  new TriangleMinTotalRecord([[-1], [2, 3], [1, -1, -1]], 0),
  new TriangleMinTotalRecord([[1], [2, 3]], 3),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
