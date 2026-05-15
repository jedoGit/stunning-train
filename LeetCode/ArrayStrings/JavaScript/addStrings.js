// Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.

// You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.

// Example 1:

// Input: num1 = "11", num2 = "123"
// Output: "134"
// Example 2:

// Input: num1 = "456", num2 = "77"
// Output: "533"
// Example 3:

// Input: num1 = "0", num2 = "0"
// Output: "0"

// Constraints:

// 1 <= num1.length, num2.length <= 104
// num1 and num2 consist of only digits.
// num1 and num2 don't have any leading zeros except for the zero itself.

// TC: O(max(length of n1, length of n2))
// SC: O(max(length of n1, length of n2)), we created a output string and at worst, the length is max(length of n1, length of n2)

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Record {
  constructor(num1, num2, expected) {
    this.num1 = num1;
    this.num2 = num2;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} num1
   * @param {string} num2
   * @return {string}
   */
  addStrings(num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    const sum = [];
    let carry = 0;

    while (i >= 0 || j >= 0 || carry) {
      const n1 = num1[i] || 0;
      const n2 = num2[j] || 0;
      const curSum = parseInt(n1) + parseInt(n2) + carry;
      const remainder = curSum % 10;

      sum.push(remainder);
      carry = curSum >= 10 ? 1 : 0;
      j -= 1;
      i -= 1;
    }

    return sum.reverse().join("");
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.addStrings(record.num1, record.num2);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: num1 = ${record.num1}, num2 = ${record.num2}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new Record("11", "123", "134"),
  new Record("456", "77", "533"),
  new Record("0", "0", "0"),
  new Record("999", "1", "1000"),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
