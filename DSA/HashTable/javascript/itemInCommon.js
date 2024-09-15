// In this exercise, you are tasked with writing a JavaScript function named itemInCommon. This function should take two arrays as its parameters. The goal of the function is to determine whether the two arrays have at least one element in common.
// If there is at least one common element between the two arrays, your function should return true. If there are no common elements, the function should return false.

// Examples:
// itemInCommon([1, 3, 5], [2, 4, 5]) should return true because both arrays contain the number 5.
// itemInCommon([1, 3, 5], [2, 4, 6]) should return false because there are no common items.

// You can use two types of hash tables to solve this problem in JavaScript:
// Map: A built-in object that allows you to store key-value pairs.
// Object: The most basic data structure in JavaScript, which can also act like a hash table for key-value storage.

function itemInCommon(array1, array2) {
  const myMap = new Map();

  // We want to save the value of each index in array1 as the key
  // and for each key, we want to set it to true.

  // Array1 is an iterable object, we use for-of loop
  // "i" is the value of each index in array1
  for (let i of array1) {
    myMap.set(i, true);
  }

  // Now, let's check if each values in array2 exists in Array1
  for (let j of array2) {
    if (myMap.has(j)) {
      return true;
    }
  }

  return false;
}
