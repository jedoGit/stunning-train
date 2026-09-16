// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

// Example 1:

// Input: root = [3,1,4,null,2], k = 1
// Output: 1
// Example 2:

// Input: root = [5,3,6,2,4,null,null,1], k = 3
// Output: 3

// Constraints:

// The number of nodes in the tree is n.
// 1 <= k <= n <= 104
// 0 <= Node.val <= 104

// Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

// TC: O(n)
// SC: O(h), h is height of the tree

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class KthSmallestRecord {
  constructor(root, k, expected) {
    this.root = root;
    this.k = k;
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
   * @param {number} k
   * @return {number}
   */
  kthSmallest(root, k) {
    let n = 0;
    let s = [];
    let cur = root;

    while (cur !== null || s.length > 0) {
      while (cur !== null) {
        s.push(cur);
        cur = cur.left;
      }

      cur = s.pop();
      n += 1;

      if (n === k) {
        return cur.val;
      }
      cur = cur.right;
    }
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
  console.log(`input:\troot: ${JSON.stringify(record.root)}, k: ${record.k}`);
  console.log(`expected: ${record.expected}`);

  const solution = new Solution();
  const result = solution.kthSmallest(buildTree(record.root), record.k);

  console.log(`result: ${result}`);
  console.log(result === record.expected ? Result.PASS : Result.FAIL);
}

const records = [
  new KthSmallestRecord([3, 1, 4, null, 2], 1, 1),
  new KthSmallestRecord([5, 3, 6, 2, 4, null, null, 1], 3, 3),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
