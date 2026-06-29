// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

// Example 1:

// Input: nums = [3,2,3]
// Output: 3
// Example 2:

// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// Constraints:

// n == nums.length
// 1 <= n <= 5 * 104
// -109 <= nums[i] <= 109

// Follow-up: Could you solve the problem in linear time and in O(1) space?

// TC: O(n), we're looping through all elements of nums
// SC: O(1), in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MajorityElementRecord {
  constructor(nums, expected) {
    this.nums = nums;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  majorityElement(nums) {
    // Search Boyer-Moore Algorithm
    let res = 0;
    let count = 0;

    for (let n of nums) {
      if (count === 0) {
        res = n;
      }

      count += n === res ? 1 : -1;
    }

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.majorityElement([...record.nums]);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new MajorityElementRecord([3, 2, 3], 3),
  new MajorityElementRecord([2, 2, 1, 1, 1, 2, 2], 2),
  new MajorityElementRecord([1], 1),
  new MajorityElementRecord([6, 5, 5], 5),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
