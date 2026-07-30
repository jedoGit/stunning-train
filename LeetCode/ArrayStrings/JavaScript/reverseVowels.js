// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

// Example 1:

// Input: s = "IceCreAm"

// Output: "AceCreIm"

// Explanation:

// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

// Example 2:

// Input: s = "leetcode"

// Output: "leotcede"

// Constraints:

// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

// TC: O(n) we did 2 loops to find the vowels then to reverse the vowels
// SC: O(1) we created a LUT of vowels

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ReverseVowelsRecord {
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
  reverseVowels(s) {
    // This is our LUT of the vowels
    const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
    const sArray = s.split("");
    let revVowels = [];

    // Loop through the string array and find the vowels, we add that element to the array
    for (let i = 0; i < s.length; i++) {
      if (vowels.has(sArray[i])) {
        revVowels.push(sArray[i]);
      }
    }

    // Then we loop through the array again and replace the vowels
    for (let j = 0; j < s.length; j++) {
      if (vowels.has(sArray[j])) {
        sArray[j] = revVowels.pop();
      }
    }

    // we have to call the join method to convert the string array to an string
    return sArray.join("");
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.reverseVowels(record.s);
  const pass = result === record.expected;

  console.log(`Input: s = ${JSON.stringify(record.s)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ReverseVowelsRecord("IceCreAm", "AceCreIm"),
  new ReverseVowelsRecord("leetcode", "leotcede"),
  new ReverseVowelsRecord("aA", "Aa"),
  new ReverseVowelsRecord("bcdfg", "bcdfg"),
  new ReverseVowelsRecord("hello", "holle"),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
