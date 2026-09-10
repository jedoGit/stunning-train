// Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.

// Example 1:

// Input: left = 5, right = 7
// Output: 4
// Example 2:

// Input: left = 0, right = 0
// Output: 0
// Example 3:

// Input: left = 1, right = 2147483647
// Output: 0

// Constraints:

// 0 <= left <= right <= 231 - 1

// TC: O(1)
// SC: O(1)

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class RangeBitwiseAndRecord {
  constructor(left, right, expected) {
    this.left = left;
    this.right = right;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  rangeBitwiseAnd(left, right) {
    let tempLeft = left;
    let tempRight = right;
    let cnt = 0;

    while (tempLeft !== tempRight) {
      tempLeft >>= 1;
      tempRight >>= 1;
      cnt++;
    }

    return tempLeft << cnt;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.rangeBitwiseAnd(record.left, record.right);
  const pass = result === record.expected;

  console.log(`Input: left = ${record.left}, right = ${record.right}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new RangeBitwiseAndRecord(5, 7, 4),
  new RangeBitwiseAndRecord(0, 0, 0),
  new RangeBitwiseAndRecord(1, 2147483647, 0),
  new RangeBitwiseAndRecord(20, 23, 20),
  new RangeBitwiseAndRecord(10, 10, 10),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
