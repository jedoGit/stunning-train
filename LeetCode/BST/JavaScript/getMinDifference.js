// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

// Example 1:

// Input: root = [4,2,6,1,3]
// Output: 1
// Example 2:

// Input: root = [1,0,48,null,null,12,49]
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [2, 104].
// 0 <= Node.val <= 105

// Note: This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

// TC: O(n)
// SC: O(h), h is the height of the tree

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
var getMinimumDifference = function (root) {
  let min_dist = [parseFloat(Number.POSITIVE_INFINITY)];
  let prev = [null];

  function dfs(node) {
    if (node === null) {
      return;
    }

    // In order Traversal

    dfs(node.left);

    // Update the new min_distance
    if (prev[0] !== null) {
      min_dist[0] = Math.min(min_dist[0], node.val - prev[0]);
    }

    // Update the prev value
    prev[0] = node.val;

    dfs(node.right);
  }

  dfs(root);

  return min_dist[0];
};
