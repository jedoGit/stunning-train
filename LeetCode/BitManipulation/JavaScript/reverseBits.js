// Reverse bits of a given 32 bits unsigned integer.

// Note:

// Note that in some languages, such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer's internal binary representation is the same, whether it is signed or unsigned.
// In Java, the compiler represents the signed integers using 2's complement notation. Therefore, in Example 2 above, the input represents the signed integer -3 and the output represents the signed integer -1073741825.

// Example 1:

// Input: n = 00000010100101000001111010011100

// Output:    964176192 (00111001011110000010100101000000)

// Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

// Example 2:

// Input: n = 11111111111111111111111111111101

// Output:   3221225471 (10111111111111111111111111111111)

// Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.

// Constraints:

// The input must be a binary string of length 32

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ReverseBitsRecord {
  constructor(n, expected) {
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(1), we always inspect the 32 bits of the integer
  // SC: O(1), we only keep the running result
  /**
   * @param {number} n - a positive integer
   * @return {number} - a positive integer
   */
  reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
      // take the i bit from the end then perform & with ...000001
      // to obtain ...000000 or ...000001 as the i bit from the end of n.
      const bit = (n >> i) & 1;
      // Perform the OR | operator with result to append the bit
      // at index i position by shifting left bit (31 -i)
      result = result | (bit << (31 - i));
    }
    // For keeping the sign for the result.
    return result >>> 0;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.reverseBits(record.n);
  const pass = result === record.expected;

  console.log(`Input: n = ${record.n} (${(record.n >>> 0).toString(2).padStart(32, "0")})`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ReverseBitsRecord(43261596, 964176192),
  new ReverseBitsRecord(4294967293, 3221225471),
  new ReverseBitsRecord(0, 0),
  new ReverseBitsRecord(1, 2147483648),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
