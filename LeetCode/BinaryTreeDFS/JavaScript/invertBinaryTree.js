// Given the root of a binary tree, invert the tree, and return its root.

// Example 1:

// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]
// Example 2:

// Input: root = [2,1,3]
// Output: [2,3,1]
// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

// TC: O(n) where n is the number of nodes we visit.
// SC: O(h) we're doing recursive DFS, we're using the call stack to store the function calls

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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  // Base case
  if (!root) {
    return root;
  }

  // Now, lets swap the left and right child of this node
  let tmp = null;

  if (root.left) {
    tmp = root.left;
  }

  root.left = root.right;
  root.right = tmp;

  // After we swap the children node, let's invert the children of the left and right nodes
  if (root.left) invertTree(root.left);
  if (root.right) invertTree(root.right);

  // After we invert the children node, we return the root
  return root;
};
