// Given a 2D grid consists of 0s (land) and 1s (water).  An island is a maximal 4-directionally connected group of 0s and a closed island is an island totally (all left, top, right, bottom) surrounded by 1s.

// Return the number of closed islands.

// Example 1:

// Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
// Output: 2
// Explanation:
// Islands in gray are closed because they are completely surrounded by water (group of 1s).
// Example 2:

// Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
// Output: 1
// Example 3:

// Input: grid = [[1,1,1,1,1,1,1],
//                [1,0,0,0,0,0,1],
//                [1,0,1,1,1,0,1],
//                [1,0,1,0,1,0,1],
//                [1,0,1,1,1,0,1],
//                [1,0,0,0,0,0,1],
//                [1,1,1,1,1,1,1]]
// Output: 2

// Constraints:

// 1 <= grid.length, grid[0].length <= 100
// 0 <= grid[i][j] <=1

/**
 * @param {number[][]} grid
 * @return {number}
 */

// TC: O(n*m), we only visit each cells one time
// SC: O((n-2)*(m-2)), the worst case is when all of the outer edge are water and everything in the middle are land

var closedIsland = function (grid) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const n = grid.length; // number of rows
  const m = grid[0].length; // number of cols
  let visited = new Set();
  let count = 0;

  function DFS(r, c) {
    // Base cases
    // If r and c is out of bounds, return false
    if (r < 0 || c < 0 || r > n - 1 || c > m - 1) return false;

    // Check if grid[r][c] === 1 or if we have visited this location before... we return true
    if (visited.has([r, c].join()) || grid[r][c] === 1) return true;

    // Here, grid[r][c] is 0 and we have not visited this location before, do we DFS on 4 directions

    // Let's mark this location as visited first...
    // Be careful with using sets because it expects the key as string.
    visited.add([r, c].join());
    // console.log(visited)

    let res = true;

    // we keep on DFSing on 4 directions if grid[r][c] === 0
    for (let i = 0; i < dirs.length; i += 1) {
      // We want to AND the result of DFS on 4 dirs.
      res &= DFS(r + dirs[i][0], c + dirs[i][1]);
    }

    return res;
  }

  // Let' visit all of the cells and check if it's land and if so, perform DFS on lands we have not visited.
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      // Check if it's a land (0) and we have not visited it, perform DFS
      if (grid[i][j] === 0 && !visited.has([i, j].join())) {
        // If the DFS return true, we increment the count.
        if (DFS(i, j)) {
          count += 1;
        }
      }
    }
  }

  return count;
};
