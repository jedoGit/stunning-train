// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?

// TC: O(n) because we visit all elements of the input array nums
// SC: O(n) because we build a hashmap with size of input array nums

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class TwoSumRecord {
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
   * @return {number[]}
   */
  twoSum(nums, target) {
    const numMap = {};
    // One of the array method in JS is entries(). This returns the index and the value of each elements
    for (let [i, n] of nums.entries()) {
      // To solve 2 sum, for each iteration, we need to compute:
      // val = target - n, then check if val is in our hashmap, if not, add it to our hashmap
      // if it's in our hashmap, it means we have values from our input that adds up to target,
      // then we add this to our results array.
      const complement = target - n;

      if (complement in numMap) {
        // return an array of the value of the key "complement" in our hashmap and the current index of n
        return [numMap[complement], i];
      }

      // Add n as the key and i as the value to our hashmap
      numMap[n] = i;
    }

    return [];
  }
}

function isEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // The indices can be returned in any order, so compare sorted copies
  const sortedArr1 = [...arr1].sort((a, b) => a - b);
  const sortedArr2 = [...arr2].sort((a, b) => a - b);

  return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.twoSum([...record.nums], record.target);
  const pass = isEqual(result, record.expected);

  console.log(`Input: nums = ${JSON.stringify(record.nums)}, target = ${record.target}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new TwoSumRecord([2, 7, 11, 15], 9, [0, 1]),
  new TwoSumRecord([3, 2, 4], 6, [1, 2]),
  new TwoSumRecord([3, 3], 6, [0, 1]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
