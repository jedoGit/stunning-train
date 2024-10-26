// Given an encoded string, return its decoded string.

// The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

// You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there will not be input like 3a or 2[4].

// The test cases are generated so that the length of the output will never exceed 105.

// Example 1:

// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"
// Example 2:

// Input: s = "3[a2[c]]"
// Output: "accaccacc"
// Example 3:

// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

// Constraints:

// 1 <= s.length <= 30
// s consists of lowercase English letters, digits, and square brackets '[]'.
// s is guaranteed to be a valid input.
// All the integers in s are in the range [1, 300].

// TC: O(n) We're looping through the input string
// SC: O(n) We're creating a stack

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let myStack = [];

  // we want to loop through the chars in the string array
  for (let i = 0; i < s.length; i++) {
    // Push everything in to the stack until we see "]"
    // Then, we decode the string
    if (s.at(i) !== "]") {
      myStack.push(s.at(i));
      continue;
    }

    // We saw "]", we now decode the string
    // We now start popping the stack and assemble the string
    let curChar = myStack.pop();
    let tempStr = "";

    while (curChar !== "[") {
      tempStr = curChar + tempStr; // we want to put the current in the front just like unshift()
      curChar = myStack.pop();
    }

    // Since we exited the while loop, we found the "[" so we'll check the multiplier
    let k = "";
    curChar = myStack.pop();

    // The multiplier might by multiple digits
    while (!isNaN(curChar)) {
      k = curChar + k; // we want to put the current in the front just like unshift()
      curChar = myStack.pop();
    }

    // At this point, we exited the while loop, and also we popped the last char in the stack.
    // We need to push it back.
    myStack.push(curChar);

    // Then we need to push the decoded string back to the stack
    myStack.push(tempStr.repeat(k));
  }

  return myStack.join("");
};
