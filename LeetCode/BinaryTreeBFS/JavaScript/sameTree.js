// Given the roots of two binary trees p and q, write a function to check if they are the same or not.

// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// Example 1:

// Input: p = [1,2,3], q = [1,2,3]
// Output: true
// Example 2:

// Input: p = [1,2], q = [1,null,2]
// Output: false
// Example 3:

// Input: p = [1,2,1], q = [1,1,2]
// Output: false

// Constraints:

// The number of nodes in both trees is in the range [0, 100].
// -104 <= Node.val <= 104

// TC: O(max(p,q)) We process the left and right children of each nodes starting from the root. We have 2 roots.
// SC: O(max number of nodes on a level of either p or q). We add each children node to a queue for processing as a pair.

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

class SameTreeRecord {
  constructor(pValues, qValues, expected) {
    this.pValues = pValues;
    this.qValues = qValues;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} p
   * @param {TreeNode} q
   * @return {boolean}
   */
  isSameTree(p, q) {
    // Using BFS approach first
    // Since JS do not have an XOR conditional operator, we have to create our own
    // XOR Truth table
    //      0  1
    //     ------
    //  0 | 0  1
    //  1 | 1  0
    //
    const xor = (a, b) => Boolean(!a ^ !b);

    // Let's handle the edge case, return false if only either p or q is null
    if (xor(p, q)) {
      return false;
    }

    // If both roots are null, then they're the same
    if (!p && !q) {
      return true;
    }

    // We can use BFS or DFS and visit each nodes starting at the two roots.
    // Using BFS
    let queue = []; // we can push both roots on the queue as a pair

    queue.push([p, q]); // [remember that the order of the pair is p then q]

    while (queue.length) {
      // Let's save a copy of the q length
      let qLen = queue.length;

      for (let i = 0; i < qLen; i += 1) {
        // Pop left from the queue
        let [nodeP, nodeQ] = queue.shift();

        // At this point, we're guaranteed that both nodes are non null, so, we check if the values are equal
        if (nodeP.val !== nodeQ.val) {
          return false;
        }

        // Check if the children nodes are present. We return false if either the p or q child is null
        if (xor(nodeP.left, nodeQ.left)) {
          return false;
        }
        if (xor(nodeP.right, nodeQ.right)) {
          return false;
        }

        // At this point, the children nodes are both non-null or null, we add it to the queue if they're non-null
        if (nodeP.left && nodeQ.left) queue.push([nodeP.left, nodeQ.left]);
        if (nodeP.right && nodeQ.right) queue.push([nodeP.right, nodeQ.right]);
      }
    }

    return true;
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
  const result = solution.isSameTree(createTree(record.pValues), createTree(record.qValues));
  const pass = result === record.expected;

  console.log(`Input: p = ${JSON.stringify(record.pValues)}, q = ${JSON.stringify(record.qValues)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new SameTreeRecord([1, 2, 3], [1, 2, 3], true),
  new SameTreeRecord([1, 2], [1, null, 2], false),
  new SameTreeRecord([1, 2, 1], [1, 1, 2], false),
  // Both trees are empty, so they are the same
  new SameTreeRecord([], [], true),
  // Only one of the trees is empty
  new SameTreeRecord([1], [], false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
