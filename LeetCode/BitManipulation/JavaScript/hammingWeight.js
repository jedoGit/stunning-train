// Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).

// Example 1:

// Input: n = 11

// Output: 3

// Explanation:

// The input binary string 1011 has a total of three set bits.

// Example 2:

// Input: n = 128

// Output: 1

// Explanation:

// The input binary string 10000000 has a total of one set bit.

// Example 3:

// Input: n = 2147483645

// Output: 30

// Explanation:

// The input binary string 1111111111111111111111111111101 has a total of thirty set bits.

// Constraints:

// 1 <= n <= 231 - 1

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class HammingWeightRecord {
  constructor(n, expected) {
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(1), we always inspect the 32 bits of the integer
  // SC: O(1), we only keep the running count
  /**
   * @param {number} n
   * @return {number}
   */
  hammingWeight(n) {
    let res = 0;
    for (let i = 0; i < 32; i++) {
      if ((n >> i) & 1) {
        res += 1;
      }
    }
    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.hammingWeight(record.n);
  const pass = result === record.expected;

  console.log(`Input: n = ${record.n}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new HammingWeightRecord(11, 3),
  new HammingWeightRecord(128, 1),
  new HammingWeightRecord(2147483645, 30),
  new HammingWeightRecord(1, 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
