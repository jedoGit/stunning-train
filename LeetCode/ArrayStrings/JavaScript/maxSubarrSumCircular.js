// Given a circular integer array nums of length n, return the maximum possible sum of a non-empty subarray of nums.

// A circular array means the end of the array connects to the beginning of the array. Formally, the next element of nums[i] is nums[(i + 1) % n] and the previous element of nums[i] is nums[(i - 1 + n) % n].

// A subarray may only include each element of the fixed buffer nums at most once. Formally, for a subarray nums[i], nums[i + 1], ..., nums[j], there does not exist i <= k1, k2 <= j with k1 % n == k2 % n.

// Example 1:

// Input: nums = [1,-2,3,-2]
// Output: 3
// Explanation: Subarray [3] has maximum sum 3.
// Example 2:

// Input: nums = [5,-3,5]
// Output: 10
// Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10.
// Example 3:

// Input: nums = [-3,-2,-3]
// Output: -2
// Explanation: Subarray [-2] has maximum sum -2.

// Constraints:

// n == nums.length
// 1 <= n <= 3 * 104
// -3 * 104 <= nums[i] <= 3 * 104

/**
 * @param {number[]} nums
 * @return {number}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaxSubarraySumCircularRecord {
  constructor(nums, expected) {
    this.nums = nums;
    this.expected = expected;
  }
}

class Solution {
  maxSubarraySumCircular(nums) {
    let globmax = nums[0];
    let globmin = nums[0];
    let curmax = 0;
    let curmin = 0;
    let total = 0;

    for (let n of nums) {
      curmax = Math.max(curmax + n, n);
      curmin = Math.min(curmin + n, n);
      total += n;
      globmax = Math.max(globmax, curmax);
      globmin = Math.min(globmin, curmin);
    }

    return globmax > 0 ? Math.max(globmax, total - globmin) : globmax;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.maxSubarraySumCircular([...record.nums]);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new MaxSubarraySumCircularRecord([1, -2, 3, -2], 3),
  new MaxSubarraySumCircularRecord([5, -3, 5], 10),
  new MaxSubarraySumCircularRecord([-3, -2, -3], -2),
  new MaxSubarraySumCircularRecord([3, -1, 2, -1], 4),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
