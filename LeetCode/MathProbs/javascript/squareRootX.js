const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class SquareRootRecord {
  constructor(x, expected) {
    this.x = x;
    this.expected = expected;
  }
}

class Solution {
  /**
   * Calculates the square root of x rounded down to the nearest integer.
   * @param {number} x
   * @return {number}
   */
  mySqrt(x) {
    let l = 0;
    let r = x;
    let res = 0;

    while (l <= r) {
      // Equivalent to l + ((r - l) // 2)
      let m = l + Math.floor((r - l) / 2);

      // Using m * m instead of m**2 or Math.pow to follow constraints
      if (m * m > x) {
        r = m - 1;
      } else if (m * m < x) {
        l = m + 1;
        res = m;
      } else {
        return m;
      }
    }
    return res;
  }

}

function testSolution(record) {
  console.log(`input: x: ${record.x}`);
  console.log(`expected: ${record.expected}`);

  const solution = new Solution();
  const result = solution.mySqrt(record.x);

  console.log(`result: ${result}`);
  console.log(result === record.expected ? Result.PASS : Result.FAIL);
}

const records = [
  new SquareRootRecord(4, 2),
  new SquareRootRecord(8, 2),
  new SquareRootRecord(2147395599, 46339),
];

records.forEach((record, i) => {
  console.log(`# Test case ${i + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
