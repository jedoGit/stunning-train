// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// Example 1:

// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]
// Example 2:

// Input: root = [1,null,3]
// Output: [1,3]
// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

// TC: O(n) We're looping through the levels of the binary tree and inspecting the nodes
// SC: O(n) While we're looping through the levels of the binary tree, we're adding the nodes to a queue for processing

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

class RightSideViewRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {TreeNode} root
   * @return {number[]}
   */
  rightSideView(root) {
    let result = [];
    let queue = [];

    if (!root) return [];

    queue.push(root);

    while (queue.length) {
      // We want to to alway grab the last element in the queue
      // The last element in the queue is the rightmost node
      let qLen = queue.length;
      let node = queue[qLen - 1];

      // Add the rightmost node value to our result array
      result.push(node.val);

      // We need to process the nodes we added from the previous iteration
      // Also during this step, we add the children of those nodes to the queue
      while (qLen) {
        // We shift() the value in front of the queue and
        // add its children to the back of the queue
        let curNode = queue.shift();
        if (curNode.left) queue.push(curNode.left);
        if (curNode.right) queue.push(curNode.right);

        // We only want to remove the nodes we added from the last iteration
        qLen--;
      }
    }

    return result;
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
  const result = solution.rightSideView(createTree(record.values));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new RightSideViewRecord([1, 2, 3, null, 5, null, 4], [1, 3, 4]),
  new RightSideViewRecord([1, null, 3], [1, 3]),
  new RightSideViewRecord([], []),
  // The deepest visible node can come from a left subtree
  new RightSideViewRecord([1, 2, 3, 4], [1, 3, 4]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
