// Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

// For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

// Two binary trees are considered leaf-similar if their leaf value sequence is the same.

// Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

// Example 1:

// Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
// Output: true
// Example 2:

// Input: root1 = [1,2,3], root2 = [1,3,2]
// Output: false

// Constraints:

// The number of nodes in each tree will be in the range [1, 200].
// Both of the given trees will have values in the range [0, 200].

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

class LeafSimilarRecord {
  constructor(values1, values2, expected) {
    this.values1 = values1;
    this.values2 = values2;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n) because we're traversing the each nodes of the 2 trees
  // SC: O(n) we're adding a function call to the stack every time we visit a node of the 2 trees
  /**
   * @param {TreeNode} root1
   * @param {TreeNode} root2
   * @return {boolean}
   */
  leafSimilar(root1, root2) {
    let result1 = 0;
    let result2 = 0;

    // Create the DFS inline function
    function DFS(node, leafs) {
      if (!node) return null;

      // We'll use Pre Order DFS
      // If this the the leaf, save the value to the leaf array
      // It is the leaf if both left and right pointers are null
      if (!node.left && !node.right) {
        leafs.push(node.val);
      }

      // Now, we need to visit the left and right nodes
      DFS(node.left, leafs);
      DFS(node.right, leafs);

      // Once we reached the leaf node, we return the array
      // We'll return it as a string array
      // console.log(leafs.join())
      return leafs.join();
    }

    // Call the DFS on root1 and root2
    result1 = DFS(root1, []);
    result2 = DFS(root2, []);

    // Compare the returned string array
    if (result1 === result2) {
      return true;
    }

    return false;
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
  const result = solution.leafSimilar(createTree(record.values1), createTree(record.values2));
  const pass = result === record.expected;

  console.log(`Input: root1 = ${JSON.stringify(record.values1)}, root2 = ${JSON.stringify(record.values2)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LeafSimilarRecord(
    [3, 5, 1, 6, 2, 9, 8, null, null, 7, 4],
    [3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8],
    true
  ),
  new LeafSimilarRecord([1, 2, 3], [1, 3, 2], false),
  new LeafSimilarRecord([1, 2], [1, null, 2], true),
  new LeafSimilarRecord([1], [2], false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
