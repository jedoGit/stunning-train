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

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
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
};
