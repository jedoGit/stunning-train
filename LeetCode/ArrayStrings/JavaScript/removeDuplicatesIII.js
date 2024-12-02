// Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

// Return k after placing the final result in the first k slots of nums.

// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

// Example 1:

// Input: nums = [1,1,1,2,2,3]
// Output: 5, nums = [1,1,2,2,3,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).
// Example 2:

// Input: nums = [0,0,1,1,1,1,2,3,3]
// Output: 7, nums = [0,0,1,1,2,3,3,_,_]
// Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Constraints:

// 1 <= nums.length <= 3 * 104
// -104 <= nums[i] <= 104
// nums is sorted in non-decreasing order.

// TC: O(n), we're visiting all of the elements of nums at most twice
// SC: O(1) in place processing

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let l = 0;
  let r = 0;
  let n = nums.length;

  // What we want to do is use 2 pointers (left and right pointers) and they start at index zero
  // We stop when the right pointer is out of bounds.
  // First, we move the right pointer and count how many elements are duplicate.
  // After moving the right pointer and counting the duplicates,
  // We move our left pointer and copy the only a max of 2 elements to the index pointed by the left pointer

  while (r < n) {
    // Initialize count to 1. We know we have at least 1 value
    let count = 1;
    // Count the number of duplicates using the right pointer.
    // The while loop will break and we have the right pointer pointing to an index of the last duplicate value
    // [1,1,1,2,3,..]
    //  ^   ^
    //  |   |
    //  l   r
    while (r + 1 < n && nums[r] === nums[r + 1]) {
      r += 1;
      count += 1;
    }

    // Copy at most the min of 2 and count the values pointed by r to the index pointed by l
    // [1,1,1,2,3,..]
    //  ^   ^
    //  |   |
    //  l   r
    // [1,1,1,2,3,..]
    //      ^
    //      |
    //      l
    //      r
    for (let i = 0; i < Math.min(2, count); i++) {
      nums[l] = nums[r];
      l += 1;
    }

    // We then move r
    // [1,1,1,2,3,..]
    //      ^ ^
    //      | |
    //      l r
    r += 1;
  }

  return l;
};
