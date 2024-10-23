// Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.

// Example 1:

// Input: arr = [1,2,2,1,1,3]
// Output: true
// Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.
// Example 2:

// Input: arr = [1,2]
// Output: false
// Example 3:

// Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
// Output: true

// Constraints:

// 1 <= arr.length <= 1000
// -1000 <= arr[i] <= 1000

// TC: O(n) , we use 2 loops
// SC: O(n) , we use created a map and a set

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  // Here we'll use a Map to store the number of occurence for each of the element
  let myMap = new Map();

  // We loop through the input array and check our map if we've already added it in the past iteration and increment the count
  for (let num of arr) {
    if (myMap.has(num)) {
      let tempCount = myMap.get(num);
      tempCount++;
      myMap.set(num, tempCount);
    } else {
      myMap.set(num, 1);
    }
  }

  // Now, we check the values saved in the Map are not repeating, which means the values are unique.
  // We'll use set here...
  let mySet = new Set();
  for (let val of myMap.values()) {
    if (mySet.has(val)) {
      return false;
    } else {
      mySet.add(val);
    }
  }

  return true;
};
