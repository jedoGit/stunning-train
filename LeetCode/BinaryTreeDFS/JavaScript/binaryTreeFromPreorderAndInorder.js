// Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

// Example 1:

// Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
// Output: [3,9,20,null,null,15,7]
// Example 2:

// Input: preorder = [-1], inorder = [-1]
// Output: [-1]

// Constraints:

// 1 <= preorder.length <= 3000
// inorder.length == preorder.length
// -3000 <= preorder[i], inorder[i] <= 3000
// preorder and inorder consist of unique values.
// Each value of inorder also appears in preorder.
// preorder is guaranteed to be the preorder traversal of the tree.
// inorder is guaranteed to be the inorder traversal of the tree.

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

class BuildTreeRecord {
  constructor(preorder, inorder, expected) {
    this.preorder = preorder;
    this.inorder = inorder;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} preorder
   * @param {number[]} inorder
   * @return {TreeNode}
   */
  buildTree(preorder, inorder) {
    if (preorder.length === 0 && inorder.length === 0) return null;

    // in the preorder array, index 0 is always the root
    let root = new TreeNode(preorder[0]);
    // what we want to do here is find the index of the root value in the inorder array. This will point to the root and we can use this to partition the preorder array
    let mid = inorder.indexOf(preorder[0]);
    // for the left child, we call buildTree recursively
    root.left = this.buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    // for the right child, we call buildTree recursively
    root.right = this.buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));

    return root;
  }
}

function treeToArray(root) {
  if (!root) return [];

  const values = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    if (node) {
      values.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      values.push(null);
    }
  }

  // Drop the trailing nulls so the shape matches the LeetCode serialization
  while (values.length && values[values.length - 1] === null) {
    values.pop();
  }

  return values;
}

function testSolution(record) {
  const solution = new Solution();
  const result = treeToArray(solution.buildTree([...record.preorder], [...record.inorder]));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: preorder = ${JSON.stringify(record.preorder)}, inorder = ${JSON.stringify(record.inorder)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new BuildTreeRecord([3, 9, 20, 15, 7], [9, 3, 15, 20, 7], [3, 9, 20, null, null, 15, 7]),
  new BuildTreeRecord([-1], [-1], [-1]),
  new BuildTreeRecord([1, 2], [2, 1], [1, 2]),
  new BuildTreeRecord([1, 2, 3], [2, 1, 3], [1, 2, 3]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
