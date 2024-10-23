// Given two 0-indexed integer arrays nums1 and nums2, return a list answer of size 2 where:

// answer[0] is a list of all distinct integers in nums1 which are not present in nums2.
// answer[1] is a list of all distinct integers in nums2 which are not present in nums1.
// Note that the integers in the lists may be returned in any order.

// Example 1:

// Input: nums1 = [1,2,3], nums2 = [2,4,6]
// Output: [[1,3],[4,6]]
// Explanation:
// For nums1, nums1[1] = 2 is present at index 0 of nums2, whereas nums1[0] = 1 and nums1[2] = 3 are not present in nums2. Therefore, answer[0] = [1,3].
// For nums2, nums2[0] = 2 is present at index 1 of nums1, whereas nums2[1] = 4 and nums2[2] = 6 are not present in nums2. Therefore, answer[1] = [4,6].
// Example 2:

// Input: nums1 = [1,2,3,3], nums2 = [1,1,2,2]
// Output: [[3],[]]
// Explanation:
// For nums1, nums1[2] and nums1[3] are not present in nums2. Since nums1[2] == nums1[3], their value is only included once and answer[0] = [3].
// Every integer in nums2 is present in nums1. Therefore, answer[1] = [].

// Constraints:

// 1 <= nums1.length, nums2.length <= 1000
// -1000 <= nums1[i], nums2[i] <= 1000

// TC: O(n), we're looping through 2 arrays
// SC: O(n), we're creating memory for 2 arrays

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  // We'll create sets and push the array values to the sets so we can use it for LUT
  let set1 = new Set(nums1);
  let set2 = new Set(nums2);

  // Here, we'll check which element in nums1, which we pushed to set1 does not exist in nums2, which we pushed to set2
  // If we find an element not in the other set, we add it to an array which captures all the values which are not
  // present in the other array.
  const nums1Diff = [];
  for (let num of set1) {
    if (!set2.has(num)) {
      nums1Diff.push(num);
    }
  }

  // We do the same for the other set.
  const nums2Diff = [];
  for (let num of set2) {
    if (!set1.has(num)) {
      nums2Diff.push(num);
    }
  }

  // We return the array of differences in packaged in an array
  return [nums1Diff, nums2Diff];
};
