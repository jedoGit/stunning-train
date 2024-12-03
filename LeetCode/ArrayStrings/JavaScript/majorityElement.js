// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

// Example 1:

// Input: nums = [3,2,3]
// Output: 3
// Example 2:

// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// Constraints:

// n == nums.length
// 1 <= n <= 5 * 104
// -109 <= nums[i] <= 109

// Follow-up: Could you solve the problem in linear time and in O(1) space?

// TC: O(n), we're looping through all elements of nums
// SC: O(n), we're looping through all elements of nums and creating a hashmap entry

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  // Using Hashmap
  let count = {};
  let res = 0;
  let maxCount = 0;

  // Basically, we want to use a hashmap to count the occurence of each elements
  // in nums. Then, we look at which k/v pair in our hashmap has the max count.
  for (let n of nums) {
    if (!count[n]) {
      count[n] = 0;
    }

    count[n] = 1 + count[n];

    if (count[n] > maxCount) {
      res = n;
    }

    maxCount = Math.max(count[n], maxCount);
  }

  return res;
};

// TC: O(n), we're looping through all elements of nums
// SC: O(1), in place processing

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  // Search Boyer-Moore Algorithm
  let res = 0;
  let count = 0;

  for (let n of nums) {
    if (count === 0) {
      res = n;
    }

    count += n === res ? 1 : -1;
  }
  return res;
};
