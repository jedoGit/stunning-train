// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]
// Example 2:

// Input: nums = [5,7,7,8,8,10], target = 6
// Output: [-1,-1]
// Example 3:

// Input: nums = [], target = 0
// Output: [-1,-1]

// Constraints:

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums is a non-decreasing array.
// -109 <= target <= 109

// TC: O(logn) due to binary search
// SC: O(1)

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class SearchRangeRecord {
  constructor(nums, target, expected) {
    this.nums = nums;
    this.target = target;
    this.expected = expected;
  }
}

class Solution {
  searchRange(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    let res = [-1, -1];

    // Using binary search
    while (l <= r) {
      let m = l + Math.floor((r - l) / 2);

      // Check if target is less than mid
      // if so, move r pointer to m-1
      // if target is greater than mid, move l pointer to m+1
      // else, target is equal to mid... from there, just move l pointer to the right until it's equal to target or move r pointer to left.
      if (target < nums[m]) {
        r = m - 1;
      } else if (target > nums[m]) {
        l = m + 1;
      } else {
        while (nums[l] !== target) l++;
        while (nums[r] !== target) r--;

        res = [l, r];
        break;
      }
    }

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.searchRange([...record.nums], record.target);
  const status = JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}, target = ${record.target}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new SearchRangeRecord([5, 7, 7, 8, 8, 10], 8, [3, 4]),
  new SearchRangeRecord([5, 7, 7, 8, 8, 10], 6, [-1, -1]),
  new SearchRangeRecord([], 0, [-1, -1]),
  new SearchRangeRecord([1], 1, [0, 0]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
