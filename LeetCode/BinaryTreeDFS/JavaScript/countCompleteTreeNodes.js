// Given the root of a complete binary tree, return the number of the nodes in the tree.

// According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Design an algorithm that runs in less than O(n) time complexity.

// Example 1:

// Input: root = [1,2,3,4,5,6]
// Output: 6
// Example 2:

// Input: root = []
// Output: 0
// Example 3:

// Input: root = [1]
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [0, 5 * 104].
// 0 <= Node.val <= 5 * 104
// The tree is guaranteed to be complete.

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
var countNodes = function (root) {
  // Return 0 if it's null
  if (!root) {
    return 0;
  }

  // we'll use a global variable to keep track of the node count
  let nodeCount = 0;

  // helper function to DFS all the nodes
  function dfs(root) {
    // When we hit a null, let's just return
    if (!root) {
      return;
    }

    // We hit a node, let's increment node count
    nodeCount += 1;

    // DFS to the left and right child
    dfs(root.left);
    dfs(root.right);
  }

  // Call the helper function
  dfs(root);

  return nodeCount;
};
