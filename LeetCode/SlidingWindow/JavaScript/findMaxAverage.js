// You are given an integer array nums consisting of n elements, and an integer k.

// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

// Example 1:

// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
// Example 2:

// Input: nums = [5], k = 1
// Output: 5.00000

// Constraints:

// n == nums.length
// 1 <= k <= n <= 105
// -104 <= nums[i] <= 104

// TC: O(n), one pass of the array
// SC: O(1) in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class FindMaxAverageRecord {
  constructor(nums, k, expected) {
    this.nums = nums;
    this.k = k;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number}
   */
  findMaxAverage(nums, k) {
    // We'll use sliding window to solve this
    // We'll need to pointers to form the sliding window
    let rp = 0;
    let lp = 0;
    let winSum = 0;
    let maxSum = -Infinity;

    // Let's compute the cummulative sum of the first k elements
    // We'll move the rp pointer to compute the sum
    while (rp < k) {
      winSum = winSum + nums[rp];
      rp++;
    }

    // After we calculate the window sum of the first k elements
    // We update the max sum
    maxSum = winSum;

    // At this point, rp has a value of k
    // We'll do the sliding window algo here
    // If you do a bruteforce calculation, you'll find out that the formula is:
    // Sum = Sum - element pointed by left pointer + element pointed by right pointer
    // Initially, sum = sum - nums[0] + nums[k]
    // Then, sum = sum - nums[1] + nums[k+1]
    while (rp < nums.length) {
      winSum = winSum - nums[lp] + nums[rp];

      // Keep track of the max sum every time we move the window
      maxSum = Math.max(maxSum, winSum);

      // Move the pointers
      lp++;
      rp++;
    }

    return maxSum / k;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.findMaxAverage(record.nums, record.k);
  const status = Math.abs(result - record.expected) < 1e-5 ? Result.PASS : Result.FAIL;

  console.log(`input: nums: ${JSON.stringify(record.nums)}, k: ${record.k}`);
  console.log(`expected: ${record.expected}`);
  console.log(`result: ${result}`);
  console.log(status);
}

const records = [
  new FindMaxAverageRecord([1, 12, -5, -6, 50, 3], 4, 12.75),
  new FindMaxAverageRecord([5], 1, 5),
  new FindMaxAverageRecord([-1], 1, -1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
