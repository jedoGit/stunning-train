// A string S consisting of N characters is considered to be properly nested if any of the following conditions is true:

// S is empty;
// S has the form "(U)" or "[U]" or "{U}" where U is a properly nested string;
// S has the form "VW" where V and W are properly nested strings.
// For example, the string "{[()()]}" is properly nested but "([)()]" is not.

// Write a function:

// function solution(S);

// that, given a string S consisting of N characters, returns 1 if S is properly nested and 0 otherwise.

// For example, given S = "{[()()]}", the function should return 1 and given S = "([)()]", the function should return 0, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..200,000];
// string S is made only of the following characters: '(', '{', '[', ']', '}' and/or ')'.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(n) we're checking all char of the input string
// SC: O(1), in place processing.. not considering the constants we created.

function solution(S) {
  // Implement your solution here

  // Use a map to store the brackets
  const closingBrackets = { "}": "{", "]": "[", ")": "(" };
  const openingBrackets = { "{": "{", "[": "[", "(": "(" };
  let stack = [];

  // {[()()]}
  // ([)()]
  // [w]v

  // Loop through the chars of S
  for (let c of S) {
    // console.log(c)
    // check if we have a closing bracket
    if (c in closingBrackets) {
      // console.log(closingBrackets[c])
      // Pop the stack and check if it matches the closing bracket
      if (stack.pop() !== closingBrackets[c]) {
        return 0;
      }
    } else if (c in openingBrackets) {
      // Since we're expected to have letters, we only want to add the brackets to our stack.
      stack.push(c);
    }
  }

  // Check if the length of the stack is greater than 0. If so, return 0
  // If it's zero, return 1
  return stack.length !== 0 ? 0 : 1;
}
