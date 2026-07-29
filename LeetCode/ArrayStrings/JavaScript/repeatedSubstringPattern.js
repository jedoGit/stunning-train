// Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

// Example 1:

// Input: s = "abab"
// Output: true
// Explanation: It is the substring "ab" twice.
// Example 2:

// Input: s = "aba"
// Output: false
// Example 3:

// Input: s = "abcabcabcabc"
// Output: true
// Explanation: It is the substring "abc" four times or the substring "abcabc" twice.

// Constraints:

// 1 <= s.length <= 104
// s consists of lowercase English letters.

// TC: O(n) because at most, we have to repeat the substring (length 1) by n/1 times.
// SC: O(n/2) at most, we have a substring of n/2 chars

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class RepeatedSubstringPatternRecord {
  constructor(s, expected) {
    this.s = s;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  repeatedSubstringPattern(s) {
    // abab

    // Let's start with the first char in s and append to our substring.
    // Let's repeat it by length of s / lenght of substr.
    // Then compare if it's equal to s.

    if (s.length < 2) {
      return false;
    }

    let subStr = "";
    const n = s.length;

    // We only need to stop at the mid length of s.
    for (let i = 0; i < n / 2; i += 1) {
      subStr += s[i];

      let rep = n / subStr.length;

      if (subStr.repeat(rep) === s) {
        // console.log(subStr, subStr.repeat(rep))
        return true;
      }
    }

    return false;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.repeatedSubstringPattern(record.s);
  const pass = result === record.expected;

  console.log(`Input: s = ${JSON.stringify(record.s)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new RepeatedSubstringPatternRecord("abab", true),
  new RepeatedSubstringPatternRecord("aba", false),
  new RepeatedSubstringPatternRecord("abcabcabcabc", true),
  new RepeatedSubstringPatternRecord("a", false),
  new RepeatedSubstringPatternRecord("aa", true),
  new RepeatedSubstringPatternRecord("abaababaab", true),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
