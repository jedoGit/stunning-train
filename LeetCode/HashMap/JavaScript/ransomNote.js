// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

// Example 1:

// Input: ransomNote = "a", magazine = "b"
// Output: false
// Example 2:

// Input: ransomNote = "aa", magazine = "ab"
// Output: false
// Example 3:

// Input: ransomNote = "aa", magazine = "aab"
// Output: true

// Constraints:

// 1 <= ransomNote.length, magazine.length <= 105
// ransomNote and magazine consist of lowercase English letters.

// TC: O(m+n), where n is the length of ransomeNote and m is the length of magazine
// SC: O(1)

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class RansomNoteRecord {
  constructor(ransomNote, magazine, expected) {
    this.ransomNote = ransomNote;
    this.magazine = magazine;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} ransomNote
   * @param {string} magazine
   * @return {boolean}
   */
  canConstruct(ransomNote, magazine) {
    let count = {};

    // Let's build a count of each chars in the magazine
    for (const c of magazine) {
      if (count[c]) {
        count[c] += 1;
      } else {
        count[c] = 1;
      }
    }

    // Here, we check each chars in ransomNote if it exists in our count dictionary
    // If it exist, we decrement the count in the count dictionary... if it it's the
    // last one, we'll remove the entry from out count dictionary

    for (const c of ransomNote) {
      if (!count[c]) {
        return false;
      } else {
        count[c] -= 1;
        if (!count[c]) {
          delete count[c];
        }
      }
    }

    return true;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.canConstruct(record.ransomNote, record.magazine);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: ransomNote = ${record.ransomNote}, magazine = ${record.magazine}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new RansomNoteRecord("a", "b", false),
  new RansomNoteRecord("aa", "ab", false),
  new RansomNoteRecord("aa", "aab", true),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
