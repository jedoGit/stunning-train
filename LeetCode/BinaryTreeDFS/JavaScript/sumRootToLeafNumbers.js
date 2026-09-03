// You are given the root of a binary tree containing digits from 0 to 9 only.

// Each root-to-leaf path in the tree represents a number.

// For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
// Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

// A leaf node is a node with no children.

// Example 1:

// Input: root = [1,2,3]
// Output: 25
// Explanation:
// The root-to-leaf path 1->2 represents the number 12.
// The root-to-leaf path 1->3 represents the number 13.
// Therefore, sum = 12 + 13 = 25.
// Example 2:

// Input: root = [4,9,0,5,1]
// Output: 1026
// Explanation:
// The root-to-leaf path 4->9->5 represents the number 495.
// The root-to-leaf path 4->9->1 represents the number 491.
// The root-to-leaf path 4->0 represents the number 40.
// Therefore, sum = 495 + 491 + 40 = 1026.

// Constraints:

// The number of nodes in the tree is in the range [1, 1000].
// 0 <= Node.val <= 9
// The depth of the tree will not exceed 10.

// TC: O(n), visit all nodes
// SC: O(h), h is heigh of tree

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

class SumRootToLeafNumbersRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  sumNumbers(root) {
    // Helper function
    function dfs(cur, num) {
      if (!cur) return 0;

      // multiply num by 10 and add cur.val
      num = num * 10 + cur.val;

      // do this until we hit the left node
      if (!cur.left && !cur.right) {
        return num;
      }

      // Then let's recursively perform dfs on the right and left children and add the returned numbers
      return dfs(cur.left, num) + dfs(cur.right, num);
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
  const result = solution.sumNumbers(createTree(record.values));
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new SumRootToLeafNumbersRecord([1, 2, 3], 25),
  new SumRootToLeafNumbersRecord([4, 9, 0, 5, 1], 1026),
  // Single node tree, the root is also the only leaf
  new SumRootToLeafNumbersRecord([7], 7),
  // Skewed tree with a single root-to-leaf path 1->2->3
  new SumRootToLeafNumbersRecord([1, null, 2, null, 3], 123),
  // A zero valued root still contributes the digits below it
  new SumRootToLeafNumbersRecord([0, 1, 2], 3),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
