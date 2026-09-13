// Given an integer array nums where every element appears three times except for one, which appears exactly once. Find the single element and return it.

// You must implement a solution with a linear runtime complexity and use only constant extra space.

// Example 1:

// Input: nums = [2,2,3,2]
// Output: 3
// Example 2:

// Input: nums = [0,1,0,1,0,1,99]
// Output: 99

// Constraints:

// 1 <= nums.length <= 3 * 104
// -231 <= nums[i] <= 231 - 1
// Each element in nums appears exactly three times except for one element which appears once.

// TC: O(n), we loop through length of nums array
// SC: O(1), In place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class SingleNumberIIRecord {
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
  singleNumber(nums) {
    let ones = 0;
    let twos = 0;

    for (let num of nums) {
      ones = (ones ^ num) & ~twos;
      twos = (twos ^ num) & ~ones;

      // console.log(num.toString(2) + " ones: " + ones.toString(2) + " twos: " + twos.toString(2))
    }

    return ones;
  }

  // singleNumber(nums) {
  //     let map = new Map();
  //     let ans;
  //     for(let i=0;i<nums.length;i++){
  //         map.set(nums[i],(map.get(nums[i])||0)+1);
  //     }
  //     map.forEach((val,key)=>{
  //         if(val==1){
  //             ans = key;
  //         }
  //     })
  //     return ans;
  // }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.singleNumber([...record.nums]);
  const pass = result === record.expected;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new SingleNumberIIRecord([2, 2, 3, 2], 3),
  new SingleNumberIIRecord([0, 1, 0, 1, 0, 1, 99], 99),
  new SingleNumberIIRecord([1], 1),
  new SingleNumberIIRecord([-2, -2, 1, -2], 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
