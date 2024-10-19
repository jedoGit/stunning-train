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

// TC: O(n), we loop through once
// SC: O(1), we're doing in-place operation

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // We'll start our pointer at the end of the array
  let numsLen = nums.length - 1;
  let curr = numsLen;

  // We move our curr pointer from end of array to the start of array
  // and we're looking for zeroes
  while (curr > -1) {
    if (nums[curr] === 0) {
      // We move this element all the way to the end of the array
      // by swapping

      let i = curr;

      while (i < numsLen) {
        // we'll use array deconstruction to do the swapping
        [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];

        i++;
      }
      // We want to decrement numsLen because we want to stop the while loop early
      // Remember, we moved the zero to the back of the array
      numsLen--;
    }

    // Move the current pointer to the left
    curr--;
  }
};
