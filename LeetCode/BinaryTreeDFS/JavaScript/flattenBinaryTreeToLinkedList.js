// Given the root of a binary tree, flatten the tree into a "linked list":

// The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
// The "linked list" should be in the same order as a pre-order traversal of the binary tree.

// Example 1:

// Input: root = [1,2,5,3,4,null,6]
// Output: [1,null,2,null,3,null,4,null,5,null,6]
// Example 2:

// Input: root = []
// Output: []
// Example 3:

// Input: root = [0]
// Output: [0]

// Constraints:

// The number of nodes in the tree is in the range [0, 2000].
// -100 <= Node.val <= 100

// TC: O(n), we visit all the nodes
// SC: O(h), h is height of the tree and worst case could be equal to n

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val === undefined ? 0 : val;
    this.left = left;
    this.right = right;
  }
}

class Record {
  constructor(root, expected) {
    this.root = root;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {void} Do not return anything, modify root in-place instead.
   */
  flatten(root) {
    if (!root) return root;

    // Using a helper function
    function DFS(root) {
      if (!root) return root;

      // The order is necessary. We need to DFS on the left child first. Then DFS on the right child
      let leftTail = DFS(root.left);
      let rightTail = DFS(root.right);

      // Each time we DFS, we check for the left child
      // We need to connect the right child of the root, to the left tail
      // Then, assight the left child to the right child
      // Lastly, set left child to null
      if (root.left) {
        leftTail.right = root.right;
        root.right = root.left;
        root.left = null;
      }

      // Use boolean and it needs to be in this order. JS process OR statements left to right
      let last = rightTail || leftTail || root;

      return last;
    }

    // Call the DFS helper function and provide the root
    DFS(root);
  }
}

const buildTree = (values) => {
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
    index += 1;

    if (index < values.length && values[index] !== null && values[index] !== undefined) {
      node.right = new TreeNode(values[index]);
      queue.push(node.right);
    }
    index += 1;
  }

  return root;
};

const serializeFlattenedTree = (root) => {
  const values = [];
  let node = root;

  while (node) {
    values.push(node.val);

    if (node.left) {
      values.push("LEFT_CHILD_NOT_NULL");
      break;
    }

    node = node.right;
  }

  return values;
};

const testSolution = (record) => {
  const solution = new Solution();
  const root = buildTree(record.root);

  solution.flatten(root);
  const result = serializeFlattenedTree(root);
  const status = JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`Input: root = ${JSON.stringify(record.root)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
};

const records = [
  new Record([1, 2, 5, 3, 4, null, 6], [1, 2, 3, 4, 5, 6]),
  new Record([], []),
  new Record([0], [0]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
