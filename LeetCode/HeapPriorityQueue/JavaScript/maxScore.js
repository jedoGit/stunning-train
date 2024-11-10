// You are given two 0-indexed integer arrays nums1 and nums2 of equal length n and a positive integer k. You must choose a subsequence of indices from nums1 of length k.

// For chosen indices i0, i1, ..., ik - 1, your score is defined as:

// The sum of the selected elements from nums1 multiplied with the minimum of the selected elements from nums2.
// It can defined simply as: (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
// Return the maximum possible score.

// A subsequence of indices of an array is a set that can be derived from the set {0, 1, ..., n-1} by deleting some or no elements.

// Example 1:

// Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
// Output: 12
// Explanation:
// The four possible subsequence scores are:
// - We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
// - We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6.
// - We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12.
// - We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
// Therefore, we return the max score, which is 12.
// Example 2:

// Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
// Output: 30
// Explanation:
// Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.

// Constraints:

// n == nums1.length == nums2.length
// 1 <= n <= 105
// 0 <= nums1[i], nums2[j] <= 105
// 1 <= k <= n

// TC: O(nlogn) because we need to sort the array
// SC: O(k) we're maintaining a heap of size k elements

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var maxScore = function (nums1, nums2, k) {
  // Use min heap from library https://github.com/datastructures-js/priority-queue/blob/v5/README.md
  // This library is loaded by leetcode. Check the language setting for information
  let h = new MinPriorityQueue();
  let result = 0;
  let totalSum = 0;

  // First, we need to pair each elements of nums1 and nums2
  const pair = nums1.map((n1val, i) => [n1val, nums2[i]]);
  // We need to sort in descending order the num2 vals of the pair
  pair.sort((a, b) => b[1] - a[1]);

  // console.log(pair)

  for (let [n1, n2] of pair) {
    // Let's add n1 to the min heap and also get a running total of the n1 values
    // The purpose of maintaining a min heap is so that when we load the heap with k values,
    // we need to pop the min value in order to subtract it from our running total.
    totalSum = totalSum + n1;
    h.enqueue(n1);

    // console.log(h)
    // After adding, let's check if our heap have more than k elements
    // If so, we'll need to pop the root element and subtrack from the total sum
    if (h.size() > k) {
      const tmp = h.dequeue().element;
      totalSum = totalSum - tmp;
    }

    // At this point, we only looking at k indices and we want to find the max score
    if (h.size() === k) {
      result = Math.max(result, totalSum * n2);
    }
  }

  return result;
};
