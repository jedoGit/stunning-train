// You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

// Connect: A cell is connected to adjacent cells horizontally or vertically.
// Region: To form a region connect every 'O' cell.
// Surround: The region is surrounded with 'X' cells if you can connect the region with 'X' cells and none of the region cells are on the edge of the board.
// To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.

// Example 1:

// Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

// Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

// Explanation:

// In the above diagram, the bottom region is not captured because it is on the edge of the board and cannot be surrounded.

// Example 2:

// Input: board = [["X"]]

// Output: [["X"]]

// Constraints:

// m == board.length
// n == board[i].length
// 1 <= m, n <= 200
// board[i][j] is 'X' or 'O'.

// TC: O(m*n)
// SC: O(2(m+n)), which is the number of cells on the border of the board

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  const dirs = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1],
  ]; // right
  const rows = board.length;
  const cols = board[0].length;

  // helper func that converts all "O" to "T"
  function dfs(r, c) {
    // return if r, c is out of bounds or board is not an "O"
    if (r < 0 || r === rows || c < 0 || c === cols || board[r][c] !== "O")
      return;

    // console.log(r,c)

    // at this point, board[r][c] is "O", so we change it to "T"
    board[r][c] = "T";

    // We then dfs to all dirs
    for ([dr, dc] of dirs) {
      dfs(r + dr, c + dc);
    }
  }

  // 1. convert "O" on the perimeter of the board to "T"
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      // if cell is an "O", and it's in the perimeter of the board
      if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
        if (board[i][j] === "O") {
          // console.log(i, j)
          dfs(i, j);
        }
      }
    }
  }

  // 2. convert all "O" to "X".. These are the "O" that are not in the perimeter of the board
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }

  // 3. convert all "T" to "O".. These are the "O" that were in the perimeter of the board that we changed to "T". let's change it back to "O"
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      if (board[i][j] === "T") {
        board[i][j] = "O";
      }
    }
  }
};
