// Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

// Given the sorted rotated array nums of unique elements, return the minimum element of this array.

// You must write an algorithm that runs in O(log n) time.

// Example 1:

// Input: nums = [3,4,5,1,2]
// Output: 1
// Explanation: The original array was [1,2,3,4,5] rotated 3 times.
// Example 2:

// Input: nums = [4,5,6,7,0,1,2]
// Output: 0
// Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
// Example 3:

// Input: nums = [11,13,15,17]
// Output: 11
// Explanation: The original array was [11,13,15,17] and it was rotated 4 times.

// Constraints:

// n == nums.length
// 1 <= n <= 5000
// -5000 <= nums[i] <= 5000
// All the integers of nums are unique.
// nums is sorted and rotated between 1 and n times.

/**
 * @param {number[]} nums
 * @return {number}
 */
const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class FindMinRecord {
  constructor(nums, expected) {
    this.nums = nums;
    this.expected = expected;
  }
}

class Solution {
  findMin(nums) {
    // [0,1,2,4,5,6,7]
    // [1,2,4,5,6,7,0]
    // [2,4,5,6,7,0,1]
    // [4,5,6,7,0,1,2]
    // [5,6,7,0,1,2,4]
    // [6,7,0,1,2,4,5]
    // [7,0,1,2,4,5,6]

    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
      let m = Math.floor((r + l) / 2);
      if (nums[m] > nums[r]) {
        l = m + 1;
      } else {
        r = m;
      }
    }

    return nums[l];
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.findMin([...record.nums]);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new FindMinRecord([3, 4, 5, 1, 2], 1),
  new FindMinRecord([4, 5, 6, 7, 0, 1, 2], 0),
  new FindMinRecord([11, 13, 15, 17], 11),
  new FindMinRecord([1], 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});

// var findMin = function(nums) {
//     let left = 0, right = nums.length - 1;
//     while (left < right) {
//         const mid = Math.floor((left + right) / 2);
//         if (nums[mid] > nums[right]) {
//             left = mid + 1;
//         } else {
//             right = mid;
//         }
//     }
//     return nums[left];
// };
