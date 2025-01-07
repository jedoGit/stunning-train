// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

// You must write an algorithm that runs in O(n) time.

// Example 1:

// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
// Example 2:

// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9

// Constraints:

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109

// TC: O(n), we'll have to visit all elements of nums
// SC: O(n), we're using a set as LUT, it is the same size as nums array

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // Create a set from the nums array. Here using the rest operator to perform
  // a deep copy of the array
  let numSet = new Set([...nums]);
  let longest = 0; // This is used to capture the longest length value
  // console.log(numSet)

  // Let's go through all the elements of the set
  // then check if it's a start of a sequence... it's a start of a sequence
  // if the value n-1 does not exist
  for (let n of numSet) {
    // console.log(n)
    // Check if its the start of a sequence
    // It is a start of the sequence if to the left of the number,
    // the number n-1 does not exist
    if (!numSet.has(n - 1)) {
      // This is start of a sequence... then keep checking the set if the
      // value n+1 exist and if so, keep doing it until it's not
      // increment the length value by 1 each time.
      // After which, update the max longest value
      let length = 0;
      while (numSet.has(n + length)) {
        length += 1;
      }
      longest = Math.max(length, longest);
    }
  }

  return longest;
};
