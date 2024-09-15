// In this exercise, you are required to write a JavaScript function called findDuplicates.
// This function will take an array of numbers as its only parameter.Your goal is to identify and
// return all the numbers that appear more than once in the array.

// The function should return a new array containing the duplicate numbers.
// The function should return an empty array if there are no duplicate numbers.

// Examples:
// findDuplicates([1, 2, 3, 4, 4, 5, 6, 6]) should return [4, 6] because the numbers 4 and 6 appear more than once.
// findDuplicates([1, 2, 3]) should return [] because there are no duplicate numbers.

// To solve this problem, you can use one of two types of hash tables available in JavaScript:
// Map: A built-in object that lets you store key-value pairs in an organized manner.
// Object: A fundamental data structure in JavaScript that can also be used as a hash table for storing key-value pairs.

function findDuplicates(nums) {
  // What we want to do is for each values in the nums array, we want to save it to a Map with the array entries as the key
  // and the number of times it exists in the nums array as the value.

  const numCount = new Map();

  for (let num of nums) {
    // Check if the number has been added to the Map. If it exists, get that number, else set it to 0
    // Remember 1 OR 0 = 1, 0 OR 0 = 0
    let count = numCount.get(num) || 0;

    // Add num to the Map, increment the count everytime you add to the map
    numCount.set(num, count + 1);
  }

  // This is our duplicate array
  const duplicates = [];

  // Loop through the K/V in the map, if any values are greater than 1, add the key to the duplicate array
  for (let [k, v] of numCount.entries()) {
    if (v > 1) {
      duplicates.push(k);
    }
  }

  return duplicates;
}
