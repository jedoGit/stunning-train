// Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: [3.00000,14.50000,11.00000]
// Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
// Hence return [3, 14.5, 11].
// Example 2:

// Input: root = [3,9,20,15,7]
// Output: [3.00000,14.50000,11.00000]

// Constraints:

// The number of nodes in the tree is in the range [1, 104].
// -231 <= Node.val <= 231 - 1

// TC: O(n)
// SC: O(h), max number of nodes in a level.

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

class AverageOfLevelsRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number[]}
   */
  averageOfLevels(root) {
    if (!root) {
      return [];
    }

    // Using BFS
    let queue = [];
    let avg = [];

    queue.push(root);

    while (queue.length) {
      let qLen = queue.length;
      let cumSum = 0;

      for (let i = 0; i < qLen; i += 1) {
        let node = queue.shift();

        cumSum += node.val;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      avg.push(cumSum / qLen);
    }

    return avg;
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
  const result = solution.averageOfLevels(createTree(record.values));
  // Answers within 10^-5 of the actual answer are accepted.
  const pass =
    result.length === record.expected.length &&
    result.every((val, i) => Math.abs(val - record.expected[i]) < 1e-5);

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new AverageOfLevelsRecord([3, 9, 20, null, null, 15, 7], [3, 14.5, 11]),
  new AverageOfLevelsRecord([3, 9, 20, 15, 7], [3, 14.5, 11]),
  new AverageOfLevelsRecord([1], [1]),
  new AverageOfLevelsRecord([], []),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
