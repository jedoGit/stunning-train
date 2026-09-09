// Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
// Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.

// Example 1:

// Input: a = 2, b = 6, c = 5
// Output: 3
// Explanation: After flips a = 1 , b = 4 , c = 5 such that (a OR b == c)
// Example 2:

// Input: a = 4, b = 2, c = 7
// Output: 1
// Example 3:

// Input: a = 1, b = 2, c = 3
// Output: 0

// Constraints:

// 1 <= a <= 10^9
// 1 <= b <= 10^9
// 1 <= c <= 10^9

// TC: O(max(position of MSB of a and b and c)), it is based on the max position of the MSB on a and b and c. We will do a bit shift and check each bit until we hit the max MSB.
// SC: O(1) in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MinFlipsRecord {
  constructor(a, b, c, expected) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number} a
   * @param {number} b
   * @param {number} c
   * @return {number}
   */
  minFlips(a, b, c) {
    let tempA = a;
    let tempB = b;
    let tempC = c;
    let count = 0;

    //  a   b   c    flips
    //  0   0   0     0
    //  0   1   0     1
    //  1   0   0     1
    //  1   1   0     2
    //  0   0   1     1
    //  0   1   1     0
    //  1   0   1     0
    //  1   1   1     0

    while (tempC || tempB || tempA) {
      if (
        (!(tempC & 1) && !(tempA & 1) && tempB & 1) ||
        (!(tempC & 1) && tempA & 1 && !(tempB & 1)) ||
        (tempC & 1 && !(tempA & 1) && !(tempB & 1))
      ) {
        count += 1;
      } else if (!(tempC & 1) && tempA & 1 && tempB & 1) {
        count += 2;
      }

      tempA = tempA >> 1;
      tempB = tempB >> 1;
      tempC = tempC >> 1;
    }

    return count;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.minFlips(record.a, record.b, record.c);
  const pass = result === record.expected;

  console.log(`Input: a = ${record.a}, b = ${record.b}, c = ${record.c}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MinFlipsRecord(2, 6, 5, 3),
  new MinFlipsRecord(4, 2, 7, 1),
  new MinFlipsRecord(1, 2, 3, 0),
  new MinFlipsRecord(8, 3, 5, 3),
  new MinFlipsRecord(1, 1, 1, 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
