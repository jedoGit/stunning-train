// Given a string s, return the number of segments in the string.

// A segment is defined to be a contiguous sequence of non-space characters.

// Example 1:

// Input: s = "Hello, my name is John"
// Output: 5
// Explanation: The five segments are ["Hello,", "my", "name", "is", "John"]
// Example 2:

// Input: s = "Hello"
// Output: 1

// Constraints:

// 0 <= s.length <= 300
// s consists of lowercase and uppercase English letters, digits, or one of the following characters "!@#$%^&*()_+-=',.:".
// The only space character in s is ' '.

// TC: O(n)
// SC: O((n/2) - 1) we used an array to store the segments such as "a a a a a a".

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class CountSegmentsRecord {
  constructor(s, expected) {
    this.s = s;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  countSegments(s) {
    if (s.length < 1) return 0;

    let p = 0;
    let curVal = "";
    let res = [];

    while (p <= s.length) {
      if (s.at(p) !== " " && p < s.length) {
        curVal += s.at(p);
      } else if (
        (curVal.length > 0 && s.at(p) === " ") ||
        (curVal.length > 0 && p === s.length)
      ) {
        res.push(curVal);
        curVal = "";
      }

      p += 1;
    }

    return res.length;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.countSegments(record.s);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: s = ${JSON.stringify(record.s)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new CountSegmentsRecord("Hello, my name is John", 5),
  new CountSegmentsRecord("Hello", 1),
  new CountSegmentsRecord("", 0),
  new CountSegmentsRecord("                ", 0),
  new CountSegmentsRecord("Of all the gin joints in all the towns in all the world,   ", 13),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(30));
});
