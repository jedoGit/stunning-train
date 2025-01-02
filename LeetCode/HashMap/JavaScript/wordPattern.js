// Given a pattern and a string s, find if s follows the same pattern.

// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:

// Each letter in pattern maps to exactly one unique word in s.
// Each unique word in s maps to exactly one letter in pattern.
// No two letters map to the same word, and no two words map to the same letter.

// Example 1:

// Input: pattern = "abba", s = "dog cat cat dog"

// Output: true

// Explanation:

// The bijection can be established as:

// 'a' maps to "dog".
// 'b' maps to "cat".
// Example 2:

// Input: pattern = "abba", s = "dog cat cat fish"

// Output: false

// Example 3:

// Input: pattern = "aaaa", s = "dog cat cat dog"

// Output: false

// Constraints:

// 1 <= pattern.length <= 300
// pattern contains only lower-case English letters.
// 1 <= s.length <= 3000
// s contains only lowercase English letters and spaces ' '.
// s does not contain any leading or trailing spaces.
// All the words in s are separated by a single space.

// TC: O(r+n), we have to split the words in string s with length r, and we visit each chars in pattern (n).
// SC: O(m+n) => O(n), we have 2 hashmaps to store k/v pairs. m is number words after we split string s and n is
// number of chars in pattern. This will end up as O(n) because m and n are equal.

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.split(" "); // We need to create an array of words from the input s
  // We need to make sure that the length of the list of words is equal to the length
  // of the number of chars in the pattern string.
  if (pattern.length !== words.length) {
    return false;
  }

  // We'll use a JS Object to keep track of k/v pairs
  let charToWord = {};
  let wordToChar = {};

  // console.log(pattern, words)

  // Since we know that both the pattern and words array should have the same length,
  // we'll use the pattern lenght to bound the for-loop
  for (let i = 0; i < pattern.length; i++) {
    let c = pattern[i];
    let w = words[i];
    // console.log( c, w)
    // console.log(wordToChar, charToWord)

    // if ( !(c in charToWord) ) {
    //     charToWord[c] = ""
    // }
    // if ( !(w in wordToChar) ) {
    //     wordToChar[w] = ""
    // }

    if (c in charToWord && charToWord[c] !== w) {
      // console.log( c + " is not in charToWord. " + w )
      return false;
    }

    // console.log(wordToChar[w])
    // I had to add the object.hasOwnProperty(key) here... for some reason, it does not
    // work without it. Ref: https://www.geeksforgeeks.org/how-to-get-a-key-in-a-javascript-object-by-its-value/
    if (
      w in wordToChar &&
      wordToChar.hasOwnProperty(w) &&
      wordToChar[w] !== c
    ) {
      // console.log( w + " is not in wordToChar. " + c )
      return false;
    }

    charToWord[c] = w;
    wordToChar[w] = c;
  }
  return true;
};
