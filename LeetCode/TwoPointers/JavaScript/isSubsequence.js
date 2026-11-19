// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

// Example 1:

// Input: s = "abc", t = "ahbgdc"
// Output: true
// Example 2:

// Input: s = "axc", t = "ahbgdc"
// Output: false

// Constraints:

// 0 <= s.length <= 100
// 0 <= t.length <= 104
// s and t consist only of lowercase English letters.

// Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 109, and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?

// TC: O(m+n) = O(n) because we have to loop through both string array
// SC: O(1)

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class IsSubsequenceRecord {
  constructor(s, t, expected) {
    this.s = s;
    this.t = t;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} s
   * @param {string} t
   * @return {boolean}
   */
  isSubsequence(s, t) {
    // We'll two pointers. One pointer to point on the elements in the s string, the other on the t string
    // We increment the pointer t until we find s===t, then we increment pointer s.
    let sp = 0;
    let tp = 0;

    // we need to loop through both string array and exit once we reach the end of the array
    while (sp < s.length && tp < t.length) {
      // Keep on checking if s is equal to t, if so, move the s pointer to the right
      if (s[sp] === t[tp]) {
        sp++;
      }
      tp++;
    }

    // This means that all of the elements in s are found in t
    return sp === s.length ? true : false;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.isSubsequence(record.s, record.t);
  const pass = result === record.expected;

  console.log(`Input: s = "${record.s}", t = "${record.t}"`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new IsSubsequenceRecord("abc", "ahbgdc", true),
  new IsSubsequenceRecord("axc", "ahbgdc", false),
  new IsSubsequenceRecord("", "ahbgdc", true),
  new IsSubsequenceRecord("abc", "", false),
  new IsSubsequenceRecord("aaa", "aa", false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
