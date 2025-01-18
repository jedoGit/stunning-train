// Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

// Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

// Example 1:

// Input: s = "1 + 1"
// Output: 2
// Example 2:

// Input: s = " 2-1 + 2 "
// Output: 3
// Example 3:

// Input: s = "(1+(4+5+2)-3)+(6+8)"
// Output: 23

// Constraints:

// 1 <= s.length <= 3 * 105
// s consists of digits, '+', '-', '(', ')', and ' '.
// s represents a valid expression.
// '+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
// '-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
// There will be no two consecutive operators in the input.
// Every number and running calculation will fit in a signed 32-bit integer.

// TC: O(n) we're reading each chars in the input string s
// SC: O(n) the worst case is the stack in our algorithm will grow close to the size of the input string. We add the result and the sign to the stack every time we see a "(".

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let curr = (res = 0); // init these vars to zero
  let sign = 1; // 1 is addition, -1 is subtraction
  let stack = [];

  // Let's read each chars in the string s. Remember for digits, we need to convert to integer for example, 777
  // each char is 7 and there are 7 sevens... it should be read as integer(777) and save to the curr var
  for (const c of s) {
    // Check if c is a digit, if it is, we need to save to curr val.
    // Also, make sure to handle integers that are more than 1 digits.
    // console.log(c)
    if (c >= "0" && c <= "9") {
      curr = curr * 10 + Number.parseInt(c);
      // console.log(curr)
    } else if (c === "+" || c === "-") {
      // Once we see a +/- operator, we need to perform operation and update the result with the current val
      res += sign * curr;

      // Then we need to update the sign variable from what we just read
      sign = c === "+" ? 1 : -1;

      // And reset the current variable becuase we just used it to update the result variable
      curr = 0;
    } else if (c === "(") {
      // If this is an opening parenthesis, we need to push the sign and the current result variable to the stack
      // push the result first followed by the sign
      stack.push(res);
      stack.push(sign);

      // Reset the sign variable to an addition
      sign = 1;

      // Reset the results variable
      res = 0;
    } else if (c === ")") {
      // If this is a closing parenthesis, we need to update our results variable with the current value
      res += sign * curr;

      // Then pop the sign value we pushed to the stack (the last push is always the sign) and multiply it with the current results value
      res *= stack.pop();

      // Then pop the actual previous results value and add it to the current result value
      res += stack.pop();

      // What we're doing here is we had digits with operation inside a (..+..-..), the result of these operations inside the parenthesis need to be
      // added or subtracted to the resulting value to the left of the openning parenthesis (.

      // At this point, we need to make sure the curr is also reset to zero
      curr = 0;
    }
  }

  // This will take care of the remaining current value, we just need to make sure it's added to the result variable.
  return res + sign * curr;
};
