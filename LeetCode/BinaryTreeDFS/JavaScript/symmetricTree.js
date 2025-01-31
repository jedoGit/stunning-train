// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

// Example 1:

// Input: root = [1,2,2,3,4,4,3]
// Output: true
// Example 2:

// Input: root = [1,2,2,null,3,null,3]
// Output: false

// Constraints:

// The number of nodes in the tree is in the range [1, 1000].
// -100 <= Node.val <= 100

// Follow up: Could you solve it both recursively and iteratively?

// TC: O(n) where n is the number of nodes. We'll visit all of them
// SC: O(h) where h is the height of the tree.

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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  // Using Recursive DFS
  // Declare a dfs function
  function DFS(lNode, rNode) {
    if (!lNode && !rNode) return true; // both are null, they are symetric
    if (!lNode || !rNode) return false; // either node is null... we've already check prior that both are not null. Not symmetric
    // Check the values of the nodes are equal and perform DSF inner nodes and outer nodes
    return (
      lNode.val === rNode.val &&
      DFS(lNode.left, rNode.right) &&
      DFS(lNode.right, rNode.left)
    );
  }

  return DFS(root.left, root.right);
};

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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) {
    return true;
  }

  // Using Iterative DFS
  let stack = [];

  stack.push([root.left, root.right]);

  while (stack.length) {
    let [nodeL, nodeR] = stack.pop();

    if (!nodeL && !nodeR) {
      continue;
    } else if (!nodeL || !nodeR) {
      return false;
    } else if (nodeL.val !== nodeR.val) {
      return false;
    } else {
      // Add the outer and inner nodes to the stack
      stack.push([nodeL.left, nodeR.right]);
      stack.push([nodeL.right, nodeR.left]);
    }
  }

  return true;
};
