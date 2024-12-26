// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

// Example 1:

// Input: board =
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: true
// Example 2:

// Input: board =
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

// Constraints:

// board.length == 9
// board[i].length == 9
// board[i][j] is a digit 1-9 or '.'.

// TC: O(9^2), we visit each cells on our 9x9 matrix
// SC: O(3*(9^2)), worst case is for each row, col, and square keys in our map (9*3),  we have 9 entries in our sets (9*9*3)

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  // Using hash map to check if there are duplicates in each rows, columns and cells
  let cols = new Map();
  let rows = new Map();
  let squares = new Map();

  // Let's go through each rows and cols, it's a 9x9 matrix
  // A cell is a 3x3 matrix
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      // Let's compute which cell the current row and col belong to
      // It works out by using integer division by 3 and we can address each cell
      // For example, r = 0 and c = 0 is cell (0,0); r = 8 and c = 8 is cell (2,2)
      // r = 7, c = 3 is cell (2, 1)
      let r_ = (r / 3) | 0; // Integer division
      let c_ = (c / 3) | 0; // Integer division
      let rcPair = r_ + "," + c_; // We need to write the pair as strings to the hashmap

      // console.log(rcPair)

      // If board[r][c] is a dot, it means it's empty, so we continue
      if (board[r][c] === ".") {
        continue;
      }

      // Here we create the key and value is initialized as an empty set.
      if (!cols.has(c)) {
        cols.set(c, new Set());
      }
      if (!rows.has(r)) {
        rows.set(r, new Set());
      }
      if (!squares.has(rcPair)) {
        squares.set(rcPair, new Set());
      }

      // console.log(cols)
      // console.log(rows)
      // console.log(squares)

      // We get the value for each keys and check if the current r,c pair has duplicates
      // If so, we return false
      if (
        rows.get(r).has(board[r][c]) ||
        cols.get(c).has(board[r][c]) ||
        squares.get(rcPair).has(board[r][c])
      ) {
        return false;
      }

      // Now we add each non "." values to our sets, this is to see if we have duplicates
      cols.get(c).add(board[r][c]);
      rows.get(r).add(board[r][c]);
      squares.get(rcPair).add(board[r][c]);

      // console.log(cols)
      // console.log(rows)
      // console.log(squares)
    }
  }

  return true;
};
