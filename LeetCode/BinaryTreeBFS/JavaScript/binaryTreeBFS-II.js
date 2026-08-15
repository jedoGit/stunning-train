// Given a binary tree

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

// Initially, all next pointers are set to NULL.

// Example 1:

// Input: root = [1,2,3,4,5,null,7]
// Output: [1,#,2,3,#,4,5,7,#]
// Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
// Example 2:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 6000].
// -100 <= Node.val <= 100

// Follow-up:

// You may only use constant extra space.
// The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class _Node {
  constructor(val, left, right, next) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

class ConnectRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {_Node} root
   * @return {_Node}
   */
  connect(root) {
    if (!root) return root;

    // Using BFS
    let queue = [];

    queue.push(root);

    while (queue.length !== 0) {
      let pre = null;
      let qLen = queue.length;
      while (qLen !== 0) {
        let cur = queue.shift();

        if (pre) {
          pre.next = cur;
        }

        if (cur && cur.left) {
          queue.push(cur.left);
        }
        if (cur && cur.right) {
          queue.push(cur.right);
        }

        pre = cur;
        // Don't forget to decrement qLen!
        qLen -= 1;
      }
    }

    return root;
  }
}

function createTree(values) {
  if (!values.length || values[0] === null) return null;

  const root = new _Node(values[0]);
  const queue = [root];
  let index = 1;

  while (queue.length && index < values.length) {
    const node = queue.shift();

    if (values[index] !== null && values[index] !== undefined) {
      node.left = new _Node(values[index]);
      queue.push(node.left);
    }
    index++;

    if (index < values.length && values[index] !== null && values[index] !== undefined) {
      node.right = new _Node(values[index]);
      queue.push(node.right);
    }
    index++;
  }

  return root;
}

// Serialize in level order as connected by the next pointers,
// with '#' signifying the end of each level.
function serializeByNext(root) {
  const output = [];
  let levelStart = root;

  while (levelStart) {
    let node = levelStart;
    let nextStart = null;

    while (node) {
      output.push(node.val);
      if (!nextStart) nextStart = node.left || node.right;
      node = node.next;
    }

    output.push("#");
    levelStart = nextStart;
  }

  return output;
}

function testSolution(record) {
  const solution = new Solution();
  const result = serializeByNext(solution.connect(createTree(record.values)));
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: [${record.expected.join(",")}]`);
  console.log(`Result: [${result.join(",")}]`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new ConnectRecord([1, 2, 3, 4, 5, null, 7], [1, "#", 2, 3, "#", 4, 5, 7, "#"]),
  new ConnectRecord([], []),
  new ConnectRecord([1], [1, "#"]),
  new ConnectRecord([1, 2, 3], [1, "#", 2, 3, "#"]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
