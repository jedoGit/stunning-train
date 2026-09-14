// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.

// Example 1:

// Input: root = [5,3,6,2,4,null,7], key = 3
// Output: [5,4,6,2,null,null,7]
// Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
// One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
// Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

// Example 2:

// Input: root = [5,3,6,2,4,null,7], key = 0
// Output: [5,3,6,2,4,null,7]
// Explanation: The tree does not contain a node with value = 0.
// Example 3:

// Input: root = [], key = 0
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -105 <= Node.val <= 105
// Each node has a unique value.
// root is a valid binary search tree.
// -105 <= key <= 105

// Follow up: Could you solve it with time complexity O(height of tree)?

// TC: O(h) we're taking the DFS approach and visit nodes per level of the tree
// SC: O(h) we're taking the DFS approach and visit nodes per level of the tree

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class DeleteNodeRecord {
  constructor(root, key, expected) {
    this.root = root;
    this.key = key;
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
   * @param {number} key
   * @return {TreeNode}
   */
  deleteNode(root, key) {
    if (!root) return root;

    function removeNode(root, key) {
      if (!root) return root;

      if (key < root.val) {
        // In this case, the node to delete will be in the left side of the root
        // recursively go to the left node and find the node to delete
        // then return the new left node
        root.left = removeNode(root.left, key);
      } else if (key > root.val) {
        // In this case, the node to delete will be in the right side of the root
        // recursively to to the right node and find the node to delete
        // then return the new right node
        root.right = removeNode(root.right, key);
      } else {
        // This is the case where we found the node to delete
        // check if this node don't have children, if so, return null.
        // This will be assigned to the children of the root node which are the
        // cases above
        if (!root.left && !root.right) return null;
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        // This is the case where the node we want to delete have both right and left children
        // In this case, we can chose either left or right children.
        // Remember, the characteristic of a BST is the the min value will always be in the left child.
        // We'll chose the right child here and find the node with the minimum value and copy that to the node
        // we want to delete
        root.val = min(root.right);
        // Then we update the right side of the node we want to delete
        root.right = removeNode(root.right, root.val);
      }

      return root;
    }

    function min(root) {
      if (!root.left) return root.val;
      return min(root.left);
    }

    return removeNode(root, key);
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

function serializeTree(root) {
  if (root === null) {
    return [];
  }

  const values = [];
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

  // Drop the trailing nulls so the output matches the LeetCode representation
  while (values.length > 0 && values[values.length - 1] === null) {
    values.pop();
  }

  return values;
}

function testSolution(record) {
  console.log(`input:\troot: ${JSON.stringify(record.root)}, key: ${record.key}`);
  console.log(`expected: ${JSON.stringify(record.expected)}`);

  const solution = new Solution();
  const result = serializeTree(solution.deleteNode(buildTree(record.root), record.key));

  console.log(`result: ${JSON.stringify(result)}`);
  console.log(
    JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL
  );
}

const records = [
  new DeleteNodeRecord([5, 3, 6, 2, 4, null, 7], 3, [5, 4, 6, 2, null, null, 7]),
  new DeleteNodeRecord([5, 3, 6, 2, 4, null, 7], 0, [5, 3, 6, 2, 4, null, 7]),
  new DeleteNodeRecord([], 0, []),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
