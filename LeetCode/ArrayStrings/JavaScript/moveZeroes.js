// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note that you must do this in-place without making a copy of the array.

// Example 1:

// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Example 2:

// Input: nums = [0]
// Output: [0]

// Constraints:

// 1 <= nums.length <= 104
// -231 <= nums[i] <= 231 - 1

// Follow up: Could you minimize the total number of operations done?

// TC: O(n), we loop through once
// SC: O(1), we're doing in-place operation

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let j = nums.length;

  // We use javascript methods:
  // If we see zeroes, we push a zero then we remove the zero by using splice
  // We start checking from the last element.

  while (j > -1) {
    if (nums[j] === 0) {
      nums.push(0); // we add zero first before we splice
      nums.splice(j, 1); // This is removing 1 element starting at index j
    }
    j--;
  }
};
