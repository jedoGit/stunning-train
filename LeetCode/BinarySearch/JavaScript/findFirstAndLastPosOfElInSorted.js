// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:

// Input: nums = [], target = 0
// Output: [-1,-1]

// Constraints:

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums is a non-decreasing array.
// -109 <= target <= 109

// TC: O(logn) due to binary search
// SC: O(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let l = 0;
  let r = nums.length - 1;
  let res = [-1, -1];

  // Using binary search
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);

    // Check if target is less than mid
    // if so, move r pointer to m-1
    // if target is greater than mid, move l pointer to m+1
    // else, target is equal to mid... from there, just move l pointer to the right until it's equal to target or move r pointer to left.
    if (target < nums[m]) {
      r = m - 1;
    } else if (target > nums[m]) {
      l = m + 1;
    } else {
      while (nums[l] !== target) l++;
      while (nums[r] !== target) r--;

      res = [l, r];
      break;
    }
  }

  return res;
};
