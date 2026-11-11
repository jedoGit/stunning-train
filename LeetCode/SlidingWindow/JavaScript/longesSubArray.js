// Given a binary array nums, you should delete one element from it.

// Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.

// Example 1:

// Input: nums = [1,1,0,1]
// Output: 3
// Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
// Example 2:

// Input: nums = [0,1,1,1,0,1,1,0,1]
// Output: 5
// Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
// Example 3:

// Input: nums = [1,1,1]
// Output: 2
// Explanation: You must delete one element.

// Constraints:

// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.

// TC: O(n), we're looping through the array only one time
// SC: O(1), in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class LongestSubarrayRecord {
  constructor(nums, expected) {
    this.nums = nums;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  longestSubarray(nums) {
    const maxZeroRequired = 1;
    let numsLen = nums.length;
    let rp = 0;
    let lp = 0;
    let zeroCount = 0;
    let currLen = 0;
    let maxLen = -Infinity;

    while (rp < numsLen) {
      // We start sliding the right pointer and count all the zeroes we see
      if (nums[rp] === 0) {
        zeroCount++;
      }

      // At this point, we counted zeroes greater than 1 inside our window.
      // So, we want to slide the left pointer to the right until there
      // is only one zero inside the window
      while (zeroCount > maxZeroRequired) {
        if (nums[lp] === 0) {
          zeroCount--;
        }
        lp++;
      }

      // In this window, there should only be one 0
      // So, our current length can be calculated as right pointer - left pointer.
      // Since we're zero based index, this works.
      currLen = rp - lp;

      // Save the max length
      maxLen = Math.max(maxLen, currLen);

      // Slide the right pointer
      rp++;
    }

    return maxLen;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.longestSubarray(record.nums);
  const pass = result === record.expected;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new LongestSubarrayRecord([1, 1, 0, 1], 3),
  new LongestSubarrayRecord([0, 1, 1, 1, 0, 1, 1, 0, 1], 5),
  new LongestSubarrayRecord([1, 1, 1], 2),
  new LongestSubarrayRecord([0, 0, 0], 0),
  new LongestSubarrayRecord([1], 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
