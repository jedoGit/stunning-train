// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

 // Example 1:

// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
// Example 2:

// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]
 
// Constraints:

// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 
// Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

// TC: O(n), We have 3 for loops
// SC: O(1), we're not creating new memory
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const n = nums.length;
  const left = new Array(n).fill(1);
  const right = new Array(n).fill(1);

  // first loop is to compute all the product of the elements to the left of what's the current index.
  // we start in index 1
  for (let i = 1; i < nums.length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  // second loop is to compute all the product of the elements to the right of what's the current index.
  // we start in index nums.length - 2, this is the second to the last element
  for (let j = nums.length - 2; j > -1; j--) {
    right[j] = right[j + 1] * nums[j + 1];
  }

  const retVal = [];
  // the last loop it to multiply the left and right arrays element by element
  for (k = 0; k < nums.length; k++) {
    retVal[k] = left[k] * right[k];
  }

  return retVal;
};
