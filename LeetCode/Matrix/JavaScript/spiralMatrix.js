// Given an m x n matrix, return all elements of the matrix in spiral order.

// Example 1:

// Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]
// Example 2:

// Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
// Output: [1,2,3,4,8,12,11,10,9,5,6,7]

// Constraints:

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 10
// -100 <= matrix[i][j] <= 100

// TC: O(n*m), we visit all elements in the matrix
// SC: O(1), in place processing

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let res = [];
  let left = 0;
  let right = matrix[0].length;
  let top = 0;
  let bottom = matrix.length;

  while (left < right && top < bottom) {
    // Get every i in the top row
    for (let i = left; i < right; i++) {
      res.push(matrix[top][i]);
    }
    top += 1;

    // Get every i in the right col
    for (let i = top; i < bottom; i++) {
      res.push(matrix[i][right - 1]);
    }
    right -= 1;

    if (!(left < right && top < bottom)) {
      break;
    }

    // Get every i in the bottom row
    for (let i = right - 1; i > left - 1; i--) {
      res.push(matrix[bottom - 1][i]);
    }
    bottom -= 1;

    // Get every i in the left col
    for (let i = bottom - 1; i > top - 1; i--) {
      res.push(matrix[i][left]);
    }
    left += 1;
  }

  return res;
};
