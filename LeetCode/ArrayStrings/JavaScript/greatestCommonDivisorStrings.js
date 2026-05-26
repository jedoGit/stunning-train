// For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).
// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

// Example 1:

// Input: str1 = "ABCABC", str2 = "ABC"
// Output: "ABC"
// Example 2:

// Input: str1 = "ABABAB", str2 = "ABAB"
// Output: "AB"
// Example 3:

// Input: str1 = "LEET", str2 = "CODE"
// Output: ""

// Constraints:

// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of English uppercase letters.

// TC: O(n+m), we are comparing two concatenated strings
// SC: O(n+m), we are comparing two concatenated strings

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class GcdOfStringsRecord {
  constructor(str1, str2, expected) {
    this.str1 = str1;
    this.str2 = str2;
    this.expected = expected;
  }
}

class Solution {
  gcd(a, b) {
    if (b === 0) {
      return a;
    }

    return this.gcd(b, a % b);
  }

  /**
   * @param {string} str1
   * @param {string} str2
   * @return {string}
   */
  gcdOfStrings(str1, str2) {
    // Compare the concatenation of the two strings
    if (str1 + str2 !== str2 + str1) {
      return "";
    }

    // We need to compute the GCD of two lengths
    const gcdLength = this.gcd(str1.length, str2.length);

    // The GCD of Strings can be computed as
    return str1.slice(0, gcdLength);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.gcdOfStrings(record.str1, record.str2);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: str1 = ${record.str1}, str2 = ${record.str2}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new GcdOfStringsRecord("ABCABC", "ABC", "ABC"),
  new GcdOfStringsRecord("ABABAB", "ABAB", "AB"),
  new GcdOfStringsRecord("LEET", "CODE", ""),
  new GcdOfStringsRecord("AAAAAA", "AAA", "AAA"),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
