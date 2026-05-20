// Trailing zeros in a factorial come from multiplying pairs of 2 and 5.
// Since factors of 2 are more frequent,we only need to count
// the number of 5 s in the prime factorization of n!.

/**
 * @param {number} n
 * @return {number}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class TrailingZeroesRecord {
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
  trailingZeroes(n) {
    let count = 0;

    while (n > 0) {
      count = count + Math.floor(n / 5);
      n = Math.floor(n / 5);
    }

    return count;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.trailingZeroes(record.n);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`input: n: ${record.n}`);
  console.log(`expected: ${record.expected}`);
  console.log(`result: ${result}`);
  console.log(status);
}

const records = [
  new TrailingZeroesRecord(3, 0),
  new TrailingZeroesRecord(5, 1),
  new TrailingZeroesRecord(0, 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
