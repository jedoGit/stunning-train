// In this exercise, your task is to write a JavaScript function named firstNonRepeatingChar.
// The function will take a string as its only parameter.Your goal is to find and return the
// first character in the string that does not repeat.If every character in the string repeats,
// or if the string is empty, the function should return null.

// Examples:
// firstNonRepeatingChar("aabbcc") should return null because all the characters appear more than once.
// firstNonRepeatingChar("aabbcde") should return 'c' because it's the first non-repeating character.

// You can solve this problem using either of the two types of hash tables available in JavaScript:
// Map: A built-in object that lets you store key-value pairs in an organized manner.
// Object: A fundamental data structure in JavaScript that can also be used as a hash table for storing key-value pairs.

function firstNonRepeatingChar(str) {
  const charCount = new Map();

  // let's loop through the str and count each char and save to the map
  for (let chr of str) {
    // check if chr is already in the map, if so, get the value else set count to 0.
    const count = charCount.get(chr) || 0;

    // add the chr and count to the map and increment count everytime.
    charCount.set(chr, count + 1);
  }

  // Now, loop through the str array again and check the map if the count is equal 1 for that char. If equal to 1 that char is "firstNonRepeatingChar".
  for (let i = 0; i < str.length; i++) {
    if (charCount.get(str[i]) === 1) {
      return str[i];
    }
  }

  return null;
}
