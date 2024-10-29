// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: 3
// Example 2:

// Input: root = [1,null,2]
// Output: 2

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

// TC: O(n), we're traversing the depth of the the Binary tree
// SC: O(n), we're adding a function call to the stack everytime we visit a node of the binary tree

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
var maxDepth = function (root) {
  // We'll use Post Order DFS

  // First check if root is null
  if (!root) return 0;

  // For post order, we visit the nodes first then we
  // perform some action
  let left = 0;
  let right = 0;

  if (root.left) {
    left = maxDepth(root.left);
  }

  if (root.right) {
    right = maxDepth(root.right);
  }

  let maxVal = Math.max(left, right);

  // Everytime we exit a node, we increment the value returned by 1
  return maxVal + 1;
};
