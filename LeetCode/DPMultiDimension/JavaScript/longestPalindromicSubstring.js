// Given a string s, return the longest palindromic substring in s.

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"

// Constraints:

// 1 <= s.length <= 1000
// s consist of only digits and English letters.

// TC: O(n^2) we fill a n x n grid of substring palindrome answers
// SC: O(n^2) the dp grid holds an entry for every (start, end) pair

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class LongestPalindromeRecord {
  // expected holds the substring this bottom-up scan settles on when several
  // palindromes tie in length (it keeps the first longest it meets going right to left)
  constructor(s, expected) {
    this.s = s;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} s
   * @return {string}
   */
  longestPalindrome(s) {
    let n = s.length;
    let maxLen = 0;
    let ansLeft = 0;

    if (n === 0) return "";

    let dp = new Array(n).fill(null).map(() => new Array(n).fill(false));

    for (let i of Array.from({ length: n }, (_, i) => n - 1 - i)) {
      for (let j of Array.from({ length: n - i }, (_, ii) => i + ii)) {
        if (i === j) {
          dp[i][j] = true;
        } else {
          if (j === i + 1) {
            dp[i][j] = s[i] === s[j];
          } else {
            dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
          }
        }
        if (dp[i][j] && j - i + 1 > maxLen) {
          maxLen = j - i + 1;
          ansLeft = i;
        }
      }
    }

    return s.substring(ansLeft, ansLeft + maxLen);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.longestPalindrome(record.s);
  const pass = result === record.expected;

  console.log(`Input: s = ${JSON.stringify(record.s)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LongestPalindromeRecord("babad", "aba"),
  new LongestPalindromeRecord("cbbd", "bb"),
  new LongestPalindromeRecord("a", "a"),
  new LongestPalindromeRecord("ac", "c"),
  new LongestPalindromeRecord("forgeeksskeegfor", "geeksskeeg"),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
