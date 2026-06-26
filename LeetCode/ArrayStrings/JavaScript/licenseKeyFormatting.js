// You are given a license key represented as a string s that consists of only alphanumeric characters and dashes. The string is separated into n + 1 groups by n dashes. You are also given an integer k.

// We want to reformat the string s such that each group contains exactly k characters, except for the first group, which could be shorter than k but still must contain at least one character. Furthermore, there must be a dash inserted between two groups, and you should convert all lowercase letters to uppercase.

// Return the reformatted license key.

// Example 1:

// Input: s = "5F3Z-2e-9-w", k = 4
// Output: "5F3Z-2E9W"
// Explanation: The string s has been split into two parts, each part has 4 characters.
// Note that the two extra dashes are not needed and can be removed.
// Example 2:

// Input: s = "2-5g-3-J", k = 2
// Output: "2-5G-3J"
// Explanation: The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.

// Constraints:

// 1 <= s.length <= 105
// s consists of English letters, digits, and dashes '-'.
// 1 <= k <= 104

// TC: O(n), all the string methods used will result in O(n)
// SC: O(1)

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class LicenseKeyFormattingRecord {
  constructor(s, k, expected) {
    this.s = s;
    this.k = k;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} s
   * @param {number} k
   * @return {string}
   */
  licenseKeyFormatting(s, k) {
    let res = "";

    s = s.replaceAll("-", "").toUpperCase();

    let count = 1;
    for (let i = s.length - 1; i > -1; i -= 1) {
      res += s[i];
      if (i !== 0 && count % k === 0) res += "-";
      count += 1;
    }

    return res.split("").reverse().join("");
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.licenseKeyFormatting(record.s, record.k);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: s = ${record.s}, k = ${record.k}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new LicenseKeyFormattingRecord("5F3Z-2e-9-w", 4, "5F3Z-2E9W"),
  new LicenseKeyFormattingRecord("2-5g-3-J", 2, "2-5G-3J"),
  new LicenseKeyFormattingRecord("---", 3, ""),
  new LicenseKeyFormattingRecord("a-a-a-a-", 1, "A-A-A-A"),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
