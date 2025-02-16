// Given an array of integers nums and an integer k, an element nums[i] is considered good if it is strictly greater than the elements at indices i - k and i + k (if those indices exist). If neither of these indices exists, nums[i] is still considered good.

// Return the sum of all the good elements in the array.

// Example 1:

// Input: nums = [1,3,2,1,5,4], k = 2

// Output: 12

// Explanation:

// The good numbers are nums[1] = 3, nums[4] = 5, and nums[5] = 4 because they are strictly greater than the numbers at indices i - k and i + k.

// Example 2:

// Input: nums = [2,1], k = 1

// Output: 2

// Explanation:

// The only good number is nums[0] = 2 because it is strictly greater than nums[1].

// Constraints:

// 2 <= nums.length <= 100
// 1 <= nums[i] <= 1000
// 1 <= k <= floor(nums.length / 2)

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// TC: O(n) due to accessing all elements of nums
// SC: O(1) in place processing

var sumOfGoodNumbers = function (nums, k) {
  // nums = [1,3,2,1,5,4], k = 2
  // nums = [1], k = 10, sumOfGoodElement = 1
  // nums = [], k = 5, sumOfGoodElement = 0

  // nums sorted or unsorted? unsorted
  // length of nums: {2...100}
  // elements of nums: {1...1000}
  // k: {1...floor((length of num)/2)}

  const n = nums.length;
  let cumSum = 0;

  for (let i = 0; i < n; i += 1) {
    // if ( nums[i-k] && nums[i+k] && nums[i-k] < nums[i] && nums[i+k] < nums[i] ||
    //      nums[i-k] && nums[i-k] < nums[i] ||
    //      nums[i+k] && nums[i+k] < nums[i]  ) {
    //     console.log(nums[i])
    //     // goodElement = [3, 5, 4]
    //     cumSum += nums[i]
    // }
    let r = nums[i - k] || 0; // nums[i-k] ? nums[i-k] : 0
    let l = nums[i + k] || 0;

    if (l < nums[i] && r < nums[i]) {
      // console.log("1: " + nums[i])
      // goodElement = [3, 5, 4]
      cumSum += nums[i];
    }
  }

  return cumSum;
};
