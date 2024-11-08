// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

// Example 1:

// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Example 2:

// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
// Example 3:

// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// grid[i][j] is 0, 1, or 2.

// TC: O(rc), worst case is we have to visit all the cells in the grid
// SC: O(rc), worst case is we have to visit all the cells in the grid

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let q = [];
  const n = grid.length;
  const m = grid[0].length;
  const dir = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let time = 0;

  let outOfBound = (x, y) => {
    return x < 0 || x >= n || y < 0 || y >= m;
  };

  // Intuition, fird all the positions of the rotten oranges,
  // Initialize the queue with all the positions of the rotten oranges
  // Then perform a BFS on these positions. Mark all neighbor cells of rotten orange as 2 every iteration so we don't revisit them
  // At each iteration, that is 1 minute. Iteration 1 is when we complete visiting all the

  // First, we need to find all the rotten oranges
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 2) q.push([i, j]);
    }
  }

  // Let's setup our BFS logic... We'll need a queue and a while loop
  // We'll mark all the neighbor 1's as 2.
  while (q.length) {
    let len = q.length;

    time = time + 1;

    // Only visit the first cells that you added to the queue the previous iteration
    for (let i = 0; i < len; i++) {
      const [r, c] = q.shift();

      // We'll visit the neighbors of the rotten oranges
      for (let [dr, dc] of dir) {
        let nR = r + dr;
        let nC = c + dc;

        // Let's make sure that the neighbor is not outside of the grid
        // not a space or not another rotten orange.
        if (outOfBound(nR, nC) || grid[nR][nC] === 0 || grid[nR][nC] === 2)
          continue;

        // So we found a fresh orange, let's mark that as rotten and
        // add the neibor cell to the queue to be BFS'd
        if (grid[nR][nC] === 1) {
          // These neighbor cells will be processed the next iteration
          // you'll call the q.shift(). This is how BFS works.
          q.push([nR, nC]);
          grid[nR][nC] = 2;
        }
      }
    }
  }

  // At this point, we've marked the neighbors of the rotten orange as 2
  // Also, we captured the time as well.
  // We'll just need to check if there are still 1's out there.
  // If there are, we'll return a -1
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) return -1;
    }
  }

  return time === 0 ? 0 : time - 1;
};
