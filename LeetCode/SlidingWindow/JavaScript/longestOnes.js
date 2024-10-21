// Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

// Example 1:

// Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
// Output: 6
// Explanation: [1,1,1,0,0,1,1,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
// Example 2:

// Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
// Output: 10
// Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

// Constraints:

// 1 <= nums.length <= 105
// nums[i] is either 0 or 1.
// 0 <= k <= nums.length

// TC: O(n), we're looping through the array only one time
// SC: O(1), in place processing

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  let numsLen = nums.length;
  let lp = 0;
  let rp = 0;
  let numZeroCount = 0;
  let longestSubArr = -Infinity;

  // Let's loop through the input array and moving the right pointer until
  // we see zeroes greater than k times. Then at that point, we move the left
  // pointer to the right until the number of zeroes in the window is equal to k.

  while (rp < numsLen) {
    // While we move the right pointer, check if the value is zero and count
    if (nums[rp] === 0) {
      numZeroCount++;
    }

    // At this point, we see that the number of zeroes is greater than k
    // We check if the value pointed by the left pointer is zero, if it is, we decrement the zero count
    // We slide the left pointer to the right and the right pointer will stay the same until
    // the number of zeroes in the window is equal to k.
    while (numZeroCount > k) {
      // If the value leaving the window is zero, then we decrement the count of zeroes
      if (nums[lp] === 0) {
        numZeroCount--;
      }
      // We slide the window until the number of zeroes in the window is equal to k
      lp++;
    }

    // At this point, the number of zeroes in the window is equal to k
    // So, we save the longest Subarray.
    // The formula is: Right pointer - Left Pointer + 1
    longestSubArr = Math.max(longestSubArr, rp - lp + 1);

    // Remember to increment the right pointer only after saving the longest subarray value
    rp++;
  }

  return longestSubArr;
};
