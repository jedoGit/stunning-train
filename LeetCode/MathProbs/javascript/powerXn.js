const Result = Object.freeze({
  PASS: "\x1b[92mPASS\x1b[0m",
  FAIL: "\x1b[91mFAIL\x1b[0m",
});

class PowerXn {
  /**
   * @param {number} x
   * @param {number} n
   * @return {number}
   */
  myPow(x, n) {
    if (n < 0) {
      n = -n;
      x = 1 / x;
    }

    let pow = 1;

    while (n != 0) {
      if ((n & 1) != 0) {
        pow *= x;
      }
      x *= x;
      n >>>= 1;
    }

    return pow;
  }

  /**
   * Static method to test the solution
   * @param {Object} record
   */
  static testSolution(record) {
    console.log(`input:\tx: ${record.x.toFixed(5)}`);
    console.log(`\tn: ${record.n}`);
    console.log(`expected: ${record.expected.toFixed(5)}`);

    const solver = new PowerXn();
    const res = solver.myPow(record.x, record.n);

    console.log(`result: ${res.toFixed(5)}`);
    console.log(
      res.toFixed(5) === record.expected.toFixed(5) ? Result.PASS : Result.FAIL,
    );
  }
}

// Main Execution
const records = [
  { x: 2.0, n: 10, expected: 1024.0 },
  { x: 2.1, n: 3, expected: 9.261 },
  { x: 2.0, n: -2, expected: 0.25 },
];

records.forEach((record, i) => {
  console.log(`# Test case ${i + 1}`);
  PowerXn.testSolution(record);
  console.log("-".repeat(50));
});
