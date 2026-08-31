// Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

// The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

// Example 1:

// Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
// Output: 3
// Explanation: The paths that sum to 8 are shown.
// Example 2:

// Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// Output: 3

// Constraints:

// The number of nodes in the tree is in the range [0, 1000].
// -109 <= Node.val <= 109
// -1000 <= targetSum <= 1000

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

class PathSumRecord {
  constructor(values, targetSum, expected) {
    this.values = values;
    this.targetSum = targetSum;
    this.expected = expected;
  }
}

class Solution {
  // TC: O(n) we're traversing through all the left and right nodes
  // SC: O(n) Everytime we call the DFS, we add a function call in the stack
  /**
   * @param {TreeNode} root
   * @param {number} targetSum
   * @return {number}
   */
  pathSum(root, targetSum) {
    let result = 0;
    let prevNums = [];

    function DFS(root, prevNums) {
      if (!root) return;

      // We add the root.val to the stack every time we enter a node
      prevNums.push(root.val);
      //console.log(prevNums)

      // We DFS left and right and visit all the nodes first.
      // We pass the new list of prevNums every time we visit a new node.
      DFS(root.left, prevNums);
      DFS(root.right, prevNums);

      // After we visited all the nodes and we are on the end of the path,
      // we calculate the sum and check if we see the target sum.
      let curSum = 0;
      for (let i = prevNums.length - 1; i > -1; i--) {
        curSum += prevNums[i];

        if (curSum === targetSum) {
          result++;
        }
      }

      // Now, its time to exit the current node.
      // We pop the root.val from the stack everytime we leave a node.
      prevNums.pop();
      //console.log(prevNums)
    }

    DFS(root, prevNums);

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
  const result = solution.pathSum(createTree(record.values), record.targetSum);
  const pass = result === record.expected;

  console.log(`Input: root = ${JSON.stringify(record.values)}, targetSum = ${record.targetSum}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new PathSumRecord([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8, 3),
  new PathSumRecord([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22, 3),
  new PathSumRecord([], 0, 0),
  new PathSumRecord([1, null, 2, null, 3], 3, 2),
  new PathSumRecord([1, -1], 0, 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
