// The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

// Given an integer n, return the number of distinct solutions to the n-queens puzzle.

// Example 1:

// Input: n = 4
// Output: 2
// Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
// Example 2:

// Input: n = 1
// Output: 1

// Constraints:

// 1 <= n <= 9

// TC:
// SC:

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class NQueensIIRecord {
  constructor(n, expected) {
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number} n
   * @return {number}
   */
  totalNQueens(n) {
    let col = new Set();
    let posDiag = new Set();
    let negDiag = new Set();

    let res = 0;

    // Helper function
    const backtrack = (r) => {
      if (r === n) {
        res += 1;
        return;
      }

      for (let c = 0; c < n; c += 1) {
        if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
          continue;
        }

        col.add(c);
        posDiag.add(r + c);
        negDiag.add(r - c);

        backtrack(r + 1);

        col.delete(c);
        posDiag.delete(r + c);
        negDiag.delete(r - c);
      }

      return;
    };

    // Call backtrack
    backtrack(0);

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.totalNQueens(record.n);
  const pass = result === record.expected;

  console.log(`Input: n = ${record.n}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new NQueensIIRecord(4, 2),
  new NQueensIIRecord(1, 1),
  new NQueensIIRecord(2, 0),
  new NQueensIIRecord(3, 0),
  new NQueensIIRecord(5, 10),
  new NQueensIIRecord(8, 92),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
