// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:

// Input: s = "()"

// Output: true

// Example 2:

// Input: s = "()[]{}"

// Output: true

// Example 3:

// Input: s = "(]"

// Output: false

// Example 4:

// Input: s = "([])"

// Output: true

// Constraints:

// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.

// TC: O(n), loopping through array once
// SC: O(n), we're maintaining a stack at worst could be size n.

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class ValidParenthesesRecord {
  constructor(s, expected) {
    this.s = s;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  isValid(s) {
    let stack = [];
    const closeToOpen = { ")": "(", "]": "[", "}": "{" };
    // console.log(closeToOpen)

    for (let c of s) {
      // console.log(c)
      // First check if this is a closing bracket or parenthesis: ),},]
      if (c in closeToOpen) {
        // Since this is a closing bracket or parenthesis, we need to check the top or
        // our stack if it's an open bracket or parenthesis
        // If so, we pop our stack and move on. If not, then we don't have a valid parentheses
        if (stack.length !== 0 && stack.at(-1) === closeToOpen[c]) {
          stack.pop();
        } else {
          return false;
        }
      } else {
        // This is not a closing bracket of parenthesis, so we push it to our stack
        stack.push(c);
      }
    }
    // console.log(stack)
    // After we exit the for loop, we should have an empty stack. If not, then we did not have a valid parentheses
    return stack.length === 0 ? true : false;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.isValid(record.s);
  const pass = result === record.expected;

  console.log(`Input: s = ${JSON.stringify(record.s)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ValidParenthesesRecord("()", true),
  new ValidParenthesesRecord("()[]{}", true),
  new ValidParenthesesRecord("(]", false),
  new ValidParenthesesRecord("([])", true),
  new ValidParenthesesRecord("(", false),
  new ValidParenthesesRecord(")", false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
