// A rectangular map consisting of N rows and M columns of square areas is given. Each area is painted with a certain color.

// Two areas on the map belong to the same country if the following conditions are met:

// they have the same color;
// it is possible to travel from one area to the other orthogonally (that is, by moving only north, south, west or east) without moving over areas of a different color.
// The map can be described by a zero-indexed matrix A consisting of N rows and M columns of integers. The color of each area is described by the corresponding element of the matrix. Two areas have the same color if and only if their corresponding matrix elements have the same value.

// For example, consider the following matrix A consisting of seven rows and three columns:

// A[0][0] = 5    A[0][1] = 4    A[0][2] = 4
// A[1][0] = 4    A[1][1] = 3    A[1][2] = 4
// A[2][0] = 3    A[2][1] = 2    A[2][2] = 4
// A[3][0] = 2    A[3][1] = 2    A[3][2] = 2
// A[4][0] = 3    A[4][1] = 3    A[4][2] = 4
// A[5][0] = 1    A[5][1] = 4    A[5][2] = 4
// A[6][0] = 4    A[6][1] = 1    A[6][2] = 1
// Matrix A describes a map that is colored with five colors. The areas on the map belong to eleven different countries (C1-C11), as shown in the following figure:

// Write a function

// function solution(A);

// that, given a zero-indexed matrix A consisting of N rows and M columns of integers, returns the number of different countries to which the areas of the map described by matrix A belong.

// For example, given matrix A consisting of seven rows and three columns corresponding to the example above, the function should return 11.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..300,000];
// the number of elements in matrix A is within the range [1..300,000];
// each element of matrix A is an integer within the range [-1,000,000,000..1,000,000,000].

// you can write to stdout for debugging purposes, e.g.
// // console.log('this is a debug message');

// This failed in performance.
// Score: 80% total: 100% corrected, 50% performance

function solution(A) {
  // Implement your solution here
  // Get rows and cols
  let n = A.length;
  let m = A[0].length;

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let visited = new Set(); // when adding to the set, make sure it's a string
  let count = 0; // num count of our countries

  function DFS(r, c, color) {
    // console.log(r,c,color)
    // check if we're out of bounds
    if (r < 0 || r > n - 1 || c < 0 || c > m - 1) {
      // console.log("Out-of-bounds")
      return;
    }

    // check if neighbor cell is not the same value as current cell or if we visited this in the past
    if (visited.has([r, c].join()) || A[r][c] !== color) {
      // console.log("Visited: " + visited.has([r,c].join()) + " Not same color: " + A[r][c] + " " + color)
      return;
    }

    // add the current r, c to our visited list
    visited.add([r, c].join());

    // DFS on 4 directions
    for (let i = 0; i < dirs.length; i += 1) {
      DFS(r + dirs[i][0], c + dirs[i][1], color);
    }

    return;
  }

  // visit each cell and perform DFS
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      // check if we've visited this cell before
      // console.log("next i,j: ", i, j)
      if (!visited.has([i, j].join())) {
        // Call DFS on i,j
        let color = A[i][j];
        DFS(i, j, color);
        count += 1;
        // console.log("count: ", count)
      }
    }
  }
  return count;
}
