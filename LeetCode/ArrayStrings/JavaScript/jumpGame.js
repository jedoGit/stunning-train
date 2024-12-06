// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

// Return true if you can reach the last index, or false otherwise.

// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

// Constraints:

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105

// TC: O(n) loop through all the elements
// SC: O(1) in place processing

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  // What we want to do here is starting at the last element, we want to check
  // if the starting from that element plus the value on that element, are we able to
  // jump to the end? We want to set a pointer to point to the last index of nums.
  // We compare and update this value of the condition is true. We keep doing this
  // until we cover all the elements.
  // Then we check if we got all the way to zero index, which means there's a path from
  // index zero to the last index.

  let n = nums.length;
  // Initially, our goal is the last index of the array.
  let goal = n - 1;

  for (let i = n - 1; i > -1; i--) {
    // check if index i plus the element in index i >= goal.
    // If so, we have a new goal post to check.
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }

  return goal === 0 ? true : false;
};
