// Given an array of characters chars, compress it using the following algorithm:

// Begin with an empty string s. For each group of consecutive repeating characters in chars:

// If the group's length is 1, append the character to s.
// Otherwise, append the character followed by the group's length.
// The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

// After you are done modifying the input array, return the new length of the array.

// You must write an algorithm that uses only constant extra space.

// Example 1:

// Input: chars = ["a","a","b","b","c","c","c"]
// Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
// Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
// Example 2:

// Input: chars = ["a"]
// Output: Return 1, and the first character of the input array should be: ["a"]
// Explanation: The only group is "a", which remains uncompressed since it's a single character.
// Example 3:

// Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
// Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
// Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".

// Constraints:

// 1 <= chars.length <= 2000
// chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.

// TC: O(n), we're looping through the array once
// SC: O(1), updating in-place

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class CompressRecord {
  constructor(chars, expectedLength, expectedChars) {
    this.chars = chars;
    this.expectedLength = expectedLength;
    this.expectedChars = expectedChars;
  }
}

class Solution {
  /**
   * @param {character[]} chars
   * @return {number}
   */
  compress(chars) {
    // we loop and count each occurence of the chars
    let j = 0; // We'll use for the current pointer
    let i = 0; // We'll use to track the new length of the chars array

    while (j < chars.length) {
      // Initially, we set our current pointer to the first element
      // and loop through the elements until the value changes
      // Also, keep track of the count
      let count = 0;
      let currentPointer = chars[j];

      while (j < chars.length && chars[j] === currentPointer) {
        j++;
        count++;
      }

      // At this point, we saw that there's a change in the element
      // so we update the chars input array and write the char and the count
      chars[i] = currentPointer;
      i++;

      // If the count is only 1, we don't need to append the count
      // If the count is greater than 1, we need to append the count
      // If the count is greater than 1 digit, we need to append each digit separately
      if (count > 1) {
        for (let digit of count.toString()) {
          chars[i] = digit;
          i++;
        }
      }
    }

    // We need to return the new length of the chars array
    return i;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const chars = [...record.chars];
  const result = solution.compress(chars);
  const compressedChars = chars.slice(0, result);
  const status =
    result === record.expectedLength &&
    JSON.stringify(compressedChars) === JSON.stringify(record.expectedChars)
      ? Result.PASS
      : Result.FAIL;

  console.log(`Input: chars = ${JSON.stringify(record.chars)}`);
  console.log(
    `Expected: length = ${record.expectedLength}, chars = ${JSON.stringify(record.expectedChars)}`,
  );
  console.log(`Result: length = ${result}, chars = ${JSON.stringify(compressedChars)}`);
  console.log(status);
}

const records = [
  new CompressRecord(["a", "a", "b", "b", "c", "c", "c"], 6, ["a", "2", "b", "2", "c", "3"]),
  new CompressRecord(["a"], 1, ["a"]),
  new CompressRecord(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"], 4, [
    "a",
    "b",
    "1",
    "2",
  ]),
  new CompressRecord(["a", "a", "a", "b", "b", "a", "a"], 6, ["a", "3", "b", "2", "a", "2"]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
