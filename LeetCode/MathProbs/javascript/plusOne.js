// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

// Increment the large integer by one and return the resulting array of digits.

// Example 1:

// Input: digits = [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.
// Incrementing by one gives 123 + 1 = 124.
// Thus, the result should be [1,2,4].
// Example 2:

// Input: digits = [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.
// Incrementing by one gives 4321 + 1 = 4322.
// Thus, the result should be [4,3,2,2].
// Example 3:

// Input: digits = [9]
// Output: [1,0]
// Explanation: The array represents the integer 9.
// Incrementing by one gives 9 + 1 = 10.
// Thus, the result should be [1,0].

// Constraints:

// 1 <= digits.length <= 100
// 0 <= digits[i] <= 9
// digits does not contain any leading 0's.

// TC: O(n)
// SC: O(1)

/**
 * @param {number[]} digits
 * @return {number[]}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class PlusOneRecord {
  constructor(digits, expected) {
    this.digits = digits;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} digits
   * @return {number[]}
   */
  plusOne(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
      if (digits[i] + 1 !== 10) {
        digits[i] += 1;
        return digits;
      }
      digits[i] = 0;
      if (i === 0) {
        digits.unshift(1);
        return digits;
      }
    }
  }
}

function testSolution(record) {
  const solution = new Solution();
  const digits = [...record.digits];
  const result = solution.plusOne(digits);
  const status = JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`input: digits: ${JSON.stringify(record.digits)}`);
  console.log(`expected: ${JSON.stringify(record.expected)}`);
  console.log(`result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new PlusOneRecord([1, 2, 3], [1, 2, 4]),
  new PlusOneRecord([4, 3, 2, 1], [4, 3, 2, 2]),
  new PlusOneRecord([9], [1, 0]),
  new PlusOneRecord([9, 9, 9], [1, 0, 0, 0]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
