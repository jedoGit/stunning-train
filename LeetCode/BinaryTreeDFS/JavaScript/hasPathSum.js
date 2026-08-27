// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

// A leaf is a node with no children.

// Example 1:

// Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
// Output: true
// Explanation: The root-to-leaf path with the target sum is shown.
// Example 2:

// Input: root = [1,2,3], targetSum = 5
// Output: false
// Explanation: There are two root-to-leaf paths in the tree:
// (1 --> 2): The sum is 3.
// (1 --> 3): The sum is 4.
// There is no root-to-leaf path with sum = 5.
// Example 3:

// Input: root = [], targetSum = 0
// Output: false
// Explanation: Since the tree is empty, there are no root-to-leaf paths.

// Constraints:

// The number of nodes in the tree is in the range [0, 5000].
// -1000 <= Node.val <= 1000
// -1000 <= targetSum <= 1000

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

class HasPathSumRecord {
  constructor(values, targetSum, expected) {
    this.values = values;
    this.targetSum = targetSum;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n), we need to visit all of the nodes
  // SC: O(h), height of the stack, worst case is O(n)
  /**
   * @param {TreeNode} root
   * @param {number} targetSum
   * @return {boolean}
   */
  hasPathSum(root, targetSum) {
    // User helper function
    function dfs(node, curSum) {
      if (!node) return false;

      // each time we visite a node, we compute the current sum
      curSum += node.val;

      // let's check if this is a leaf node, meaning it's the end of the tree and it has no children
      // if it is, check if curSum is equal to targetSum
      if (!node.left && !node.right) {
        return curSum === targetSum;
      }

      // we just need to dfs on both children of the node, which ever side returns a true, return it.
      return dfs(node.left, curSum) || dfs(node.right, curSum);
    }

    return dfs(root, 0);
  }
}

function createTree(values) {
  if (!values.length || values[0] === null) return null;

  const root = new TreeNode(values[0]);
  const queue = [root];
  let index = 1;

  while (queue.length && index < values.length) {
    const node = queue.shift();

    if (values[index] !== null && values[index] !== undefined) {
      node.left = new TreeNode(values[index]);
      queue.push(node.left);
    }
    index++;

    if (index < values.length && values[index] !== null && values[index] !== undefined) {
      node.right = new TreeNode(values[index]);
      queue.push(node.right);
    }
    index++;
  }

  return root;
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.hasPathSum(createTree(record.values), record.targetSum);
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}, targetSum = ${record.targetSum}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new HasPathSumRecord([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22, true),
  new HasPathSumRecord([1, 2, 3], 5, false),
  new HasPathSumRecord([], 0, false),
  new HasPathSumRecord([1, 2], 1, false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
