// Given an integer array nums, return true if there exists a triple of indices (i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such indices exists, return false.

// Example 1:

// Input: nums = [1,2,3,4,5]
// Output: true
// Explanation: Any triplet where i < j < k is valid.
// Example 2:

// Input: nums = [5,4,3,2,1]
// Output: false
// Explanation: No triplet exists.
// Example 3:

// Input: nums = [2,1,5,0,4,6]
// Output: true
// Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.

// Constraints:

// 1 <= nums.length <= 5 * 105
// -231 <= nums[i] <= 231 - 1

// Follow up: Could you implement a solution that runs in O(n) time complexity and O(1) space complexity?

// TC: O(n), we have 1 loop
// SC: O(1), we're not creating memory

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  // starting with the first element, check if the succeeding elements are larger
  // than the prior one.

  // let's set the values of the previous vars to the max number
  // we will update it later
  let prev1 = Math.Infinity;
  let prev2 = Math.Infinity;

  // Let's loop through the nums array
  for (let i = 0; i < nums.length; i++) {
    // lets first check if the current nums[i] is
    // greater than the prev2 and prev1
    if (nums[i] > prev2 && prev2 > prev1) {
      return true;
    }

    // let's update the values of the prev1 and prev2 variables
    if (nums[i] > prev1) {
      // if nums[i] is greater than the prev1 variable
      // we want to update the prev2 variable
      prev2 = nums[i];
    } else {
      // this means nums[i] is less than prev1
      prev1 = nums[i];
    }
  }

  return false;
};

// TC: O(n), we have 1 loop
// SC: O(1), we're not creating memory

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  // starting with the first element, check if the succeeding elements are larger
  // than the prior one.

  // let's set the values of the previous vars to the max number
  // we will update it later
  let prev1 = Number.MAX_SAFE_INTEGER;
  let prev2 = Number.MAX_SAFE_INTEGER;

  // prev1 < prev2 < num[i]

  // Let's loop through the nums array
  for (let num of nums) {
    // Update prev1
    if (num < prev1) {
      prev1 = num;
    }

    // Update prev2
    if (num > prev1) {
      prev2 = Math.min(num, prev2);
    }

    // Since we've already compared num to prev1 and prev2, if num is greater than prev2
    // we have an increasing triplet
    if (num > prev2) {
      return true;
    }
  }

  return false;
};
