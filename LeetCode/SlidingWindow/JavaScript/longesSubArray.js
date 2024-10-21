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

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function (nums) {
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
};
