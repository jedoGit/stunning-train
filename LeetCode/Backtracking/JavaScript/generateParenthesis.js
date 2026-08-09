// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:

// Input: n = 1
// Output: ["()"]

// Constraints:

// 1 <= n <= 8

//
//                                                                                 []
//                                                                                 [(]
//                                                    [()]                                                  [((]
//                                           [()(]                                        [(()]                              [(((]
//                                   [()()]        [()((]                       [(())]            [(()(]                     [((()]
//                                   [()()(]       [()(()]                      [(())(]           [(()()]                    [((())]
//                                   [()()()]      [()(())]                     [(())()]          [(()())]                   [((()))]
//
//

// TC:
// SC:

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class GenerateParenthesisRecord {
  constructor(n, expected) {
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number} n
   * @return {string[]}
   */
  generateParenthesis(n) {
    // Add open paren if open < n
    // add closing paren if closed < open
    // valid IIF open === closed === n

    let stack = [];
    let res = [];

    const backtrack = (openN, closedN) => {
      if (openN === n && closedN === n) {
        // console.log(stack)
        res.push(stack.join(""));
        return;
      }

      // If our open paren < n, let's add another open paren the backtrack.
      // Remove the open paren we added after we exit the backtrack function
      if (openN < n) {
        stack.push("(");
        backtrack(openN + 1, closedN);
        stack.pop();
      }

      // Let's add a close paren if our number of open paren > the close paren
      // Remove the close paren we added after we exit the backtrack function
      if (closedN < openN) {
        stack.push(")");
        backtrack(openN, closedN + 1);
        stack.pop();
      }

      return;
    };

    backtrack(0, 0);

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.generateParenthesis(record.n);
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: n = ${record.n}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new GenerateParenthesisRecord(3, [
    "((()))",
    "(()())",
    "(())()",
    "()(())",
    "()()()",
  ]),
  new GenerateParenthesisRecord(1, ["()"]),
  new GenerateParenthesisRecord(2, ["(())", "()()"]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
