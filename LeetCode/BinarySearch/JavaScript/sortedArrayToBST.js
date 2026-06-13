// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

// Example 1:

// Input: nums = [-10,-3,0,5,9]
// Output: [0,-3,9,-10,null,5]
// Explanation: [0,-10,5,null,-3,null,9] is also accepted:

// Example 2:

// Input: nums = [1,3]
// Output: [3,1]
// Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

// Constraints:

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums is sorted in a strictly increasing order.

// TC: O(n), n is length of input array
// SC: O(h), h height BST

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class SortedArrayToBSTRecord {
  constructor(nums, expected) {
    this.nums = nums;
    this.expected = expected;
  }
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val === undefined ? 0 : val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  sortedArrayToBST(nums, l = 0, r = nums.length - 1) {
    if (l > r) return null;

    const mid = Math.floor((r + l) / 2);
    const root = new TreeNode(nums[mid]);

    root.left = this.sortedArrayToBST(nums, l, mid - 1);
    root.right = this.sortedArrayToBST(nums, mid + 1, r);

    return root;
  }
}

function serializeTree(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();

    if (!node) {
      result.push(null);
      continue;
    }

    result.push(node.val);
    queue.push(node.left, node.right);
  }

  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
}

function testSolution(record) {
  const solution = new Solution();
  const result = serializeTree(solution.sortedArrayToBST([...record.nums]));
  const status = JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new SortedArrayToBSTRecord([-10, -3, 0, 5, 9], [0, -10, 5, null, -3, null, 9]),
  new SortedArrayToBSTRecord([1, 3], [1, null, 3]),
  new SortedArrayToBSTRecord([1], [1]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
