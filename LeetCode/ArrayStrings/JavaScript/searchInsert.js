// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [1,3,5,6], target = 5
// Output: 2
// Example 2:

// Input: nums = [1,3,5,6], target = 2
// Output: 1
// Example 3:

// Input: nums = [1,3,5,6], target = 7
// Output: 4

// Constraints:

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums contains distinct values sorted in ascending order.
// -104 <= target <= 104

// TC: O(logn) because at each iteration, your search items are reduced by n/2
// SC: O(1) in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class Record {
  constructor(nums, target, expected) {
    this.nums = nums;
    this.target = target;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  searchInsert(nums, target) {
    let l = 0;
    let r = nums.length;

    while (l < r) {
      let m = l + Math.floor((r - l) / 2);

      if (target > nums[m]) {
        l = m + 1;
      } else {
        r = m;
      }
    }

    return r;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.searchInsert(record.nums, record.target);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}, target = ${record.target}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new Record([1, 3, 5, 6], 5, 2),
  new Record([1, 3, 5, 6], 2, 1),
  new Record([1, 3, 5, 6], 7, 4),
  new Record([1, 3, 5, 6], 0, 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
