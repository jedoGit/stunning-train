// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

// Example 1:

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
// Example 2:

// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
// Example 3:

// Input: root = [1,2], p = 1, q = 2
// Output: 1

// Constraints:

// The number of nodes in the tree is in the range [2, 105].
// -109 <= Node.val <= 109
// All Node.val are unique.
// p != q
// p and q will exist in the tree.

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

class LowestCommonAncestorRecord {
  constructor(values, p, q, expected) {
    this.values = values;
    this.p = p;
    this.q = q;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n) we're traversing through the nodes in the binary tree
  // SC: O(n) we're traversing and recursing through the nodes in the binary tree
  /**
   * @param {TreeNode} root
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {TreeNode}
   */
  lowestCommonAncestor(root, p, q) {
    // We need to define our exit criteria first
    // We exit the recursion if root is null
    if (!root) return root;

    // We also exit the recursion if we found either p or q nodes
    if (root === p || root === q) return root;

    // The perform recursion to the left first then the right
    // to find the p and q on either side of the binary tree
    let left = this.lowestCommonAncestor(root.left, p, q);
    let right = this.lowestCommonAncestor(root.right, p, q);

    // At this point, we have some results

    // This is the case where we found p and q and they are on opposite sides
    // hence, their ancestor is the root
    if (left && right) {
      return root;
    } else {
      // This is the case where we found either the p or q on one side only. We
      // are not able to find anything on the other side. This means that
      // the LCA is the node that we found, which is the node p or q
      return left || right;
    }
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

// The solution compares nodes by reference, so we need the actual node of the tree
function findNode(root, val) {
  if (!root) return null;

  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    if (node.val === val) return node;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return null;
}

function testSolution(record) {
  const solution = new Solution();
  const root = createTree(record.values);
  const node = solution.lowestCommonAncestor(root, findNode(root, record.p), findNode(root, record.q));
  const result = node ? node.val : null;
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}, p = ${record.p}, q = ${record.q}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LowestCommonAncestorRecord([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1, 3),
  new LowestCommonAncestorRecord([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4, 5),
  new LowestCommonAncestorRecord([1, 2], 1, 2, 1),
  new LowestCommonAncestorRecord([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 4, 2),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
