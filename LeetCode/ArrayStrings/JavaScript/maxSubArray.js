// Given an integer array nums, find the subarray with the largest sum, and return its sum.

// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
// Example 2:

// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
// Example 3:

// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// Constraints:

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

// Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

/**
 * @param {number[]} nums
 * @return {number}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaxSubArrayRecord {
  constructor(nums, expected) {
    this.nums = nums;
    this.expected = expected;
  }
}

class Solution {
  maxSubArray(nums) {
    let sum = 0;
    let max = Number.MIN_SAFE_INTEGER;

    for (let num of nums) {
      sum += num;
      max = Math.max(sum, max);

      if (sum < 0) {
        sum = 0;
      }
    }

    return max;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const nums = [...record.nums];
  const result = solution.maxSubArray(nums);
  const pass = result === record.expected;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MaxSubArrayRecord([-2, 1, -3, 4, -1, 2, 1, -5, 4], 6),
  new MaxSubArrayRecord([1], 1),
  new MaxSubArrayRecord([5, 4, -1, 7, 8], 23),
  new MaxSubArrayRecord([-2, -1], -1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(30));
});
