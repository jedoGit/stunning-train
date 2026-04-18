const Result = Object.freeze({
  PASS: "\x1b[92mPASS\x1b[0m",
  FAIL: "\x1b[91mFAIL\x1b[0m",
});

class SquareRootX {
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

  /**
   * Static method to test the solution
   * @param {Object} record
   */
  static testSolution(record) {
    console.log(`input: x: ${record.x}`);
    console.log(`expected: ${record.expected}`);

    const solver = new SquareRootX();
    const res = solver.mySqrt(record.x);

    console.log(`result: ${res}`);
    console.log(res === record.expected ? Result.PASS : Result.FAIL);
  }
}

// Main Execution
const records = [
  { x: 4, expected: 2 },
  { x: 8, expected: 2 },
  { x: 2147395599, expected: 46339 },
];

records.forEach((record, i) => {
  console.log(`# Test case ${i + 1}`);
  SquareRootX.testSolution(record);
  console.log("-".repeat(50));
});
