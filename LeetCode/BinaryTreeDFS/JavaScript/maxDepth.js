// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: 3
// Example 2:

// Input: root = [1,null,2]
// Output: 2

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

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

class MaxDepthRecord {
  constructor(values, expected) {
    this.values = values;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n), we're traversing the depth of the the Binary tree
  // SC: O(n), we're adding a function call to the stack everytime we visit a node of the binary tree
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  maxDepth1(root) {
    // We'll use Post Order DFS (Recursive)

    // First check if root is null
    if (!root) return 0;

    // For post order, we visit the nodes first then we
    // perform some action
    let left = 0;
    let right = 0;

    if (root.left) {
      left = this.maxDepth1(root.left);
    }

    if (root.right) {
      right = this.maxDepth1(root.right);
    }

    let maxVal = Math.max(left, right);

    // Everytime we exit a node, we increment the value returned by 1
    return maxVal + 1;
  }

  /**
   * @param {TreeNode} root
   * @return {number}
   */
  maxDepth2(root) {
    // Using iterative BFS approach
    // Base case
    if (!root) {
      return 0;
    }

    // Using queue for BFS
    let level = 0;
    let q = [];
    q.push(root); // push the root to the queue

    // let's process our queue while the queue is not empty
    while (q.length) {
      // We'll need a snapshot of the current queue as this represents the current level we're processing for BFS
      let qSize = q.length;
      // Let's only process the nodes in the current level. We do this by iterating only up to the current queue size
      for (let i = 0; i < qSize; i++) {
        let node = q.shift(); // pop the node from the front... in JS this is the shift method of the array
        // Add the childrent node to the queue if they're not null
        if (node.left) {
          q.push(node.left);
        }
        if (node.right) {
          q.push(node.right);
        }
      }
      // After processing all the nodes in the current level, we need to increment our level counter before we move on to the next level.
      level += 1;
    }

    return level;
  }

  /**
   * @param {TreeNode} root
   * @return {number}
   */
  maxDepth3(root) {
    // Using Iterative DFS
    // Using stack
    let stack = [];
    let level = 0;

    // Push the root and the depth to the stack as a pair.
    // The initial depth is 1
    stack.push([root, 1]);

    while (stack.length) {
      // First thing to do is pop the stack.
      // Remember we pushed a pair to the stack
      // The first element is node and the 2nd element is the depth
      let [node, dep] = stack.pop();

      // Now, let's add the children to the stack if it's not null
      if (node) {
        level = Math.max(level, dep); // each time we pop the stack, update the level variable
        stack.push([node.left, dep + 1]);
        stack.push([node.right, dep + 1]);
      }
    }

    return level;
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
  const result = solution.maxDepth3(createTree(record.values));
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MaxDepthRecord([3, 9, 20, null, null, 15, 7], 3),
  new MaxDepthRecord([1, null, 2], 2),
  new MaxDepthRecord([], 0),
  new MaxDepthRecord([1], 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
