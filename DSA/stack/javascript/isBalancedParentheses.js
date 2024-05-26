// Implement a function called isBalancedParentheses() that checks if a given string containing parentheses is balanced or not.

// Input:
// A string parentheses.

// Output:
// The function should return a boolean value, true if the input string contains balanced parentheses, and false if not.

// Constraints:
// You must use the provided Stack class to check if the parentheses are balanced.
// You cannot use built-in string manipulation methods for this task.

// Function Signature:
// function isBalancedParentheses(parentheses) {
//     // Your implementation goes here
// }

// Example 1:

// const input = "(()())";
// const output = isBalancedParentheses(input);

// The output should be true, as the input string contains balanced parentheses.

// Example 2:

// const input = "(()";
// const output = isBalancedParentheses(input);

// The output should be false, as the input string contains unbalanced parentheses.

// Example 3:

// const input = ")(";
// const output = isBalancedParentheses(input);

// The output should be false, as the input string contains unbalanced parentheses.

function isBalancedParentheses(parentheses) {
  // create a stack
  const stack = new Stack();

  // loop through the input
  // if the input is "(", put it in the Stack
  // if the input is ")", check the stack if the top is a "("

  for (const p of parentheses) {
    if (p === "(") {
      stack.push(p);
    } else if (p === ")") {
      if (stack.isEmpty() || stack.pop() !== "(") {
        return false;
      }
    }
  }

  return stack.isEmpty();
}
