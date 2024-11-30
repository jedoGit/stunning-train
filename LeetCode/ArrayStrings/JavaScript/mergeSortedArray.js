// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

// Merge nums1 and nums2 into a single array sorted in non-decreasing order.

// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

// Example 1:

// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
// Example 2:

// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
// The result of the merge is [1].
// Example 3:

// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
// The result of the merge is [1].
// Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

// Constraints:

// nums1.length == m + n
// nums2.length == n
// 0 <= m, n <= 200
// 1 <= m + n <= 200
// -109 <= nums1[i], nums2[j] <= 109

// Follow up: Can you come up with an algorithm that runs in O(m + n) time?

// TC: O(m+n)
// SC: O(1)

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // We need to merge all elements of nums2 to nums1. nums1 array need to be sorted in ascending order.
  // Solve using O(m+n) in TC. We can't use sorting because sorting is O(nlogn). We can use 2 pointers

  let i = m - 1; // initially points at the m-1 element in nums1
  let j = n - 1; // initially points at the n-1 element of nums2
  let k = m + n - 1; // initially points at the end of nums1

  // Compare the elements of nums1 and nums2 starting at the end,
  // if nums1[i] > nums2[j], we move nums1[i] to nums1[k]
  // if nums1[i] < nums2[j], we move nums2[j] to nums1[k]
  // then decrement i,j,k. Stop when i and j becomes -1
  while (i > -1 && j > -1) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  // Insert the left overs of nums1 array
  // This is the case when nums2 is smaller in length than nums1
  while (i > -1) {
    nums1[k] = nums1[i];
    k--;
    i--;
  }

  // Handle the case when nums1 has a length of 0 elements and nums2 has elements > 0.
  // We need to move all of nums2 to nums1.
  while (j > -1) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
};

// TC: O(nlogn) because we have to sort the merged array
// SC: O(nlogn) because we have to sort the merged array

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // We need to merge all elements of nums2 to nums1. nums1 array need to be sorted in ascending order.
  // Solve using JS methods:
  // Splice, starting at index m, delete n elements, then insert the elements of nums2 using the rest operator
  // Then sort in ascending order
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
};
