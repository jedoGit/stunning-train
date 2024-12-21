// Given an array of positive integers nums and a positive integer target, return the minimal length of a
// subarray
//  whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

// Example 1:

// Input: target = 7, nums = [2,3,1,2,4,3]
// Output: 2
// Explanation: The subarray [4,3] has the minimal length under the problem constraint.
// Example 2:

// Input: target = 4, nums = [1,4,4]
// Output: 1
// Example 3:

// Input: target = 11, nums = [1,1,1,1,1,1,1,1]
// Output: 0

// Constraints:

// 1 <= target <= 109
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 104

// Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).

// TC: O(n), loop through the input only once... we're increasing the window and decreasing it
// SC: O(1) , in place processing

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  // Using Sliding window method...
  // We'll set the l and r pointer to start at 0.
  // Then we move the r pointer and each time,
  // we compute if the total is close to the target value
  // If total is less than target, we don't move the l pointer... we move the r pointer.
  // If total is greater than or equal to the target, we don't move the r pointer, we move the l pointer and at the
  // same time, we subtract the value that left the window.
  // Since we need to find the minimum length of the subarray, we compute the minimun length when
  // the total is greater than or equal to the target

  let l = 0;
  let total = 0;
  let res = Infinity;
  const n = nums.length;

  // We start the sliding window by moving r.,..
  for (let r = 0; r < n; r += 1) {
    // We compute the total every time we move r...
    total += nums[r];
    // We then check if the total is greater or equal to the target
    // If so, we keep on moving the l pointer until it's not
    while (total >= target) {
      // Every time we move the l pointer, we update the resulting minimum length
      // Also, update the total... since we shrunk our window, any element that move out of the window need to be
      // subtracted from the total
      res = Math.min(r - l + 1, res);
      total -= nums[l];
      l += 1;
    }
  }

  return res === Infinity ? 0 : res;
};
