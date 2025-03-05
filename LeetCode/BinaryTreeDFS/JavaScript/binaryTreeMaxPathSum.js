// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

// The path sum of a path is the sum of the node's values in the path.

// Given the root of a binary tree, return the maximum path sum of any non-empty path.

// Example 1:

// Input: root = [1,2,3]
// Output: 6
// Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
// Example 2:

// Input: root = [-10,9,20,null,null,15,7]
// Output: 42
// Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

// Constraints:

// The number of nodes in the tree is in the range [1, 3 * 104].
// -1000 <= Node.val <= 1000

// TC: O(n) we visit all nodes
// SC: O(h) h is height of the tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  // Using a global variable and using an array for ease of manipulation
  let res = [root.val];

  // Helper function
  function dfs(root) {
    if (!root) {
      return 0;
    }

    // DFS to right and left children
    let leftMax = dfs(root.left);
    let rightMax = dfs(root.right);

    // DFS could return negative value, if negative, we want to use zero instead and not include the negative value
    leftMax = Math.max(leftMax, 0);
    rightMax = Math.max(rightMax, 0);

    // Compute the max path with split to both children
    res[0] = Math.max(res[0], root.val + leftMax + rightMax);

    return root.val + Math.max(leftMax, rightMax);
  }

  dfs(root);

  return res[0];
};
