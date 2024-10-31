// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// Example 1:

// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]
// Example 2:

// Input: root = [1,null,3]
// Output: [1,3]
// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

// TC: O(n) We're looping through the levels of the binary tree and inspecting the nodes
// SC: O(n) While we're looping through the levels of the binary tree, we're adding the nodes to a function call stack

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
 * @return {number[]}
 */
var rightSideView = function (root) {
  // Let's use DFS.
  // Let's visit each level on the right side of the root.
  // We'll keep track of each level and add the value of the node at each level.
  // Then, after we visited all the right nodes, we should have a results array
  // which are the values of all the right nodes
  // Then, we'll look to the left of the root but this time, we'll look at both left and right children

  let result = [];

  function dfs(node, level) {
    if (!node) return;

    // Check the result length first if equal to level
    if (result.length === level) {
      result.push(node.val);
    }

    dfs(node.right, level + 1);
    dfs(node.left, level + 1);
  }

  dfs(root, 0);

  return result;
};
