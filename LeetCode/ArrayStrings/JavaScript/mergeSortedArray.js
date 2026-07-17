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

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MergeSortedArrayRecord {
  constructor(nums1, m, nums2, n, expected) {
    this.nums1 = nums1;
    this.m = m;
    this.nums2 = nums2;
    this.n = n;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums1
   * @param {number} m
   * @param {number[]} nums2
   * @param {number} n
   * @return {void} Do not return anything, modify nums1 in-place instead.
   */
  merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

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

    while (i > -1) {
      nums1[k] = nums1[i];
      k--;
      i--;
    }

    while (j > -1) {
      nums1[k] = nums2[j];
      k--;
      j--;
    }
  }

  // TC: O(nlogn) because we have to sort the merged array
  // SC: O(nlogn) because we have to sort the merged array
  mergeUsingSort(nums1, m, nums2, n) {
    nums1.splice(m, n, ...nums2);
    nums1.sort((a, b) => a - b);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const nums1 = [...record.nums1];
  const nums2 = [...record.nums2];

  solution.merge(nums1, record.m, nums2, record.n);

  console.log(`Input: nums1 = [${record.nums1}], m = ${record.m}, nums2 = [${record.nums2}], n = ${record.n}`);
  console.log(`Expected: [${record.expected}]`);
  console.log(`Result: [${nums1}]`);
  console.log(JSON.stringify(nums1) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL);
}

const records = [
  new MergeSortedArrayRecord([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3, [1, 2, 2, 3, 5, 6]),
  new MergeSortedArrayRecord([1], 1, [], 0, [1]),
  new MergeSortedArrayRecord([0], 0, [1], 1, [1]),
  new MergeSortedArrayRecord([2, 0], 1, [1], 1, [1, 2]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
