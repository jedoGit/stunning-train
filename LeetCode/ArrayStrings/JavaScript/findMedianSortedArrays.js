// Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

// The overall run time complexity should be O(log (m+n)).

// Example 1:

// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.00000
// Explanation: merged array = [1,2,3] and median is 2.
// Example 2:

// Input: nums1 = [1,2], nums2 = [3,4]
// Output: 2.50000
// Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

// Constraints:

// nums1.length == m
// nums2.length == n
// 0 <= m <= 1000
// 0 <= n <= 1000
// 1 <= m + n <= 2000
// -106 <= nums1[i], nums2[i] <= 106

// TC: O(logn) due to binary search
// SC: O(n+m) we have to save a copy of the two input array

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // Set the smaller array as A and the longer as B
  // B = [1 23 64 312 534 863], length 6   [-inf][1 23 64 312 534 863]
  // A = [54 78 983 1023 8122], length 5   [54 78 ] [983 1023 8122]
  // merged = [1 23 54 64 78 312 534 863 983 1023 8122] => median 312
  let [A, B] = [nums1, nums2];

  if (B.length < A.length) {
    [A, B] = [B, A];
  }

  // Partition B into two halves based on the total length of the merged sorted array A and B
  total = A.length + B.length;
  half = Math.floor(total / 2);

  // We will do a binary search on A, so we init l and r pointers for A
  let l = 0;
  let r = A.length - 1;

  // we will return the median
  while (true) {
    // Find the middle of A
    let mid = Math.floor((l + r) / 2);
    // Get the starting point of B
    let j = half - mid - 2;

    // Make sure to guard against out of bounds
    let Aleft = mid >= 0 ? A[mid] : parseFloat(Number.MIN_SAFE_INTEGER);
    let Aright =
      mid + 1 < A.length ? A[mid + 1] : parseFloat(Number.MAX_SAFE_INTEGER);
    let Bleft = j >= 0 ? B[j] : parseFloat(Number.MIN_SAFE_INTEGER);
    let Bright =
      j + 1 < B.length ? B[j + 1] : parseFloat(Number.MAX_SAFE_INTEGER);

    // Check if partition is correct
    if (Aleft <= Bright && Bleft <= Aright) {
      // Odd
      if (total % 2) {
        return Math.min(Aright, Bright);
      } else {
        // Even
        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      }
    } else if (Aleft > Bright) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  // [54 78 983 1023 8122] [52 123 178]
  // [52 54 78 123 178 983 1023 8122]
};
