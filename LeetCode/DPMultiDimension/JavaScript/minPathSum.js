/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let ROWS = grid.length;
  let COLS = grid[0].length;

  //   let res = new Array(ROWS + 1).fill(null);
  //   for (let i = 0; i < ROWS + 1; i += 1) {
  //     res[i] = new Array(COLS + 1).fill(Number.MAX_SAFE_INTEGER);
  //   }

  let res = Array(ROWS + 1)
    .fill(null)
    .map(() => Array(COLS + 1).fill(Number.MAX_SAFE_INTEGER));

  res[ROWS][COLS - 1] = 0;

  //   console.log(res);

  for (let i = ROWS - 1; i > -1; i -= 1) {
    for (let j = COLS - 1; j > -1; j -= 1) {
      res[i][j] = grid[i][j] + Math.min(res[i + 1][j], res[i][j + 1]);
    }
  }

  return res[0][0];
};

let input1 = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
let expected1 = 7;
let result1 = minPathSum([...input1]);
console.log("Input: " + JSON.stringify([...input1]));
console.log("Result: " + result1);
console.log("Expected: " + expected1);
console.log("-".repeat(50));

let input2 = [
  [1, 2, 3],
  [4, 5, 6],
];
let expected2 = 12;
let result2 = minPathSum([...input2]);
console.log("Input: " + JSON.stringify([...input2]));
console.log("Result: " + result2);
console.log("Expected: " + expected2);
console.log("-".repeat(50));
