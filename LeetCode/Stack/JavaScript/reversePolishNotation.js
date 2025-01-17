// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

// Evaluate the expression. Return an integer that represents the value of the expression.

// Note that:

// The valid operators are '+', '-', '*', and '/'.
// Each operand may be an integer or another expression.
// The division between two integers always truncates toward zero.
// There will not be any division by zero.
// The input represents a valid arithmetic expression in a reverse polish notation.
// The answer and all the intermediate calculations can be represented in a 32-bit integer.

// Example 1:

// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9
// Example 2:

// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6
// Example 3:

// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22

// Constraints:

// 1 <= tokens.length <= 104
// tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

// TC: O(n), we're reading and processing each elements in the token
// SC: O(n), we're building a stack which could grow to the size of the token.

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  // Using a stack, push each number tokens to the stack until you see an operator (+-*/).
  // If you see an operator, pop the last to elements in the stack and perforn the operation on the two values
  // and push it back to the stack.
  // After reading all the tokens and processing them, the stack should only have 1 value left and return that value
  let stack = [];
  for (let c of tokens) {
    if (c === "+") {
      stack.push(stack.pop() + stack.pop());
    } else if (c === "-") {
      // Careful with the operation here and make sure your subtracting the correct order of value
      const [a, b] = [stack.pop(), stack.pop()];
      stack.push(b - a);
    } else if (c === "*") {
      stack.push(stack.pop() * stack.pop());
    } else if (c === "/") {
      // Careful with the operation here and make sure your subtracting the correct order of value
      // Also, truncate to zero, parseInt() will help!
      const [a, b] = [stack.pop(), stack.pop()];
      stack.push(parseInt(b / a));
    } else {
      // Push every values as Int... parseInt() will help!
      stack.push(parseInt(c));
    }
  }
  // stack should only have 1 value left, return that!
  // Here, I'm just returning the top of the stack which should
  // be the same as stack.at(0)
  return stack.at(-1);
};
