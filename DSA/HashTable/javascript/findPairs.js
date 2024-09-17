// Your task is to write a function named findPairs that takes in two lists of numbers (arr1 and arr2) and a target number (target).
// The function should find all pairs where one number from arr1 and one number from arr2 sum up to the target number.
// The function should return these pairs as a list.

// Example
// Input: arr1 = [1, 2, 3], arr2 = [4, 5, 6], target = 7
// Output: [[1, 6], [2, 5], [3, 4]]

// In this example, 1 from arr1 and 6 from arr2 add up to 7. Similarly, 2 and 5, and 3 and 4 also add up to 7. So, the function returns these pairs.

// Requirements
// The function should take in two lists of numbers (arr1 and arr2) and a target number (target).
// The function should return a list of pairs that sum up to the target.

// Notes
// The numbers in arr1 and arr2 can be in any order.
// If no pairs are found that sum up to the target, return an empty list.
// Each pair should be a list where the first number is from arr1 and the second is from arr2.

function findPairs(arr1, arr2, target) {
  // We want to use a Set. We save arr1 to the set.
  // Loop through arr2 and check if target - arr2[i] exists in the the arr1 Set.
  // If exists, add to an output array [target-arr2[i], arr2[i]]
  // Perform for all of arr2 values

  const arr1Set = new Set(arr1);
  let retArr = [];

  //   for (const value of arr1) {
  //     arr1Set.add(value);
  //   }

  for (const value of arr2) {
    if (arr1Set.has(target - value)) {
      retArr.push([target - value, value]);
    }
  }

  return retArr;
}
