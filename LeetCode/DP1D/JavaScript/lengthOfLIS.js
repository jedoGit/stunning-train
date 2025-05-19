/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  LIS = Array(nums.length).fill(1);

  for (let i = nums.length - 1; i > -1; i -= 1) {
    // for (let j = i + 1; j < nums.length; j += 1) {
    for (let j of Array.from(
      { length: nums.length },
      (_, idx) => idx + i + 1
    )) {
      if (nums[i] < nums[j]) {
        LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
      }
    }
  }

  return Math.max(...LIS);
};

let input1 = { nums: [10, 9, 2, 5, 3, 7, 101, 18] };
let expected1 = 4;
let result1 = lengthOfLIS(input1["nums"]);
console.log("Input: [" + input1.nums + "]");
console.log("Result: " + result1);
console.log("Expected: " + expected1);
console.log("-".repeat(50));

let input2 = { nums: [0, 1, 0, 3, 2, 3] };
let expected2 = 4;
let result2 = lengthOfLIS(input2["nums"]);
console.log("Input: [" + input2.nums + "]");
console.log("Result: " + result2);
console.log("Expected: " + expected2);
console.log("-".repeat(50));

let input3 = { nums: [7, 7, 7, 7, 7, 7, 7] };
let expected3 = 1;
let result3 = lengthOfLIS(input3["nums"]);
console.log("Input: [" + input3.nums + "]");
console.log("Result: " + result3);
console.log("Expected: " + expected3);
console.log("-".repeat(50));
