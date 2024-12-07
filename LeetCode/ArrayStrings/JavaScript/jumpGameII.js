// You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

// Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

// 0 <= j <= nums[i] and
// i + j < n
// Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

// Example 1:

// Input: nums = [2,3,1,1,4]
// Output: 2
// Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:

// Input: nums = [2,3,0,1,4]
// Output: 2

// Constraints:

// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// It's guaranteed that you can reach nums[n - 1].

// TC: O(n) because we loop through the elements of nums
// SC: O(1) in place processing

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let n = nums.length;
  let res = 0;
  let l = 0;
  let r = 0;

  // We stop once the r pointer exceeds the end index
  while (r < n - 1) {
    // For each iteration, we reset the farthest variable.
    // We use the farthest variable to capture the farthest jump based on the value of the element.
    // For example, if the pointer is pointing 2, the farthest variable should point to current index plus 2.
    let farthest = 0;
    // Starting at the left pointer and ending at the right pointer, we check the value of the elements.
    // Then, we update the value of farthest based on the max value we computed between this interval
    for (let i = l; i < r + 1; i++) {
      farthest = Math.max(farthest, i + nums[i]);
    }

    // After we computed what's the farthest value from the interval, we update our l & r pointers
    // We move the l pointer to r+1 and the r pointer to the farthest value
    l = r + 1;
    r = farthest;

    // We increment res every iteration
    res = res + 1;
  }

  return res;
};
