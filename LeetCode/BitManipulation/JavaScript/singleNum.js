// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

// Example 1:

// Input: nums = [2,2,1]
// Output: 1
// Example 2:

// Input: nums = [4,1,2,1,2]
// Output: 4
// Example 3:

// Input: nums = [1]
// Output: 1

// Constraints:

// 1 <= nums.length <= 3 * 104
// -3 * 104 <= nums[i] <= 3 * 104
// Each element in the array appears twice except for one element which appears only once.

// TC: O(n), we loop through length of nums array
// SC: O(1), In place processing

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  // If we use Bitwise XOR operator.
  //   XOR truth table:
  //       0 1
  //       ---
  //   0 | 0 1
  //   1 | 1 0

  // Using bit manipulation

  // nums = [4,1,2,1,2]
  // 4       0100
  // 1       0001
  // 2       0010
  // 1       0001
  // 2       0010

  //     4   0100
  // XOR 1   0001
  // ans 5   0101
  // XOR 2   0010
  // ans 7   0111
  // XOR 1   0001
  // ans 6   0110
  // XOR 2   0010
  // ans 4   0100

  let ans = 0;
  for (let num of nums) {
    ans = ans ^ num;
  }

  return ans;
};
