// Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

// Example 1:

// Input: root = [1,2,2,3,4,4,3]
// Output: true
// Example 2:

// Input: root = [1,2,2,null,3,null,3]
// Output: false

// Constraints:

// The number of nodes in the tree is in the range [1, 1000].
// -100 <= Node.val <= 100

// Follow up: Could you solve it both recursively and iteratively?

// TC: O(n) where n is the number of nodes. We'll visit all of them
// SC: O(h) where h is the height of the tree.

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

class SymmetricTreeRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {boolean}
   */
  isSymmetric(root) {
    if (!root) {
      return true;
    }

    // Using Iterative BFS
    let queue = [];

    // Using queue for BFS. We're pushing a pair in the queue
    queue.push([root.left, root.right]);

    // process the pair in the queue
    while (queue.length) {
      //  Save the queue lenght here
      let qLen = queue.length;

      // process the nodes on the current level
      for (let i = 0; i < qLen; i += 1) {
        let [nodeL, nodeR] = queue.shift(); // read from the left of the queue

        if (!nodeL && !nodeR) {
          continue;
        } else if (!nodeL || !nodeR) {
          return false;
        } else if (nodeL.val !== nodeR.val) {
          return false;
        } else {
          // Add the outer and inner nodes to the queue
          queue.push([nodeL.left, nodeR.right]);
          queue.push([nodeL.right, nodeR.left]);
        }
      }
    }

    return true;
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
  const result = solution.isSymmetric(createTree(record.values));
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new SymmetricTreeRecord([1, 2, 2, 3, 4, 4, 3], true),
  new SymmetricTreeRecord([1, 2, 2, null, 3, null, 3], false),
  // A single node tree is always symmetric
  new SymmetricTreeRecord([1], true),
  // An empty tree is symmetric
  new SymmetricTreeRecord([], true),
  // Mirrored structure with the inner children only
  new SymmetricTreeRecord([1, 2, 2, null, 3, 3], true),
  // Same structure but the values are not mirrored
  new SymmetricTreeRecord([1, 2, 3], false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
