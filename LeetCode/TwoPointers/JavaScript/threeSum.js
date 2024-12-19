// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.
// Example 2:

// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.
// Example 3:

// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

// Constraints:

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

// TC: O(nlogn) + O (n^2), because of sorting and we have to loop within a loop to find the combination
// SC: O(1) or O(n) due to sorting

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // We need to sort the nums first in ascending order
  let res = [];
  let n = nums.length;
  nums.sort((a, b) => a - b);

  // Loop through each elements in nums... We'll use forEach((nums, index)=> {})
  nums.forEach((a, i) => {
    // For each elements, let's check for duplicates...
    // Checking if current nums is the same as the previous...
    // If so, we want to skip to the next element..
    // To do that with forEach, we just return... continue does not work in this case
    if (i > 0 && a === nums[i - 1]) {
      return;
    }
    // We'll use two pointers, starting at oposite ends..
    // The l will start after the current element a, which has an index i
    let l = i + 1;
    let r = n - 1;
    // We'll stop once l crosses r
    while (l < r) {
      // Compute the three
      let threeSum = a + nums[l] + nums[r];
      // if the sum is greater than 0, we move r
      if (threeSum > 0) {
        r--;
      } else if (threeSum < 0) {
        // if the sum is negative, we move l
        l++;
      } else {
        // if it's zero, we found the numbers and we push it to our results array
        res.push([a, nums[l], nums[r]]);
        // move l
        l++;
        // If there are duplicates in the l side, we keep incrementing l
        while (nums[l] === nums[l - 1] && l < r) {
          l++;
        }
      }
    }
  });

  return res;
};
