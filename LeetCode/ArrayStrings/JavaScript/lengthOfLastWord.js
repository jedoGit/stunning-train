// Given a string s consisting of words and spaces, return the length of the last word in the string.

// A word is a maximal
// substring
//  consisting of non-space characters only.

// Example 1:

// Input: s = "Hello World"
// Output: 5
// Explanation: The last word is "World" with length 5.
// Example 2:

// Input: s = "   fly me   to   the moon  "
// Output: 4
// Explanation: The last word is "moon" with length 4.
// Example 3:

// Input: s = "luffy is still joyboy"
// Output: 6
// Explanation: The last word is "joyboy" with length 6.

// Constraints:

// 1 <= s.length <= 104
// s consists of only English letters and spaces ' '.
// There will be at least one word in s.

// TC: O(n) worst case is it's full of spaces in the right side then starting at index 0, a word
// SC: O(1) in place processing

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  const n = s.length;
  let r = n - 1;

  // Need to make sure that r is not out of bounds
  // Check the value at index r if it's a space... if so,
  // keep decrementing r until it's not then exit
  while (r > -1 && s.at(r) === " ") {
    r--;
  }

  let count = 0;

  // Need to make sure that r is not out of bounds
  // Check the value at index r if it's NOT a space... if so,
  // keep decrementing r and increment count until it's not then exit
  while (r > -1 && s.at(r) !== " ") {
    r--;
    count++;
  }

  return count;
};
