// Given two binary strings a and b, return their sum as a binary string.

// Example 1:

// Input: a = "11", b = "1"
// Output: "100"
// Example 2:

// Input: a = "1010", b = "1011"
// Output: "10101"

// Constraints:

// 1 <= a.length, b.length <= 104
// a and b consist only of '0' or '1' characters.
// Each string does not contain leading zeros except for the zero itself.

// TC: O(n + m) converting both strings to BigInt and the sum back to base 2
// SC: O(n + m) the BigInt operands and the resulting binary string

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class AddBinaryRecord {
  constructor(a, b, expected) {
    this.a = a;
    this.b = b;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} a
   * @param {string} b
   * @return {string}
   */
  addBinary(a, b) {
    // Use BigInt instead of parseInt
    let num1 = BigInt(`0b${a}`);
    let num2 = BigInt(`0b${b}`);

    let sum = num1 + num2;

    let binarySum = sum.toString(2);

    return binarySum;

    // Use BigInt instead of parseInt
    // let num1 = BigInt(`0b${a}`);
    // let num2 = BigInt(`0b${b}`);

    // while( num2 !== 0n ) {
    //     let carry = num1 & num2;
    //     num1 = num1 ^ num2;
    //     num2 = carry << 1n;
    // }

    //   return num1.toString(2);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.addBinary(record.a, record.b);
  const pass = result === record.expected;

  console.log(`Input: a = ${JSON.stringify(record.a)}, b = ${JSON.stringify(record.b)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new AddBinaryRecord("11", "1", "100"),
  new AddBinaryRecord("1010", "1011", "10101"),
  new AddBinaryRecord("0", "0", "0"),
  new AddBinaryRecord("1", "111", "1000"),
  new AddBinaryRecord("1111", "1111", "11110"),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
