// Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: [[3],[20,9],[15,7]]
// Example 2:

// Input: root = [1]
// Output: [[1]]
// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 2000].
// -100 <= Node.val <= 100

// TC: O(n)
// SC: O(n/2) = O(n), worst case is the last level of the tree is full, if full, the number of nodes is n/2.

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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  let res = [];
  let q = !root ? [] : [root];

  while (q.length) {
    let level = [];
    let qLen = q.length;
    for (let i = 0; i < qLen; i += 1) {
      let node = q.shift();
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    // reverse the level node values if the res.length is odd. res.length refers to the last node values added to res.
    if (res.length % 2 === 1) {
      level = level.reverse();
    }

    res.push(level);
  }

  return res;
};
