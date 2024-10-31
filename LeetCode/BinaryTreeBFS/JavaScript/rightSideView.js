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
// SC: O(n) While we're looping through the levels of the binary tree, we're adding the nodes to a queue for processing

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
  let result = [];
  let queue = [];

  if (!root) return [];

  queue.push(root);

  while (queue.length) {
    // We want to to alway grab the last element in the queue
    // The last element in the queue is the rightmost node
    let qLen = queue.length;
    let node = queue[qLen - 1];

    // Add the rightmost node value to our result array
    result.push(node.val);

    // We need to process the nodes we added from the previous iteration
    // Also during this step, we add the children of those nodes to the queue
    while (qLen) {
      // We shift() the value in front of the queue and
      // add its children to the back of the queue
      let curNode = queue.shift();
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);

      // We only want to remove the nodes we added from the last iteration
      qLen--;
    }
  }

  return result;
};
