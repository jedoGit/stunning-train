// Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

// Example 1:

// Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// Output: 4
// Example 2:

// Input: matrix = [["0","1"],["1","0"]]
// Output: 1
// Example 3:

// Input: matrix = [["0"]]
// Output: 0

/**
 * @param {character[][]} matrix
 * @return {number}
 */

var maximalSquare = function (matrix) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let cache = {}; // map each(r,c) -> maxLength of square

  let helper = (r, c) => {
    if (r >= rows || c >= cols) {
      return 0;
    }

    if (!(`${r},${c}` in cache)) {
      let down = helper(r + 1, c);
      let right = helper(r, c + 1);
      let diag = helper(r + 1, c + 1);

      cache[`${r},${c}`] = 0;
      if (matrix[r][c] == "1") {
        cache[`${r},${c}`] = 1 + Math.min(down, right, diag);
      }
    }
    return cache[`${r},${c}`];
  };

  helper(0, 0);

  // Find the maxvalue from the array of values
  let res = [...Object.values(cache)].reduce((a, b) => (a > b ? a : b));

  return Math.pow(res, 2);
};

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquareDP = function (matrix) {
  if (!matrix) {
    return 0;
  }

  let rows = matrix.length;
  let cols = matrix[0].length;

  let dp = Array(rows + 1)
    .fill()
    .map(() => Array(cols + 1).fill(0));

  let max_side = 0;

  //   console.log(JSON.stringify(dp));

  //   for (let i of Array.from({ length: rows + 1 }, (_, ii) => ii + 1)) {
  //     for (let j of Array.from({ length: cols + 1 }, (_, jj) => jj + 1)) {
  for (let i = 1; i < rows + 1; i += 1) {
    for (let j = 1; j < cols + 1; j += 1) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        max_side = Math.max(max_side, dp[i][j]);
      }
    }
  }

  return Math.pow(max_side, 2);
};

let input1 = {
  matrix: [
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ],
  expected: 4,
};
console.log("Input: " + JSON.stringify(input1.matrix));
console.log("Expected: " + input1.expected);
console.log("Result: " + maximalSquareDP(input1.matrix));
console.log("-".repeat(50));

let input2 = {
  matrix: [
    ["0", "1"],
    ["1", "0"],
  ],
  expected: 1,
};
console.log("Input: " + JSON.stringify(input2.matrix));
console.log("Expected: " + input2.expected);
console.log("Result: " + maximalSquareDP(input2.matrix));
console.log("-".repeat(50));

let input3 = {
  matrix: [["0"]],
  expected: 0,
};
console.log("Input: " + JSON.stringify(input3.matrix));
console.log("Expected: " + input3.expected);
console.log("Result: " + maximalSquareDP(input3.matrix));
console.log("-".repeat(50));
