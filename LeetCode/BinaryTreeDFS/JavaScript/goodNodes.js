// Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

// Return the number of good nodes in the binary tree.

// Example 1:

// Input: root = [3,1,4,3,null,1,5]
// Output: 4
// Explanation: Nodes in blue are good.
// Root Node (3) is always a good node.
// Node 4 -> (3,4) is the maximum value in the path starting from the root.
// Node 5 -> (3,4,5) is the maximum value in the path
// Node 3 -> (3,1,3) is the maximum value in the path.
// Example 2:

// Input: root = [3,3,null,4,2]
// Output: 3
// Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.
// Example 3:

// Input: root = [1]
// Output: 1
// Explanation: Root is considered as good.

// Constraints:

// The number of nodes in the binary tree is in the range [1, 10^5].
// Each node's value is between [-10^4, 10^4].

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

class GoodNodesRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n) we're traversing through all the left and right nodes
  // SC: O(n) Everytime we call the DFS, we add a function call in the stack
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  goodNodes1(root) {
    function DFS(root, maxVal) {
      if (!root) return 0;

      // check if the current root val is larger than the previous parent val
      let res = 0;

      if (root.val >= maxVal) {
        res = res + 1;
      }

      // Update the max
      maxVal = Math.max(maxVal, root.val);

      // Call DFS on the left and right nodes
      let left = DFS(root.left, maxVal);
      let right = DFS(root.right, maxVal);

      return res + left + right;
    }

    return DFS(root, root.val);
  }

  /**
   * @param {TreeNode} root
   * @return {number}
   */
  goodNodes2(root) {
    let curMax = -Infinity;
    let count = 0;

    function DFS(root, curMax) {
      if (!root) return;

      // Check first if the root.val is greater than the previous nodes.
      // The children nodes should have larger values than the previous one
      // in order to be a good node.
      if (root.val >= curMax) {
        curMax = Math.max(curMax, root.val);
        count++;
      }

      // Let's DFS to the left and right nodes
      DFS(root.left, curMax);
      DFS(root.right, curMax);
    }

    DFS(root, curMax);

    return count;
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
  const result = solution.goodNodes2(createTree(record.values));
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new GoodNodesRecord([3, 1, 4, 3, null, 1, 5], 4),
  new GoodNodesRecord([3, 3, null, 4, 2], 3),
  new GoodNodesRecord([1], 1),
  new GoodNodesRecord([1, 2, 3], 3),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
