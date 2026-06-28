// Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

// You must do it in place.

// Example 1:

// Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]
// Example 2:

// Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

// Constraints:

// m == matrix.length
// n == matrix[0].length
// 1 <= m, n <= 200
// -231 <= matrix[i][j] <= 231 - 1

// Follow up:

// A straightforward solution using O(mn) space is probably a bad idea.
// A simple improvement uses O(m + n) space, but still not the best solution.
// Could you devise a constant space solution?

// TC: O(2*m*n) = O(m*n), we have to vist each elements of the matrix twice... first to check if we need to zero them then, we visit again to zero them
// SC: O(1) in place processing

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class SetMatrixZeroesRecord {
  constructor(matrix, expected) {
    this.matrix = matrix;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[][]} matrix
   * @return {void} Do not return anything, modify matrix in-place instead.
   */
  setZeroes(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let rowZero = false;

    // Determine which rows/cols need to be zeroed
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // If we see a zero, we mark that row and col for zeroing out
        if (matrix[r][c] === 0) {
          // Mark the whole column
          matrix[0][c] = 0;
          // Mark the whole row
          if (r > 0) {
            matrix[r][0] = 0;
          } else {
            rowZero = true;
          }
        }
      }
    }

    // Start zeroing out the elements
    for (let r = 1; r < rows; r++) {
      for (let c = 1; c < cols; c++) {
        // If the row and col are marked for zeroing out, zero them out
        if (matrix[0][c] === 0 || matrix[r][0] === 0) {
          matrix[r][c] = 0;
        }
      }
    }

    // This is for the edge case cell(0,0) for the row
    if (matrix[0][0] === 0) {
      for (let r = 0; r < rows; r++) {
        matrix[r][0] = 0;
      }
    }
    // Edge case for cell(0,0) for the col
    if (rowZero) {
      for (let c = 0; c < cols; c++) {
        matrix[0][c] = 0;
      }
    }
  }
}

function testSolution(record) {
  const solution = new Solution();
  const matrix = record.matrix.map((row) => [...row]);

  solution.setZeroes(matrix);
  const status = JSON.stringify(matrix) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`input: matrix: ${JSON.stringify(record.matrix)}`);
  console.log(`expected: ${JSON.stringify(record.expected)}`);
  console.log(`result: ${JSON.stringify(matrix)}`);
  console.log(status);
}

const records = [
  new SetMatrixZeroesRecord(
    [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ]
  ),
  new SetMatrixZeroesRecord(
    [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ],
    [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ]
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
