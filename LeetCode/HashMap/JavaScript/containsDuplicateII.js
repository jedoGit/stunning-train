// Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

// Example 1:

// Input: nums = [1,2,3,1], k = 3
// Output: true
// Example 2:

// Input: nums = [1,0,1,1], k = 1
// Output: true
// Example 3:

// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false

// Constraints:

// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109
// 0 <= k <= 105

// TC: O(n), worst case is we visit all the elements of nums of size n
// SC: O(k), worst case is we have a hash set of size k, which is the size of the window

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  // Here, we'll use sliding window technique together
  // with a hash set to check if we have duplicates
  let window = new Set();
  let l = 0; // This is our left pointer

  for (let r = 0; r < nums.length; r++) {
    // First, check if we exceed the window length specified by k
    // if so, let's slide the window
    if (r - l > k) {
      // we'll move r and l pointer which means we need to remove
      // nums[l] from the window
      window.delete(nums[l]);
      l++;
    }

    // We check if nums[r] is in the window, if so, we return true
    if (window.has(nums[r])) {
      return true;
    }

    window.add(nums[r]);
  }
  return false;
};
