// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: strs = ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.

// Constraints:

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters.

// TC: O(nlogn) worst case due to sorting, if sorting is not counted, it's O(m) which is the lenght of the string at index 0
// SC: O(n) worst case due to sorting, if sorting is not counted, it's O(1)

const Result = {
  PASS: "\x1b[92mPASS\x1b[0m",
  FAIL: "\x1b[91mFAIL\x1b[0m",
};

class LongestCommonPrefixRecord {
  constructor(strs, expected) {
    this.strs = strs;
    this.expected = expected;
  }
}

/**
 * TC: O(nlogn) worst case due to sorting, if sorting is not counted, it's O(m)
 * SC: O(n) worst case due to sorting, if sorting is not counted, it's O(1)
 */
class Solution {
  /**
   * @param {string[]} strs
   * @return {string}
   */
  longestCommonPrefix(strs) {
    // We need to sort the words in the strings
    // After it's sorted, we compare the words at index 0 and the last index chars by chars
    // Exit if we see that there's no common chars

    strs.sort();
    const n = strs.length;
    let s1 = strs[0];
    let s2 = strs[n - 1];
    let res = "";

    let i = 0;

    // We use s1's length. We could use s2 if you want...
    while (i < s1.length && s1[i] === s2[i]) {
      res += s1[i];
      i++;
    }

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const strs = [...record.strs];
  const result = solution.longestCommonPrefix(strs);
  const pass = result === record.expected;

  console.log(`Input: strs = ${JSON.stringify(record.strs)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LongestCommonPrefixRecord(["flower", "flow", "flight"], "fl"),
  new LongestCommonPrefixRecord(["dog", "racecar", "car"], ""),
  new LongestCommonPrefixRecord(["interspecies", "interstellar", "interstate"], "inters"),
  new LongestCommonPrefixRecord(["throne", "throne"], "throne"),
  new LongestCommonPrefixRecord([""], ""),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(30));
});
