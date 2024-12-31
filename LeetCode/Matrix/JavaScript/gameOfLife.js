// According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

// The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

// Any live cell with fewer than two live neighbors dies as if caused by under-population.
// Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by over-population.
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
// The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the m x n grid board. In this process, births and deaths occur simultaneously.

// Given the current state of the board, update the board to reflect its next state.

// Note that you do not need to return anything.

// Example 1:

// Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
// Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
// Example 2:

// Input: board = [[1,1],[1,0]]
// Output: [[1,1],[1,1]]

// Constraints:

// m == board.length
// n == board[i].length
// 1 <= m, n <= 25
// board[i][j] is 0 or 1.

// Follow up:

// Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
// In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?

// TC: O(3*m*n) => O(mn)... We have to visit each cells 3 times to check its neighbors, to assign values and to fix the final values
// SC: O(1)

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  // This is our state table... we'll represent our state changes like this
  // Old      | New   |   State
  // 0        |   0   |   0
  // 1        |   0   |   1
  // 0        |   1   |   2
  // 1        |   1   |   3

  // This is the number of rows and cols of the matrix
  let rows = board.length;
  let cols = board[0].length;

  // This is our helper function to check the neighbor counts of the cell
  function countNeighbors(r, c) {
    let nei = 0;
    // Check each elements of the matrix
    for (let i = r - 1; i < r + 2; i++) {
      for (let j = c - 1; j < c + 2; j++) {
        // Continue if:
        // 1. i,j is r,c
        // 2. i or j is out of bounds, ie negative
        // 3. i or j is out of bounds, ie greater than the matrix length
        if (
          (i === r && j === c) ||
          i < 0 ||
          j < 0 ||
          i === rows ||
          j === cols
        ) {
          continue;
        }
        // Check if the matrix elements is equal to 1 or 3, if so,
        // increment nei by 1. This is the neighbor count of the current cell
        if (board[i][j] === 1 || board[i][j] === 3) {
          nei += 1;
        }
      }
    }
    return nei;
  }

  // Here, we visit each elements of the matrix and check its neighbors
  // we use our state diagram above to assign values based on its neighbors
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // First, get the neighbor count of the current cell
      const nei = countNeighbors(r, c);
      // console.log(nei)
      // If the current cell is zero
      // we check if it has 2 or 3 neighbors
      if (board[r][c]) {
        // If it has 2 or 3 neighbors, we change the value of the current cell to 3
        // based on the state diagram
        if (nei === 2 || nei === 3) {
          board[r][c] = 3;
          // console.log("board[r][c] in [2,3], set to 3")
        }
      } else if (nei === 3) {
        // here, the current element is non-zero and it has 3 neighbors
        // We assign a value of 2
        board[r][c] = 2;
      }
    }
  }

  // At this point, we're done assigning values to each cells based on the state diagram
  // now, we're ready to update each cells if they're dead or not... 0 or 1
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // If the cell was assigned a 1, we set it to zero
      if (board[r][c] === 1) {
        board[r][c] = 0;
      } else if (board[r][c] === 2 || board[r][c] === 3) {
        // if a cell is assigned a 2 or a 3, we set it to 1
        board[r][c] = 1;
        // console.log("board[r][c] in [2,3], set to 1")
      }
    }
  }
};
