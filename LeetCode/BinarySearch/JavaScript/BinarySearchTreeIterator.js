// Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):

// BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
// boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
// int next() Moves the pointer to the right, then returns the number at the pointer.
// Notice that by initializing the pointer to a non-existent smallest number, the first call to next() will return the smallest element in the BST.

// You may assume that next() calls will always be valid. That is, there will be at least a next number in the in-order traversal when next() is called.

// Example 1:

// Input
// ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
// [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
// Output
// [null, 3, 7, true, 9, true, 15, true, 20, false]

// Explanation
// BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
// bSTIterator.next();    // return 3
// bSTIterator.next();    // return 7
// bSTIterator.hasNext(); // return True
// bSTIterator.next();    // return 9
// bSTIterator.hasNext(); // return True
// bSTIterator.next();    // return 15
// bSTIterator.hasNext(); // return True
// bSTIterator.next();    // return 20
// bSTIterator.hasNext(); // return False

// Constraints:

// The number of nodes in the tree is in the range [1, 105].
// 0 <= Node.val <= 106
// At most 105 calls will be made to hasNext, and next.

// Follow up:

// Could you implement next() and hasNext() to run in average O(1) time and use O(h) memory, where h is the height of the tree?

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

class BSTIterator {
  constructor(root) {
    // We'll be using a stack
    this.stack = [];

    // We'll add only the root and the left child to the stack
    // This is iterative DFS until there's no more left child
    // This is due to the in-order traversal constraint
    let cur = root;
    while (cur) {
      this.stack.push(cur);
      cur = cur.left;
    }
  }

  /**
   * @return {number}
   */
  next() {
    let res = this.stack.pop();
    // Once we pop the node added to the stack,
    // we'll need to check if that node has a right child
    // if it does, add the left child by iterative DFS'ing it
    let cur = res.right;
    while (cur) {
      this.stack.push(cur);
      cur = cur.left;
    }

    // return the value of the node we just popped.
    return res.val;
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    return this.stack.length !== 0;
  }
}

class BinarySearchTreeIteratorRecord {
  constructor(root, operations, expected) {
    this.root = root;
    this.operations = operations;
    this.expected = expected;
  }
}

class Solution {
  bstIterator(root, operations) {
    const iterator = new BSTIterator(root);
    return operations.map((operation) => iterator[operation]());
  }
}

function buildTree(values) {
  if (!values.length || values[0] === null) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue = [root];
  let index = 1;

  while (queue.length && index < values.length) {
    const node = queue.shift();

    if (values[index] !== null && values[index] !== undefined) {
      node.left = new TreeNode(values[index]);
      queue.push(node.left);
    }
    index += 1;

    if (index < values.length && values[index] !== null && values[index] !== undefined) {
      node.right = new TreeNode(values[index]);
      queue.push(node.right);
    }
    index += 1;
  }

  return root;
}

function testSolution(record) {
  const solution = new Solution();
  const root = buildTree(record.root);
  const result = solution.bstIterator(root, record.operations);
  const status = JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`Input: root = ${JSON.stringify(record.root)}, operations = ${JSON.stringify(record.operations)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new BinarySearchTreeIteratorRecord(
    [7, 3, 15, null, null, 9, 20],
    ["next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"],
    [3, 7, true, 9, true, 15, true, 20, false],
  ),
  new BinarySearchTreeIteratorRecord(
    [3, 1, 4, null, 2],
    ["next", "next", "next", "hasNext", "next", "hasNext"],
    [1, 2, 3, true, 4, false],
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
