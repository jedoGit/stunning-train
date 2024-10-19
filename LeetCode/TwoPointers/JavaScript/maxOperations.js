// You are given an integer array nums and an integer k.

// In one operation, you can pick two numbers from the array whose sum equals k and remove them from the array.

// Return the maximum number of operations you can perform on the array.

// Example 1:

// Input: nums = [1,2,3,4], k = 5
// Output: 2
// Explanation: Starting with nums = [1,2,3,4]:
// - Remove numbers 1 and 4, then nums = [2,3]
// - Remove numbers 2 and 3, then nums = []
// There are no more pairs that sum up to 5, hence a total of 2 operations.
// Example 2:

// Input: nums = [3,1,3,4,3], k = 6
// Output: 1
// Explanation: Starting with nums = [3,1,3,4,3]:
// - Remove the first two 3's, then nums = [1,4,3]
// There are no more pairs that sum up to 6, hence a total of 1 operation.

// Constraints:

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 1 <= k <= 109

// TC: O(n) because we have to sort it first then we loop through once
// SC: O(1) we're doing in place operations

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  let numsLen = nums.length - 1;
  let lp = 0;
  let rp = numsLen;
  let count = 0;

  // If using 2 pointers, we need to sort the array first
  // By default, js sort will sort on strings
  // We need to supply a compare function to sort numerics in ascending order or descending order
  //  if a-b returns negative, a is the lower number than b...
  nums.sort((a, b) => {
    return a - b;
  });

  // Then we start moving the pointers
  // 1. If nums[lp] + nums[rp] == k, lp++, rp--, count++
  // 2. If nums[lp] + nums[rp] < k, lp++
  // 3. If nums[lp] + nums[rp] > k, rp--

  while (lp < rp) {
    let temp = nums[lp] + nums[rp];
    if (temp === k) {
      lp++;
      rp--;
      count++;
    } else if (temp < k) {
      lp++;
    } else if (temp > k) {
      rp--;
    }
  }

  return count;
};
