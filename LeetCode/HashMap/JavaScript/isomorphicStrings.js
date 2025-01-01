// Given two strings s and t, determine if they are isomorphic.

// Two strings s and t are isomorphic if the characters in s can be replaced to get t.

// All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

// Example 1:

// Input: s = "egg", t = "add"

// Output: true

// Explanation:

// The strings s and t can be made identical by:

// Mapping 'e' to 'a'.
// Mapping 'g' to 'd'.
// Example 2:

// Input: s = "foo", t = "bar"

// Output: false

// Explanation:

// The strings s and t can not be made identical as 'o' needs to be mapped to both 'a' and 'r'.

// Example 3:

// Input: s = "paper", t = "title"

// Output: true

// Constraints:

// 1 <= s.length <= 5 * 104
// t.length == s.length
// s and t consist of any valid ascii character.

// TC: O(n) we're accessing each elements of the string
// SC: O(n) we're using 2 Hashmaps to store values of size n

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  // We'll two maps and compare the k/v
  let mapST = {};
  let mapTS = {};

  // Since s and t have the same length, we'll just use s here..
  for (let i = 0; i < s.length; i++) {
    // Access the chars of s and t
    let c1 = s[i];
    let c2 = t[i];

    // Here, we check if c1 is a key in mapST and this key is not equal to c2
    // Also, check if c2 is a key in mapTS and this key is not equal to c1
    if (
      (c1 in mapST && mapST[c1] !== c2) ||
      (c2 in mapTS && mapTS[c2] !== c1)
    ) {
      return false;
    }

    // here we're just adding the k/v to the maps
    mapST[c1] = c2;
    mapTS[c2] = c1;
  }

  return true;
};
