// Given an input string s, reverse the order of the words.

// A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

// Return a string of the words in reverse order concatenated by a single space.

// Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

// Example 1:

// Input: s = "the sky is blue"
// Output: "blue is sky the"
// Example 2:

// Input: s = "  hello world  "
// Output: "world hello"
// Explanation: Your reversed string should not contain leading or trailing spaces.
// Example 3:

// Input: s = "a good   example"
// Output: "example good a"
// Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

// Constraints:

// 1 <= s.length <= 104
// s contains English letters (upper-case and lower-case), digits, and spaces ' '.
// There is at least one word in s.

// Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?

// TC: O(n), we're doing in place swap
// SC: O(1), we're doing in place swap

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  // Take in the input string and split it with space as delimeter
  let sArray = s.split(/\s+/);

  // Now we do some swapping by using two pointers to start at both ends and moving them to the middle
  for (let i = 0; i < Math.floor(sArray.length / 2); i++) {
    let temp = sArray[i];
    sArray[i] = sArray[sArray.length - 1 - i];
    sArray[sArray.length - 1 - i] = temp;
  }

  // we want to join all the elements with space in between.
  // make sure we trim the string
  return sArray.join(" ").trim();
};

// TC: O(n), loop through twice
// SC: O(n), save words to stack

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  // Take in the input string and split it with space as delimeter
  let sArray = s.trim().split(/\s+/);

  // we'll use a stack to save the words in the string
  let stack = [];
  let revWord = "";

  // Add the words to the stack
  for (let word of sArray) {
    stack.push(word);
  }

  // Now let's construct the reverse word
  for (let i = 0; i < sArray.length; i++) {
    revWord = revWord + stack.pop() + " ";
  }

  // we want to make sure we trim the end of the string
  return revWord.trimEnd();
};
