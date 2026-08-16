// # Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

// # Example 1:

// # Input: root = [3,9,20,null,null,15,7]
// # Output: [[3],[9,20],[15,7]]
// # Example 2:

// # Input: root = [1]
// # Output: [[1]]
// # Example 3:

// # Input: root = []
// # Output: []

// # Constraints:

// # The number of nodes in the tree is in the range [0, 2000].
// # -1000 <= Node.val <= 1000

// # TC: O(n)
// # SC: O(h), where h is the max num nodes on all levels

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

class LevelOrderRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number[][]}
   */
  levelOrder(root) {
    if (!root) return [];
    // Using BFS
    let q = [];
    let res = [];

    q.push(root);

    while (q.length) {
      let qLen = q.length;

      let val = [];
      for (let i = 0; i < qLen; i += 1) {
        let node = q.shift();
        val.push(node.val);

        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
      }

      res.push(val);
    }

    return res;
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
  const result = solution.levelOrder(createTree(record.values));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LevelOrderRecord([3, 9, 20, null, null, 15, 7], [[3], [9, 20], [15, 7]]),
  new LevelOrderRecord([1], [[1]]),
  new LevelOrderRecord([], []),
  new LevelOrderRecord([1, 2, 3, 4, 5, 6, 7], [[1], [2, 3], [4, 5, 6, 7]]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
