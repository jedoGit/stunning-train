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
  search(nums, target) {
    // [0,1,2,4,5,6,7]

    // [1,2,4,5,6,7,0]
    // [2,4,5,6,7,0,1]
    // [4,5,6,7,0,1,2]

    // [5,6,7,0,1,2,4]
    // [6,7,0,1,2,4,5]
    // [7,0,1,2,4,5,6]

    // [7,0,1,2,4,5,6]
    // [7,0,1,2,4,5,6]   l>m r>m l>r
    //  l     m     r
    //  l m r
    //    l r
    // [4,5,6,7,0,1,2]   l<m r<m l>r
    // [6,7,0,1,2,4,5]   l>m r>m l>r
    // [2,4,5,6,7,0,1]   l<m r<m l>r
    //  l     m     r

    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
      let m = l + Math.floor((r - l) / 2);

      if (nums[m] === target) return m;

      // Check if nums is rotated
      // Since it's a sorted rotated array:
      // It's rotated if nums[m] > nums[r] or nums[m] < nums[l]

      if (nums[m] > nums[r]) {
        // Array is rotated and lowest value is in the right side
        if (target < nums[m] && target >= nums[l]) {
          // if the target we're looking for is in the left side
          r = m - 1;
        } else {
          l = m + 1;
        }
      } else if (nums[m] < nums[l]) {
        // Array is rotated and the lowest value is in the left side
        if (target > nums[m] && target <= nums[r]) {
          // if the target we're looking for is in the right side
          l = m + 1;
        } else {
          r = m - 1;
        }
      } else {
        if (target > nums[m]) {
          // Array is not rotated, so perform Binary search
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
    }

    return -1;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.search(record.nums, record.target);
  const passed = result === record.expected;

  console.log(`Input: nums = ${JSON.stringify(record.nums)}, target = ${record.target}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(passed ? Result.PASS : Result.FAIL);
}

const records = [
  new Record([4, 5, 6, 7, 0, 1, 2], 0, 4),
  new Record([4, 5, 6, 7, 0, 1, 2], 3, -1),
  new Record([1], 0, -1),
  new Record([1], 1, 0),
  new Record([3, 1], 1, 1),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
