// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// Example 1:

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// Example 2:

// Input: digits = ""
// Output: []
// Example 3:

// Input: digits = "2"
// Output: ["a","b","c"]

// Constraints:

// 0 <= digits.length <= 4
// digits[i] is a digit in the range ['2', '9'].

// TC: O(n*4^n) because at each level of the backtracking tree, you'll have a worst case 4^n leaf nodes the you'll do that for every digits, n is the length of digits
// SC: O(n) you'll do recursion of n levels

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  let res = [];
  // This is a JS object to hold the mapping of digits to chars
  const digitToChar = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  if (!digits) return res;

  // We'll do a DFS on the backtracking tree and at each recursion, we'll pass a snapshot of the index i and the current string
  function backtrack(i, curStr) {
    // Base case: If you draw the backtracking tree, you'll see that the leaf node, you'll have digits.length number of
    // chars in your curStr. I think i === digit.length will also work.
    if (i === digits.length) {
      res.push(curStr);
      return;
    }

    // Access the char mapping of the current digit we're pointing to
    const digitChar = digitToChar[digits[i]];

    // We need to loop through all the chars mapped to this digit and backtrack (dfs) to the next level (i)
    // Each time we recursively call backtrack, we append c
    for (const c of digitChar) {
      backtrack(i + 1, curStr + c);
    }
  }

  // Call backtrack with initally empty curStr
  backtrack(0, "");

  return res;
};
