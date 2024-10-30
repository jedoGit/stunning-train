// You are given the root of a binary tree.

// A ZigZag path for a binary tree is defined as follow:

// Choose any node in the binary tree and a direction (right or left).
// If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
// Change the direction from right to left or from left to right.
// Repeat the second and third steps until you can't move in the tree.
// Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

// Return the longest ZigZag path contained in that tree.

// Example 1:

// Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
// Output: 3
// Explanation: Longest ZigZag path in blue nodes (right -> left -> right).
// Example 2:

// Input: root = [1,1,1,null,1,null,null,1,1,null,1]
// Output: 4
// Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).
// Example 3:

// Input: root = [1]
// Output: 0

// Constraints:

// The number of nodes in the tree is in the range [1, 5 * 104].
// 1 <= Node.val <= 100

// TC: O(n) we're traversing all the nodes
// SC: O(n) we're traversing all the nodes

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
var longestZigZag = function (root) {
  let maxcurLen = -Infinity;

  function dfs(node, lastDir, curLen) {
    if (!node) return null;

    // Once we get to the dfs function, let's compute the max current lenght firt
    // prior to dfs'ing
    maxcurLen = Math.max(maxcurLen, curLen);

    // We pass the length value depending on what was the last direction
    dfs(node.left, "left", lastDir === "right" ? curLen + 1 : 1);
    dfs(node.right, "right", lastDir === "left" ? curLen + 1 : 1);
  }

  // DFS the root and initilize the last direction to left and right
  // and the length is zero
  dfs(root, "left", 0);
  dfs(root, "right", 0);

  return maxcurLen;
};
