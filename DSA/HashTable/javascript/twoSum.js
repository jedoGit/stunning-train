// In this exercise, you are tasked with writing a JavaScript function called twoSum.
// The function should accept an array of integers(nums) and an integer(target).
// Your task is to find two numbers in the array that sum up to the target integer.
// The function should return an array containing the indices of these two numbers.
// If no such numbers exist, return an empty array.

// Examples:
// twoSum([2, 7, 11, 15], 9) should return [0, 1] because nums[0] + nums[1] = 2 + 7 = 9.
// twoSum([3, 2, 4], 6) should return [1, 2] because nums[1] + nums[2] = 2 + 4 = 6.

// There are two primary types of hash tables you can use for this exercise:
// Map: A built-in object in JavaScript that allows you to store key-value pairs.
// Object: Another built-in data structure in JavaScript can also be used as a hash table to store key-value pairs.

function twoSum(arrNums, target) {
  const numMap = new Map();

  // We want to iterate through the arrNums and compute this: complement = target - arrNum[i]
  // complement is the number we want to search from the input arrNum: target = complement + arrNum[i]

  for (let i = 0; i < arrNums.length; i++) {
    const num = arrNums[i];
    const complement = target - num;

    // Check if we already have complement in our numMap, if so, return the value, if not add it to numMap
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(num, i);
  }

  return [];
}

// More Compact solution: TC: O(n), SC: O(nLog(n))

function twoSum(arrNums, target) {
  const numMap = new Map();

  // Use iterables
  for (let [i, n] of arrNums.entries()) {
    const complement = target - n;

    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }

    numMap.set(n, i);
  }

  return [];
}
