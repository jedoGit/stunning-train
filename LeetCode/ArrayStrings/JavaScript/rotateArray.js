// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:

// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]
// Example 2:

// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
// Explanation:
// rotate 1 steps to the right: [99,-1,-100,3]
// rotate 2 steps to the right: [3,99,-1,-100]

// Constraints:

// 1 <= nums.length <= 105
// -231 <= nums[i] <= 231 - 1
// 0 <= k <= 105

// Follow up:

// Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.
// Could you do it in-place with O(1) extra space?

// TC: O(n) looping through all the elements of nums
// SC: O(1) in place processing

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k = k % nums.length;
  let n = nums.length;

  let l = 0;
  let r = n - 1;

  // Reverse the whole array using array deconstruction
  // Swap the elements pointed by the l and r pointers starting from the outer elements moving to the middle elements
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }

  // Then, we reverse the first k elements of the array
  l = 0;
  r = k - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }

  // Lastly, we reverse the remaining elements after the first k elements
  l = k;
  r = n - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
};

// TC: O(n) looping through all the elements of nums
// SC: O(n) we're creating a new array from nums

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  let arr = [];
  let n = nums.length;
  k = k % n;

  if (n >= k) {
    // Push the elements starting from n-k index, push it to the new array.
    for (let i = n - k; i < n; i++) {
      arr.push(nums[i]);
    }
    // Then push the first k elements to the new array
    for (let j = 0; j < n - k; j++) {
      arr.push(nums[j]);
    }

    // Here, we overwrite the values of the new array to the original array
    // For JS, we use splice method to delete the elements 0 to n and replace with
    // elements of the new array using the rest operator
    // We can also, set the length of the original array to 0 and push the elements of the new array using the rest operator
    nums.splice(0, n, ...arr);
    // nums.length = 0
    // nums.push(...arr)
  } else {
    nums;
  }
};
