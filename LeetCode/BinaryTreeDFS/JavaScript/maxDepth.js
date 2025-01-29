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
  // We'll use Post Order DFS (Recursive)

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
  // Using iterative BFS approach
  // Base case
  if (!root) {
    return 0;
  }

  // Using queue for BFS
  let level = 0;
  let q = [];
  q.push(root); // push the root to the queue

  // let's process our queue while the queue is not empty
  while (q.length) {
    // We'll need a snapshot of the current queue as this represents the current level we're processing for BFS
    let qSize = q.length;
    // Let's only process the nodes in the current level. We do this by iterating only up to the current queue size
    for (let i = 0; i < qSize; i++) {
      let node = q.shift(); // pop the node from the front... in JS this is the shift method of the array
      // Add the childrent node to the queue if they're not null
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
    // After processing all the nodes in the current level, we need to increment our level counter before we move on to the next level.
    level += 1;
  }

  return level;
};
