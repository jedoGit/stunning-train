// Given the root of a binary tree, invert the tree, and return its root.

// Example 1:

// Input: root = [4,2,7,1,3,6,9]
// Output: [4,7,2,9,6,3,1]
// Example 2:

// Input: root = [2,1,3]
// Output: [2,3,1]
// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

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

class InvertBinaryTreeRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n) where n is the number of nodes we visit.
  // SC: O(h) we're doing recursive DFS, we're using the call stack to store the function calls
  /**
   * @param {TreeNode} root
   * @return {TreeNode}
   */
  invertTree(root) {
    // Base case
    if (!root) {
      return root;
    }

    // Now, lets swap the left and right child of this node
    let tmp = null;

    if (root.left) {
      tmp = root.left;
    }

    root.left = root.right;
    root.right = tmp;

    // After we swap the children node, let's invert the children of the left and right nodes
    if (root.left) this.invertTree(root.left);
    if (root.right) this.invertTree(root.right);

    // After we invert the children node, we return the root
    return root;
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

function treeToArray(root) {
  if (!root) return [];

  const values = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    if (!node) {
      values.push(null);
      continue;
    }

    values.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }

  // Trailing nulls are not part of the level order representation
  while (values.length && values[values.length - 1] === null) {
    values.pop();
  }

  return values;
}

function testSolution(record) {
  const solution = new Solution();
  const result = treeToArray(solution.invertTree(createTree(record.values)));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new InvertBinaryTreeRecord([4, 2, 7, 1, 3, 6, 9], [4, 7, 2, 9, 6, 3, 1]),
  new InvertBinaryTreeRecord([2, 1, 3], [2, 3, 1]),
  new InvertBinaryTreeRecord([], []),
  new InvertBinaryTreeRecord([1, 2], [1, null, 2]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
