// Given a string s, find the length of the longest
// substring
//  without repeating characters.

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Constraints:

// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

// TC: O(n) we're using the sliding window technique and we're only moving our window from left to right
// SC: O(n) worst case scenario is we add all the chars to our set because they're all unique

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class LongestSubstringNoRepsRecord {
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
  lengthOfLongestSubstring(s) {
    let set = new Set();
    let maxLen = 0;
    let n = s.length;
    let l = 0;

    for (let r = 0; r < n; r++) {
      // Check if there are duplicates in our set and update our set
      // Here we're shrinking our window by moving the left pointer
      // and removing the duplicate from our set
      while (set.has(s.at(r))) {
        set.delete(s.at(l));
        l++;
      }

      // Add the char to our set
      set.add(s.at(r));

      // Every iteration, we update our maxLen
      maxLen = Math.max(r - l + 1, maxLen);
    }

    return maxLen;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.lengthOfLongestSubstring(record.s);
  const pass = result === record.expected;

  console.log(`Input: s = ${JSON.stringify(record.s)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LongestSubstringNoRepsRecord("abcabcbb", 3),
  new LongestSubstringNoRepsRecord("bbbbb", 1),
  new LongestSubstringNoRepsRecord("pwwkew", 3),
  new LongestSubstringNoRepsRecord("", 0),
  new LongestSubstringNoRepsRecord("dvdf", 3),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
