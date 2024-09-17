// In this exercise, you are tasked with writing a JavaScript function named subarraySum.
// This function should take in an array of integers (nums) and another integer (target).
// Your goal is to find a contiguous subarray whose elements sum up to the given target integer.
// The function should return an array containing the starting and ending indices of the subarray.
// If no such subarray exists, return an empty array.

// Examples:
// subarraySum([1, 4, 20, 3, 10, 5], 33) should return [2, 4] because the subarray from index 2 to index 4 sums to 33.
// subarraySum([1, 2, 3], 3) should return [0, 1] because the subarray from index 0 to index 1 sums to 3.

// For this exercise, you can make use of two types of hash tables:
// Map: This is a built-in object in JavaScript designed to store key-value pairs.
// Object: This is another JavaScript data structure that can function as a hash table for storing key-value pairs.

function subarraySum(nums, target) {
  const sumIndex = new Map();
  sumIndex.set(0, -1);
  let currentSum = 0;

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    // target = num0 + num1 + num2 ... - numN
    // numN = num0 + num1 + num2 - target
    if (sumIndex.has(currentSum - target)) {
      return [sumIndex.get(currentSum - target) + 1, i];
    }
    sumIndex.set(currentSum, i);
  }
  return [];
}

// subarraySum([1, 4, 20, 3, 10, 5], 33) should return [2, 4] because the subarray from index 2 to index 4 sums to 33.
// index    num     currentSum   currentSum - target
// 0         1         1               -32
// 1         4         5               -28
// 2         20        25              -8
// 3         3         28              -5
// 4         10        38               5
// 5         5         43               10

// subarraySum([1, 2, 3], 3) should return [0, 1] because the subarray from index 0 to index 1 sums to 3.
// index    num     currentSum   currentSum - target
// 0         1         1               -2
// 1         2         3                0
// 2         3         6                3
