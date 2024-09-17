// Your task is to write a function named hasUniqueChars that takes a string as input.
// Your function should check if all the characters in the string are unique or not.
// In other words, no character should appear more than once in the string.

// Example
// Input: "hello"
// Output: false
// In this example, the letter 'l' appears two times in the word "hello". So, the function should return false.

// Example
// Input: "world"
// Output: true
// In this example, all the letters are unique, so the function should return true.

// Requirements
// Your function should take a string as an input.
// The function should return a Boolean value: true if all characters are unique, and false otherwise.

// Notes
// The function should consider upper-case and lower-case letters as different. For example, 'A' and 'a' should be considered unique.
// An empty string should return true as it doesn't have any repeated characters.

function hasUniqueChars(str) {
  // We will use a Set. Set is similar to a Map but does not allow duplicates.
  // We want to loop through each chars in the string input and check if we have already added it to the Set.
  // If present in the Set, then return false.
  // If not Present in the Set, add the char to the Set and continue.
  // Perform until all chars in the String have been processed.
  // If we exit the loop, it means there's no duplicate. Return true.
  const dataSet = new Set();

  for (i = 0; i < str.length; i++) {
    if (dataSet.has(str[i])) {
      return false;
    }
    dataSet.add(str[i]);
  }
  return true;
}
