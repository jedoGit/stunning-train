// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

// Example 1:

// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]
// Example 2:

// Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

// Constraints:

// n == matrix.length == matrix[i].length
// 1 <= n <= 20
// -1000 <= matrix[i][j] <= 1000

// TC: O(m*n) We have to visit each elements of the matrix to perform transpose and reverse
// SC: O(1) in place processing

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let m = matrix[0].length; // number of cols
  let n = matrix.length; // number of rows

  // First, transpose the matrix, rows become columns and columns become rows
  // Using array destructuring
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // console.log(matrix)

  // Next, reverse the element on each row by using two pointers
  // We can use array destructuring for each row
  for (let i = 0; i < n; i++) {
    for (let l = 0, r = m - 1; l < r; l++, r--) {
      [matrix[i][l], matrix[i][r]] = [matrix[i][r], matrix[i][l]];
    }
  }

  // console.log(matrix)
};
