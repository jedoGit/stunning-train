// Your task is to write a function called longestConsecutiveSequence that takes a list of numbers as input.
// Your function should find and return the length of the longest consecutive sequence of numbers in the list.

// Example 1:
// Input: [1, 2, 3, 4, 5]
// Output: 5
// In this example, the numbers 1, 2, 3, 4, and 5 form a consecutive sequence, and the length is 5.

// Example 2:
// Input: [1, 3, 5, 2, 4]
// Output: 5

// Here, even though the numbers are not in order, they still form a consecutive sequence when arranged.So the length is 5.

// Example 3:
// Input: [2, 1, 4, 7, 3]
// Output: 4

// In this example, when arranged in order, the numbers 1, 2, 3, and 4 form a consecutive sequence. So, the length is 4.

// Example 4:
// Input: [9, 1, 3, 10, 2, 20, 21]
// Output: 3

// Here, the longest consecutive sequence is 1, 2, 3. The length is 3.

// Example 5:
// Input: [100, 4, 200, 1, 3, 2]
// Output: 4

// In this example, the longest consecutive sequence is 1, 2, 3, and 4. The length is 4.

// Example 6:
// Input: []
// Output: 0

// In this case, the list is empty.Therefore, the length of the longest consecutive sequence is 0.

// Requirements
// Your function should take a list of numbers as input.
// The function should return a single number, which is the length of the longest consecutive sequence.

// Notes
// The numbers in the list can be in any order.
// If the list is empty, the function should return 0.
// The sequence has to be consecutive numbers (e.g., 1, 2, 3...) but they don't have to be in order in the list.

// function longestConsecutiveSequence(nums) {
//   const numSet = new Set();

//   // Add all nums to the set. This will remove any duplicates.
//   for (const num of nums) {
//     numSet.add(num);
//   }

//   let longestStreak = 0;

//   //[1, 3, 5, 2, 4]

//   for (const num of numSet) {
//     // check the set if there's a number that is 1 less than the current number
//     // if there is, save the value of the longest streak
//     // if not, it means you need to start checking to the right of the current number
//     // if they are 1 more than the current number
//     if (!numSet.has(num - 1)) {
//       // since there's no number to the left of the current number that is 1 less,
//       // we reset our streak count and start checking to the right
//       let currentNum = num;
//       let currentStreak = 1;

//       // we check the number to the right if it's 1 more than the current
//       while (numSet.has(currentNum + 1)) {
//         currentNum++;
//         currentStreak++;
//       }

//       longestStreak = Math.max(longestStreak, currentStreak);
//     }
//   }

//   return longestStreak;
// }

function longestConsecutiveSequence(nums) {
  const numSet = new Set();

  // add the array to the set so we can look up the values
  for (const num of nums) {
    numSet.add(num);
  }

  let longestSequenceLength = 0;

  // now, we want to check each elements of the set for consecutive occurence and count how long it is
  // we need to loop through the set.
  for (const num of numSet) {
    // first, check the set if current number we're checking has no number in the left that is 1 less.
    // if there's none, we start checking and we check if there's a sequence of numbers to the right
    // and count the length of that sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      // we check the numbers to the right of the current number if it is 1 more than the current
      // if it is, we increment the current number and the current lenght
      // we stop until it's not 1 more than the current number.
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      // we update our longestSequenceLength
      // there might be multiple sequences in array so we update the current value and
      // update it by checking the max between longestSequenceLength and currentlength
      longestSequenceLength = Math.max(currentLength, longestSequenceLength);
    }
  }

  // return the longestSequenceLength
  return longestSequenceLength;
}
