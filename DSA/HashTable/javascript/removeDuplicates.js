// Your task is to write a function called removeDuplicates that takes a list of numbers or letters as input.
// This list can have some items that appear more than once.
// Your function should return a new list where each number or letter only appears once.

// Example
// Input: [1, 2, 2, 3, 4, 4, 4]
// Output: [1, 2, 3, 4]

// In this example, the numbers 2 and 4 appear more than once in the list. The function removes the extra copies, so each number only appears one time.

// Requirements
// The function should take a list as an input.
// The function should return a new list.
// Each item in the new list should only appear once.

// Notes
// The order of items in the output list does not matter.
// It's okay if your function changes the order of the items.
// You can assume the list only contains numbers or letters.

function removeDuplicates(nums) {
  const dataSet = new Set();

  // Use a list. A Set is similar to a Map except it only holds the key. Also, a Set does not allow duplicate values.
  // What we want to do is loop through to the input array and add it to the Set.
  for (let i = 0; i < nums.length; i++) {
    dataSet.add(nums[i]);
  }

  // Finally, return the entries on the Set as an Array
  return Array.from(dataSet);
}

// function removeDuplicates(nums) {
//   // Use a list. A Set is similar to a Map except it only holds the key. Also, a Set does not allow duplicate values.
//   const dataSet = new Set(nums);

//   // Finally, return the entries on the Set as an Array
//   return Array.from(dataSet);
// }
