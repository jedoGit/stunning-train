// Given a n * n matrix grid of 0's and 1's only. We want to represent grid with a Quad-Tree.

// Return the root of the Quad-Tree representing grid.

// A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

// val: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the val to True or False when isLeaf is False, and both are accepted in the answer.
// isLeaf: True if the node is a leaf node on the tree or False if the node has four children.
// class Node {
//     public boolean val;
//     public boolean isLeaf;
//     public Node topLeft;
//     public Node topRight;
//     public Node bottomLeft;
//     public Node bottomRight;
// }
// We can construct a Quad-Tree from a two-dimensional area using the following steps:

// If the current grid has the same value (i.e all 1's or all 0's) set isLeaf True and set val to the value of the grid and set the four children to Null and stop.
// If the current grid has different values, set isLeaf to False and set val to any value and divide the current grid into four sub-grids as shown in the photo.
// Recurse for each of the children with the proper sub-grid.

// If you want to know more about the Quad-Tree, you can refer to the wiki.

// Quad-Tree format:

// You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where null signifies a path terminator where no node exists below.

// It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list [isLeaf, val].

// If the value of isLeaf or val is True we represent it as 1 in the list [isLeaf, val] and if the value of isLeaf or val is False we represent it as 0.

// Example 1:

// Input: grid = [[0,1],[1,0]]
// Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
// Explanation: The explanation of this example is shown below:
// Notice that 0 represents False and 1 represents True in the photo representing the Quad-Tree.

// Example 2:

// Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
// Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
// Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.
// The topLeft, bottomLeft and bottomRight each has the same value.
// The topRight have different values so we divide it into 4 sub-grids where each has the same value.
// Explanation is shown in the photo below:

// Constraints:

// n == grid.length == grid[i].length
// n == 2x where 0 <= x <= 6

// TC: O(n^2 logn), each quadrant gets smaller n=n/2 at each recursion.. also, at each recursion, we visit all the cells of the quadrant.
// SC: O(n^2 logn)

/**
 * // Definition for a QuadTree node.
 * function _Node(val,isLeaf,topLeft,topRight,bottomLeft,bottomRight) {
 *    this.val = val;
 *    this.isLeaf = isLeaf;
 *    this.topLeft = topLeft;
 *    this.topRight = topRight;
 *    this.bottomLeft = bottomLeft;
 *    this.bottomRight = bottomRight;
 * };
 */

/**
 * @param {number[][]} grid
 * @return {_Node}
 */
var construct = function (grid) {
  const dfs = (n, r, c) => {
    let allSame = true;

    // Check this quadrant if all cells have the same value
    // If not, set the boolean to false
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[r][c] !== grid[r + i][c + j]) {
          allSame = false;
          break;
        }
      }
    }

    // This quadrant have the same value each cells. So this is a leaf node
    if (allSame) {
      return new Node(grid[r][c], true);
    }

    // At this point, we know that some cells in the quadrant don't the same value
    // So, we DFS the 4 sub quadrants of this quadrant
    n = Math.floor(n / 2);

    let topLeft = dfs(n, r, c);
    let topRight = dfs(n, r, c + n);
    let bottomLeft = dfs(n, r + n, c);
    let bottomRight = dfs(n, r + n, c + n);

    // We know that this quadrant is not a leaf node, so we return a new leafnode and attach the 4 subquadrant children.
    return new Node(0, false, topLeft, topRight, bottomLeft, bottomRight);
  };

  // call dfs with n starting a the original size and pass the position of 0,0
  return dfs(grid.length, 0, 0);
};
