// A peak element is an element that is strictly greater than its neighbors.

// Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

// You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

// You must write an algorithm that runs in O(log n) time.

// Example 1:

// Input: nums = [1,2,3,1]
// Output: 2
// Explanation: 3 is a peak element and your function should return the index number 2.
// Example 2:

// Input: nums = [1,2,1,3,5,6,4]
// Output: 5
// Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.

// Constraints:

// 1 <= nums.length <= 1000
// -231 <= nums[i] <= 231 - 1
// nums[i] != nums[i + 1] for all valid i.

// TC: O(logn) because we're using binary search to find the peak
// SC: O(1) because we're doing in place processing

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  const n = nums.length;

  // For this problem, we only want to find a peak element.
  // It does not matter where it is in the array.
  // We'll do a binary seach and pick the mid point to start searching.
  // Check if the value in the middle is greater than to it's right
  // If so, you move your right pointer to the point to the middle
  // Else, you move your left pointer to move to the right element of the middle pointer

  // Let's do a binary search
  let l = 0;
  let r = n - 1;

  // We stop when l is equal or greater than r
  while (l < r) {
    let m = Math.floor((l + r) / 2);

    // If the number in the middle is greater than to its right,
    // we move the right pointer to point the middle
    if (nums[m] > nums[m + 1]) {
      r = m;
    } else {
      // This is the case when the middle value is lesser than to its right value
      // In this case, we move the left pointer to point to the right of the middle value
      l = m + 1;
    }
  }

  // We return the left pointer
  return l;
};
