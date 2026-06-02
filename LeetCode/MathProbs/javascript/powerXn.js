const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Record {
  constructor(x, n, expected) {
    this.x = x;
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
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
}

function testSolution(record) {
  console.log(`input:\tx: ${record.x.toFixed(5)}`);
  console.log(`\tn: ${record.n}`);
  console.log(`expected: ${record.expected.toFixed(5)}`);

  const solution = new Solution();
  const result = solution.myPow(record.x, record.n);

  console.log(`result: ${result.toFixed(5)}`);
  console.log(
    result.toFixed(5) === record.expected.toFixed(5) ? Result.PASS : Result.FAIL,
  );
}

const records = [
  new Record(2.0, 10, 1024.0),
  new Record(2.1, 3, 9.261),
  new Record(2.0, -2, 0.25),
];

records.forEach((record, i) => {
  console.log(`# Test case ${i + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
