// Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

// Example 1:

// Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
// Output: [3,9,20,null,null,15,7]
// Example 2:

// Input: inorder = [-1], postorder = [-1]
// Output: [-1]

// Constraints:

// 1 <= inorder.length <= 3000
// postorder.length == inorder.length
// -3000 <= inorder[i], postorder[i] <= 3000
// inorder and postorder consist of unique values.
// Each value of postorder also appears in inorder.
// inorder is guaranteed to be the inorder traversal of the tree.
// postorder is guaranteed to be the postorder traversal of the tree.

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
  constructor(inorder, postorder, expected) {
    this.inorder = inorder;
    this.postorder = postorder;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n), we build the index map once and we visit every node once
  // SC: O(n), for the index map plus the recursion stack
  /**
   * @param {number[]} inorder
   * @param {number[]} postorder
   * @return {TreeNode}
   */
  buildTree(inorder, postorder) {
    // get the indices of each element of inorder array and convert to object
    // Key is the element and return the index
    let inorderIdx = inorder.reduce((obj, v, i) => {
      if (!obj[v]) {
        obj[v] = 0;
      }
      obj[v] = i;
      return obj;
    }, {});

    // console.log(inorderIdx)

    // helper function to call recursively
    function helper(l, r) {
      // base case
      if (l > r) {
        return null;
      }

      // the root is always at the end of a post order tree
      let root = new TreeNode(postorder.pop());

      // let's get the index of the root from the inorder array
      let idx = inorderIdx[root.val.toString()];

      // Assign the children
      root.right = helper(idx + 1, r);
      root.left = helper(l, idx - 1);

      return root;
    }

    return helper(0, inorder.length - 1);
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
  // The algorithm consumes postorder with pop(), so hand it a copy
  const result = treeToArray(solution.buildTree([...record.inorder], [...record.postorder]));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: inorder = ${JSON.stringify(record.inorder)}, postorder = ${JSON.stringify(record.postorder)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new BuildTreeRecord([9, 3, 15, 20, 7], [9, 15, 7, 20, 3], [3, 9, 20, null, null, 15, 7]),
  new BuildTreeRecord([-1], [-1], [-1]),
  new BuildTreeRecord([2, 1], [2, 1], [1, 2]),
  new BuildTreeRecord([2, 1, 3], [2, 3, 1], [1, 2, 3]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
