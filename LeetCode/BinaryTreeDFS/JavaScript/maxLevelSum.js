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

  // We'll use a map to store the levels and sum of node values for that level
  let result = new Map();

  // We'll create a helper function to recurse through the levels of nodes
  function dfs(node, level) {
    // This is our base case, once we visited all the children, we return
    if (!node) return;

    // First, we need to check if the level we received already exists in our results map
    // If not, we add it to the results map
    if (result.has(level)) {
      // Let's update the value for this key
      // This is to sum all the values of the nodes at this level
      let curSum = result.get(level) + node.val;
      result.set(level, curSum);
    } else {
      result.set(level, node.val);
    }

    // Then let's visit all of the children and incrementing the level
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  // Let's pass the root to our helper function and set the level to 1
  dfs(root, 1);

  // console.log(result)

  // We compeleted our dfs, so, let's check the max sum from our results map
  // and return the lowest level we found it
  let maxVal = -Infinity;
  let minLevel = 0;

  for (let [key, val] of result) {
    if (val > maxVal) {
      maxVal = val;
      minLevel = key;
    }
  }

  return minLevel;
};
