// A string S consisting of N characters is called properly nested if:

// S is empty;
// S has the form "(U)" where U is a properly nested string;
// S has the form "VW" where V and W are properly nested strings.
// For example, string "(()(())())" is properly nested but string "())" isn't.

// Write a function:

// function solution(S);

// that, given a string S consisting of N characters, returns 1 if string S is properly nested and 0 otherwise.

// For example, given S = "(()(())())", the function should return 1 and given S = "())", the function should return 0, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..1,000,000];
// string S is made only of the characters '(' and/or ')'.

// TC: O(n) loop through all chars of S
// SC: O(1) in place processing

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
  // Implement your solution here

  // Using stack to keep track of the close and open parenthesis
  const N = S.length;
  let stack = [];

  const openParen = { "(": "(" };
  const closed2OpenParenMap = { ")": "(" };

  // Loop through the input S and check if it's a closed paren.
  // If not closed parent, check if it's open paren. Only add to the stack if it's open paren.

  for (let c of S) {
    if (c in closed2OpenParenMap) {
      // Here, we saw a closed paren, we need to check the top of our stack if it's an open paren, we pop the stack
      if (stack[stack.length - 1] === closed2OpenParenMap[c]) {
        stack.pop();
      } else {
        return 0;
      }
    } else {
      // it's not a closed paren, let's check if it's an open paren
      if (c in openParen) {
        stack.push(c);
      }
    }
  }

  // Check the length of the stack.. if it's empty, return 1 else 0
  return stack.length === 0 ? 1 : 0;
}
