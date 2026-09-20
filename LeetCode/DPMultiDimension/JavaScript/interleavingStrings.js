// Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

// An interleaving of two strings s and t is a configuration where s and t are divided into n and m
// substrings respectively, such that:

// s = s1 + s2 + ... + sn
// t = t1 + t2 + ... + tm
// |n - m| <= 1
// The interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...
// Note: a + b is the concatenation of strings a and b.

// Example 1:

// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
// Output: true
// Example 2:

// Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
// Output: false
// Example 3:

// Input: s1 = "", s2 = "", s3 = ""
// Output: true

// Constraints:

// 0 <= s1.length, s2.length <= 100
// 0 <= s3.length <= 200
// s1, s2, and s3 consist of lowercase English letters.

// TC: O(n*m) because we'll have to visit each cell of the n by m grid
// SC: O(n*m) because we'll have to create an n by m grid

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class InterleavingStringsRecord {
  constructor(s1, s2, s3, expected) {
    this.s1 = s1;
    this.s2 = s2;
    this.s3 = s3;
    this.expected = expected;
  }
}

class Solution {
  /**
   * Bottoms up 2D DP.
   * @param {string} s1
   * @param {string} s2
   * @param {string} s3
   * @return {boolean}
   */
  isInterleave(s1, s2, s3) {
    let s1_len = s1.length;
    let s2_len = s2.length;
    let s3_len = s3.length;

    if (s1_len + s2_len !== s3_len) return false;

    let dp = new Array(s1_len + 1)
      .fill()
      .map(() => new Array(s2_len + 1).fill(false));

    dp[s1_len][s2_len] = true;

    for (let i of Array.from({ length: s1_len + 1 }, (_, i) => s1_len - i)) {
      for (let j of Array.from({ length: s2_len + 1 }, (_, j) => s2_len - j)) {
        if (i < s1_len && s1[i] === s3[i + j] && dp[i + 1][j]) {
          dp[i][j] = true;
        }
        if (j < s2_len && s2[j] === s3[i + j] && dp[i][j + 1]) {
          dp[i][j] = true;
        }
      }
    }

    return dp[0][0];
  }

  /**
   * Top down DFS with memoization.
   * @param {string} s1
   * @param {string} s2
   * @param {string} s3
   * @return {boolean}
   */
  isInterleaveMemoize(s1, s2, s3) {
    let s1_len = s1.length;
    let s2_len = s2.length;
    let s3_len = s3.length;

    if (s1_len + s2_len !== s3_len) return false;

    let dp = {};

    let dfs = (i, j) => {
      if (i === s1_len && j === s2_len) {
        return true;
      }

      if (`${i},${j}` in dp) {
        return dp[`${i},${j}`];
      }

      if (i < s1_len && s1[i] === s3[i + j] && dfs(i + 1, j)) {
        return true;
      }

      if (j < s2_len && s2[j] === s3[i + j] && dfs(i, j + 1)) {
        return true;
      }

      dp[`${i},${j}`] = false;

      return false;
    };

    return dfs(0, 0);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.isInterleaveMemoize(record.s1, record.s2, record.s3);
  const resultTabulation = solution.isInterleave(
    record.s1,
    record.s2,
    record.s3
  );
  const pass =
    result === record.expected && resultTabulation === record.expected;

  console.log(
    `Input: s1 = ${JSON.stringify(record.s1)}, s2 = ${JSON.stringify(
      record.s2
    )}, s3 = ${JSON.stringify(record.s3)}`
  );
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result} (memoize), ${resultTabulation} (tabulation)`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new InterleavingStringsRecord("aabcc", "dbbca", "aadbbcbcac", true),
  new InterleavingStringsRecord("aabcc", "dbbca", "aadbbbaccc", false),
  new InterleavingStringsRecord("", "", "", true),
  new InterleavingStringsRecord(
    "bbbbbabbbbabaababaaaabbababbaaabbabbaaabaaaaababbbababbbbbabbbbababbabaabababbbaabababababbbaaababaa",
    "babaaaabbababbbabbbbaabaabbaabbbbaabaaabaababaaaabaaabbaaabaaaabaabaabbbbbbbbbbbabaaabbababbabbabaab",
    "babbbabbbaaabbababbbbababaabbabaabaaabbbbabbbaaabbbaaaaabbbbaabbaaabababbaaaaaabababbababaababbababbbababbbbaaaabaabbabbaaaaabbabbaaaabbbaabaaabaababaababbaaabbbbbabbbbaabbabaabbbbabaaabbababbabbabbab",
    false
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
