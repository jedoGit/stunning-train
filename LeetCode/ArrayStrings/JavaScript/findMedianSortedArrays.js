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

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Record {
  constructor(nums1, nums2, expected) {
    this.nums1 = nums1;
    this.nums2 = nums2;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number}
   */
  findMedianSortedArrays(nums1, nums2) {
    let A = nums1;
    let B = nums2;

    if (B.length < A.length) {
      [A, B] = [B, A];
    }

    const total = A.length + B.length;
    const half = Math.floor((total + 1) / 2);
    let l = 0;
    let r = A.length;

    while (l <= r) {
      const i = Math.floor((l + r) / 2);
      const j = half - i;

      const Aleft = i > 0 ? A[i - 1] : -Infinity;
      const Aright = i < A.length ? A[i] : Infinity;
      const Bleft = j > 0 ? B[j - 1] : -Infinity;
      const Bright = j < B.length ? B[j] : Infinity;

      if (Aleft <= Bright && Bleft <= Aright) {
        if (total % 2 !== 0) {
          return Math.max(Aleft, Bleft);
        }

        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      } else if (Aleft > Bright) {
        r = i - 1;
      } else {
        l = i + 1;
      }
    }
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.findMedianSortedArrays(record.nums1, record.nums2);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(
    `Input: nums1 = ${JSON.stringify(record.nums1)}, nums2 = ${JSON.stringify(
      record.nums2
    )}`
  );
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new Record([1, 3], [2], 2),
  new Record([1, 2], [3, 4], 2.5),
  new Record([], [1], 1),
  new Record([0, 0], [0, 0], 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
