// Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

// Example 1:

// Input: root = [4,2,6,1,3]
// Output: 1
// Example 2:

// Input: root = [1,0,48,null,null,12,49]
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [2, 104].
// 0 <= Node.val <= 105

// Note: This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Record {
  constructor(root, expected) {
    this.root = root;
    this.expected = expected;
  }
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  getMinimumDifference(root) {
    let min_dist = [parseFloat(Number.POSITIVE_INFINITY)];
    let prev = [null];

    function dfs(node) {
      if (node === null) {
        return;
      }

      // In order Traversal

      dfs(node.left);

      // Update the new min_distance
      if (prev[0] !== null) {
        min_dist[0] = Math.min(min_dist[0], node.val - prev[0]);
      }

      // Update the prev value
      prev[0] = node.val;

      dfs(node.right);
    }

    dfs(root);

    return min_dist[0];
  }
}

function buildTree(values) {
  if (values.length === 0 || values[0] === null) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue = [root];
  let index = 1;

  while (queue.length > 0 && index < values.length) {
    const node = queue.shift();

    if (values[index] !== null) {
      node.left = new TreeNode(values[index]);
      queue.push(node.left);
    }
    index++;

    if (index < values.length && values[index] !== null) {
      node.right = new TreeNode(values[index]);
      queue.push(node.right);
    }
    index++;
  }

  return root;
}

function testSolution(record) {
  console.log(`input:\troot: ${JSON.stringify(record.root)}`);
  console.log(`expected: ${record.expected}`);

  const solution = new Solution();
  const result = solution.getMinimumDifference(buildTree(record.root));

  console.log(`result: ${result}`);
  console.log(result === record.expected ? Result.PASS : Result.FAIL);
}

const records = [
  new Record([4, 2, 6, 1, 3], 1),
  new Record([1, 0, 48, null, null, 12, 49], 1),
];

records.forEach((record, i) => {
  console.log(`# Test case ${i + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
