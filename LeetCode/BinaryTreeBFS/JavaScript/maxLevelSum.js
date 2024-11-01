// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

// Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

// Example 1:

// Input: root = [1,7,0,7,-8,null,null]
// Output: 2
// Explanation:
// Level 1 sum = 1.
// Level 2 sum = 7 + 0 = 7.
// Level 3 sum = 7 + -8 = -1.
// So we return the level with the maximum sum which is level 2.
// Example 2:

// Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
// Output: 2

// Constraints:

// The number of nodes in the tree is in the range [1, 104].
// -105 <= Node.val <= 105

// TC: O(n*m) we're looping through each level of the tree and in each level, we're looping through all the nodes.
// SC: O(n*m) we're looping through each level of the tree and in each level, we're looping through all the nodes. Each time we process a node, we add it to the queue

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
var maxLevelSum = function (root) {
  if (!root) return 0;
  // We'll use BFS. For each level, we add the children nodes from left to right to the queue and compute the sum of
  // all the nodes in that level and save it

  let q = [];
  let level = 0;
  let maxSum = -Infinity;
  let minLevel = Infinity;

  // Push the root to the queue so we can process it
  q.push(root);

  // We start processing the queue
  while (q.length) {
    // Let's capture some temp values we need
    let curLen = q.length;
    let curSum = 0;

    // We increment the level each time we iterate through the loop
    level = level + 1;

    // These are the nodes in the current level that were added to the queue
    // We'll sum all their values and push their children node to the back of the queue
    while (curLen) {
      curNode = q.shift();
      curSum = curSum + curNode.val;

      if (curNode.left) q.push(curNode.left);
      if (curNode.right) q.push(curNode.right);

      // Don't forget to decrement the curLen, we only want to remove the node from the current level in the queue
      curLen--;
    }

    // The requirement states to return the lowest level that has the maximum sum
    // So, there might be multiple levels with the same maxSum value... we'll just return
    // the first level we see with the maximum sum
    if (curSum > maxSum) {
      maxSum = curSum;
      minLevel = level;
    }
  }

  return minLevel;
};
