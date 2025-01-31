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
  if (!root) {
    return true;
  }

  // Using Iterative BFS
  let queue = [];

  // Using queue for BFS. We're pushing a pair in the queue
  queue.push([root.left, root.right]);

  // process the pair in the queue
  while (queue.length) {
    //  Save the queue lenght here
    let qLen = queue.length;

    // process the nodes on the current level
    for (let i = 0; i < qLen; i += 1) {
      let [nodeL, nodeR] = queue.shift(); // read from the left of the queue

      if (!nodeL && !nodeR) {
        continue;
      } else if (!nodeL || !nodeR) {
        return false;
      } else if (nodeL.val !== nodeR.val) {
        return false;
      } else {
        // Add the outer and inner nodes to the queue
        queue.push([nodeL.left, nodeR.right]);
        queue.push([nodeL.right, nodeR.left]);
      }
    }
  }

  return true;
};
