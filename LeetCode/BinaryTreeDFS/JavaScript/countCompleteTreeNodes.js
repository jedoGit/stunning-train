// Given the root of a complete binary tree, return the number of the nodes in the tree.

// According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Design an algorithm that runs in less than O(n) time complexity.

// Example 1:

// Input: root = [1,2,3,4,5,6]
// Output: 6
// Example 2:

// Input: root = []
// Output: 0
// Example 3:

// Input: root = [1]
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [0, 5 * 104].
// 0 <= Node.val <= 5 * 104
// The tree is guaranteed to be complete.

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

class CountNodesRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n) we visit every node of the tree
  // SC: O(h) h is height of the tree, for the recursion stack
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  countNodes(root) {
    // Return 0 if it's null
    if (!root) {
      return 0;
    }

    // we'll use a global variable to keep track of the node count
    let nodeCount = 0;

    // helper function to DFS all the nodes
    function dfs(root) {
      // When we hit a null, let's just return
      if (!root) {
        return;
      }

      // We hit a node, let's increment node count
      nodeCount += 1;

      // DFS to the left and right child
      dfs(root.left);
      dfs(root.right);
    }

    // Call the helper function
    dfs(root);

    return nodeCount;
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
  const result = solution.countNodes(createTree(record.values));
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new CountNodesRecord([1, 2, 3, 4, 5, 6], 6),
  new CountNodesRecord([], 0),
  new CountNodesRecord([1], 1),
  new CountNodesRecord([1, 2, 3, 4, 5, 6, 7], 7),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
