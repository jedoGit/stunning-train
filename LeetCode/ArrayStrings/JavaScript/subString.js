// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

// Example 1:

// Input: haystack = "sadbutsad", needle = "sad"
// Output: 0
// Explanation: "sad" occurs at index 0 and 6.
// The first occurrence is at index 0, so we return 0.
// Example 2:

// Input: haystack = "leetcode", needle = "leeto"
// Output: -1
// Explanation: "leeto" did not occur in "leetcode", so we return -1.

// Constraints:

// 1 <= haystack.length, needle.length <= 104
// haystack and needle consist of only lowercase English characters.

// TC: O(n*m) looping through each chars of haystack and using string substring method.
// SC: O(1) In place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class StrStrRecord {
  constructor(haystack, needle, expected) {
    this.haystack = haystack;
    this.needle = needle;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} haystack
   * @param {string} needle
   * @return {number}
   */
  strStr(haystack, needle) {
    if (needle === "") return 0;

    for (let i = 0; i < haystack.length + 1 - needle.length; i++) {
      // We need to use substring... this is the string method for array.splice()
      if (haystack.substring(i, i + needle.length) === needle) {
        return i;
      }
    }

    return -1;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.strStr(record.haystack, record.needle);
  const pass = result === record.expected;

  console.log(
    `Input: haystack = ${JSON.stringify(
      record.haystack
    )}, needle = ${JSON.stringify(record.needle)}`
  );
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new StrStrRecord("sadbutsad", "sad", 0),
  new StrStrRecord("leetcode", "leeto", -1),
  new StrStrRecord("hello", "ll", 2),
  new StrStrRecord("abc", "c", 2),
  new StrStrRecord("a", "a", 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
