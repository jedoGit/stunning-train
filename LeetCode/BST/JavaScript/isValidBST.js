// Given the root of a binary tree, determine if it is a valid binary search tree (BST).

// A valid BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.

// Example 1:

// Input: root = [2,1,3]
// Output: true
// Example 2:

// Input: root = [5,1,4,null,null,3,6]
// Output: false
// Explanation: The root node's value is 5 but its right child's value is 4.

// Constraints:

// The number of nodes in the tree is in the range [1, 104].
// -231 <= Node.val <= 231 - 1

// TC: O(n)
// SC: O(h), height of tree

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class IsValidBSTRecord {
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
   * @return {boolean}
   */
  isValidBST(root) {
    function dfs(node, left, right) {
      if (!node) {
        return true;
      }

      if (!(node.val < right && node.val > left)) {
        return false;
      }

      return dfs(node.left, left, node.val) && dfs(node.right, node.val, right);
    }

    return dfs(
      root,
      parseFloat(Number.NEGATIVE_INFINITY),
      parseFloat(Number.POSITIVE_INFINITY)
    );
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
  const result = solution.isValidBST(buildTree(record.root));

  console.log(`result: ${result}`);
  console.log(result === record.expected ? Result.PASS : Result.FAIL);
}

const records = [
  new IsValidBSTRecord([2, 1, 3], true),
  new IsValidBSTRecord([5, 1, 4, null, null, 3, 6], false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
