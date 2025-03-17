// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1
// Example 2:

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] is '0' or '1'.

// TC: O(m*n)
// SC: O(m*n)

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const m = grid.length;
  const n = grid[0].length;
  let visited = new Set();
  let count = 0;

  // helper function
  function dfs(r, c) {
    // check if we're out of bounds, if so, return
    if (r < 0 || c < 0 || r > m - 1 || c > n - 1) return;
    // check if this is a water ("0") or if this is a land we visited, if so, return
    if (grid[r][c] === "0" || visited.has([r, c].join())) return;

    // this is a land we have not visited, so we let's add to the visited set then dfs on all directions
    visited.add([r, c].join());

    for (let [dr, dc] of dirs) {
      dfs(r + dr, c + dc);
    }
  }

  // let's visit all cells of the grid
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // check if the grid[i][j] is a land "1" and if we have not visited it
      if (grid[i][j] === "1" && !visited.has([i, j].join())) {
        // increment the count then dfs on this i,j
        count += 1;
        dfs(i, j);
      }
    }
  }

  return count;
};
