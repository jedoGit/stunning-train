// Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

// A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

// Example 1:

// Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
// Output: 1
// Explanation: There is 1 equal row and column pair:
// - (Row 2, Column 1): [2,7,7]
// Example 2:

// Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// Output: 3
// Explanation: There are 3 equal row and column pairs:
// - (Row 0, Column 0): [3,1,2,2]
// - (Row 2, Column 2): [2,4,2,2]
// - (Row 3, Column 2): [2,4,2,2]

// Constraints:

// n == grid.length == grid[i].length
// 1 <= n <= 200
// 1 <= grid[i][j] <= 105

/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  let count = 0;
  const rowMap = new Map();

  // Since we're given an nxn matrix, we can capture each row and add it to a
  // map and count the number of occurence of that row.
  // We then compare each column if it exists in the map and take into account
  // the number of occurence.

  // Let's add the row to a map and the count the number of occurences of each row
  for (let r = 0; r < grid.length; r++) {
    // Remember, an nxn matrix is just an array of arrays. Each element in the matrix
    // is an array and this arrays are the rows.
    const rowArr = grid[r].join();
    //console.log(rowArr)
    rowMap.set(rowArr, 1 + (rowMap.get(rowArr) || 0)); // we keep track of the occurence of the rows
  }

  // Here, we get the columns of the matrix and check our Map for the number of times it occurs
  for (let i = 0; i < grid.length; i++) {
    const colArr = grid.map((r) => r[i]).join();
    //console.log(colArr)
    count = count + (rowMap.get(colArr) || 0);
  }

  //console.log(rowMap)

  return count;
};
