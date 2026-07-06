/**
 * @param {number[]} nums
 * @return {number}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class LengthOfLISRecord {
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
  lengthOfLIS(nums) {
    const lis = Array(nums.length).fill(1);

    for (let i = nums.length - 1; i > -1; i -= 1) {
      for (let j = i + 1; j < nums.length; j += 1) {
        if (nums[i] < nums[j]) {
          lis[i] = Math.max(lis[i], 1 + lis[j]);
        }
      }
    }

    return Math.max(...lis);
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.lengthOfLIS(record.nums);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new LengthOfLISRecord([10, 9, 2, 5, 3, 7, 101, 18], 4),
  new LengthOfLISRecord([0, 1, 0, 3, 2, 3], 4),
  new LengthOfLISRecord([7, 7, 7, 7, 7, 7, 7], 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("-".repeat(50));
});
