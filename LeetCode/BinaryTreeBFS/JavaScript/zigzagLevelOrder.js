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

class ZigzagLevelOrderRecord {
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
  zigzagLevelOrder(root) {
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
  const result = solution.zigzagLevelOrder(createTree(record.values));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ZigzagLevelOrderRecord([3, 9, 20, null, null, 15, 7], [[3], [20, 9], [15, 7]]),
  new ZigzagLevelOrderRecord([1], [[1]]),
  new ZigzagLevelOrderRecord([], []),
  new ZigzagLevelOrderRecord([1, 2, 3, 4, 5, 6, 7], [[1], [3, 2], [4, 5, 6, 7]]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
