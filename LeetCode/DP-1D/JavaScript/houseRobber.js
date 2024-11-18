// You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

// Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

// Example 1:

// Input: nums = [1,2,3,1]
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.
// Example 2:

// Input: nums = [2,7,9,3,1]
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.

// Constraints:

// 1 <= nums.length <= 100
// 0 <= nums[i] <= 400

// TC: O(n), loop through n
// SC: O(1), in place processing

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // The DP solution of this problem is not very intuitive. You'll need to study it and understand it fully.
  // [rob1, rob2], at each iteration, you'll update these two variables.
  // For example, nums = [2,7,9,3,1], we can't rob houses that are next to each other.
  // So, to maximize our larceny, we do it like this:
  // This is the first sub-problem of the DP:
  // [2, skip, max(9,3,1)] and/or [skip, 7, skip, max(3,1)]
  // We can break down the sub-problem further:
  // [2, skip, 9] and/or [skip, 7, skip] compute [rob1, rob2]
  // We're going to compute [rob1, rob2, n, n+1, n+2, ...], initialize rob1 and rob2 to 0
  // Visually, it will look like this: [rob1, rob2, 2, 7, 9, 3, 1]
  // The max of rob1 + 2 and rob2, assign that to rob2
  // The previous value of rob2, assign that to rob1
  // Do this for each value n

  // Initilize these two values with zero
  let [rob1, rob2] = [0, 0];

  for (const num of nums) {
    const temp = Math.max(rob1 + num, rob2);
    rob1 = rob2;
    rob2 = temp;
  }

  // The max value will always be in rob2
  return rob2;
};
