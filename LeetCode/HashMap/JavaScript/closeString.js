// Two strings are considered close if you can attain one from the other using the following operations:

// Operation 1: Swap any two existing characters.
// For example, abcde -> aecdb
// Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
// For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
// You can use the operations on either string as many times as necessary.

// Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

// Example 1:

// Input: word1 = "abc", word2 = "bca"
// Output: true
// Explanation: You can attain word2 from word1 in 2 operations.
// Apply Operation 1: "abc" -> "acb"
// Apply Operation 1: "acb" -> "bca"
// Example 2:

// Input: word1 = "a", word2 = "aa"
// Output: false
// Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
// Example 3:

// Input: word1 = "cabbba", word2 = "abbccc"
// Output: true
// Explanation: You can attain word2 from word1 in 3 operations.
// Apply Operation 1: "cabbba" -> "caabbb"
// Apply Operation 2: "caabbb" -> "baaccc"
// Apply Operation 2: "baaccc" -> "abbccc"

// Constraints:

// 1 <= word1.length, word2.length <= 105
// word1 and word2 contain only lowercase English letters.

// TC: O(n) , we're doing multiple loops here
// SC: O(n) , we're creating multiple memories here

/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var closeStrings = function (word1, word2) {
  // Two conditions required for satisfying a close string:
  // 1. All UNIQUE characters present in String 1 should be available in String 2 & vice versa. (NOT CONSIDERING THEIR FREQUENCY).

  // If condition 1 is satisfied, then a Sorted Frequency Arr of One String should be the same as the Sorted Frequency Arr of the Other.
  // If both Conditions are true, then it's a closeString.

  // ================================
  // first we need to check if the size of the input is the same
  if (word1.length !== word2.length) return false;

  // At this point, we start building our maps. We'll use the map to
  // check for the frequency of each characters found
  let map1 = new Map();
  let map2 = new Map();

  for (let i = 0; i < word1.length; i++) {
    if (map1.has(word1[i])) {
      let temp = map1.get(word1[i]);
      temp++;
      map1.set(word1[i], temp);
    } else {
      map1.set(word1[i], 1);
    }

    if (map2.has(word2[i])) {
      let temp = map2.get(word2[i]);
      temp++;
      map2.set(word2[i], temp);
    } else {
      map2.set(word2[i], 1);
    }
  }

  // We then check if all unique chars in word1 is also in word2
  // We'll use set for this. A set does not allo duplicates so, this is a
  // good DS structure to use to compare the two input arrays
  let set1 = new Set(word1);
  let set2 = new Set(word2);

  for (let num of set1) {
    if (!set2.has(num)) {
      return false;
    }
  }

  // Now, we check for the frequency of each chars in the map.
  // We sort the values (ascending order) of the map, and after sorting, each index should have the same values
  // Since the character count is in our maps, we'll use the rest operator to move the map values to an array so
  // we can sort the values in the array.

  let val1 = [...map1.values()]; //.sort((a,b) => {return a-b})
  let val2 = [...map2.values()]; //.sort((a,b) => {return a-b})

  val1.sort((a, b) => {
    return a - b;
  });
  val2.sort((a, b) => {
    return a - b;
  });

  //console.log(val1, val2)
  for (let i = 0; i < val1.length; i++) {
    if (val1[i] !== val2[i]) {
      return false;
    }
  }

  return true;
};
