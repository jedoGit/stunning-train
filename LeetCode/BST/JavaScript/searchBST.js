// You are given the root of a binary search tree (BST) and an integer val.

// Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.

// Example 1:

// Input: root = [4,2,7,1,3], val = 2
// Output: [2,1,3]
// Example 2:

// Input: root = [4,2,7,1,3], val = 5
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [1, 5000].
// 1 <= Node.val <= 107
// root is a binary search tree.
// 1 <= val <= 107

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

class SearchBSTRecord {
  constructor(values, val, expected) {
    this.values = values;
    this.val = val;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @param {number} val
   * @return {TreeNode}
   */
  searchBST1(root, val) {
    // DFS solution
    // Base case. If we're reached the end of the path,
    // we just return null
    if (!root) return root;

    // Check if we found the node we're looking for
    if (val === root.val) {
      return root;
    }

    // For BST, if the value we're looking for is less than the root value,
    // it means it's in the left side. Else, it's in the right side
    if (val < root.val) {
      return this.searchBST1(root.left, val);
    } else if (val > root.val) {
      return this.searchBST1(root.right, val);
    }
  }

  /**
   * @param {TreeNode} root
   * @param {number} val
   * @return {TreeNode}
   */
  searchBST2(root, val) {
    // Using while loop solution
    let temp = root;

    // We'll keep going until root is null
    while (temp) {
      if (val === temp.val) {
        return temp;
      } else if (val < temp.val) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }

    return null;
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

function treeToArray(root) {
  const values = [];

  if (!root) {
    return values;
  }

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node === null) {
      values.push(null);
      continue;
    }

    values.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }

  // Trim the trailing nulls so the shape matches the LeetCode representation
  while (values.length > 0 && values[values.length - 1] === null) {
    values.pop();
  }

  return values;
}

function testSolution(record) {
  const solution = new Solution();
  const result = treeToArray(
    solution.searchBST2(buildTree(record.values), record.val)
  );
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(
    `Input: root = ${JSON.stringify(record.values)}, val = ${record.val}`
  );
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new SearchBSTRecord([4, 2, 7, 1, 3], 2, [2, 1, 3]),
  new SearchBSTRecord([4, 2, 7, 1, 3], 5, []),
  new SearchBSTRecord([4, 2, 7, 1, 3], 4, [4, 2, 7, 1, 3]),
  new SearchBSTRecord([4, 2, 7, 1, 3], 7, [7]),
  new SearchBSTRecord([4, 2, 7, 1, 3], 1, [1]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
