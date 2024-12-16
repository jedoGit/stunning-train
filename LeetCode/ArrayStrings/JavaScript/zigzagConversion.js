// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);

// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"
// Example 2:

// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I
// Example 3:

// Input: s = "A", numRows = 1
// Output: "A"

// Constraints:

// 1 <= s.length <= 1000
// s consists of English letters (lower-case and upper-case), ',' and '.'.
// 1 <= numRows <= 1000

// TC: O(n) looping through the array only once
// SC: O(1) in place processing

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  // Base case: If numRows is 1, we return s immediately
  if (numRows === 1) return s;

  let res = "";

  // Setup the rows. We need it for calculation on the jump we need to
  // do in the to assemble the result.
  // The main calculation is increment = 2 * (numRows - 1) for the exterior elements of numRows[0] and numRows[end]
  // For the middle elements of numRows, increment = increment - 2 * r
  for (let r = 0; r < numRows; r++) {
    let increment = 2 * (numRows - 1);

    for (let i = r; i < s.length; i += increment) {
      res += s.at(i);
      if (r > 0 && r < numRows - 1 && i + increment - 2 * r < s.length) {
        res += s.at(i + increment - 2 * r);
      }
    }
  }

  return res;
};
