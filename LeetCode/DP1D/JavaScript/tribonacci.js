// The Tribonacci sequence Tn is defined as follows:

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.

// Example 1:

// Input: n = 4
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
// Example 2:

// Input: n = 25
// Output: 1389537

// Constraints:

// 0 <= n <= 37
// The answer is guaranteed to fit within a 32-bit integer, ie. answer <= 2^31 - 1.

// TC: O(n), we basically do DP n times
// SC: O(1), in place processing

/**
 * @param {number} n
 * @return {number}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class TribonacciRecord {
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
  tribonacci(n) {
    let t = [0, 1, 1];

    if (n < 3) {
      return t[n];
    }

    // We use array deconstruction
    // In javascript, the RHS is always executed first then assigned to the LHS
    // For each iteration perform this:
    // [ t0,  t1, t2 ] = [ t1, t2, sum(t0, t1, t2) ]
    for (let i = 3; i < n + 1; i++) {
      [t[0], t[1], t[2]] = [t[1], t[2], t[0] + t[1] + t[2]];
    }

    return t[2];
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.tribonacci(record.n);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: ${record.n}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new TribonacciRecord(4, 4),
  new TribonacciRecord(25, 1389537),
  new TribonacciRecord(0, 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
