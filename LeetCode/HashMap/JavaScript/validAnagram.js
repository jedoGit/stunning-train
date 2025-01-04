// Given two strings s and t, return true if t is an
// anagram
//  of s, and false otherwise.

// Example 1:

// Input: s = "anagram", t = "nagaram"

// Output: true

// Example 2:

// Input: s = "rat", t = "car"

// Output: false

// Constraints:

// 1 <= s.length, t.length <= 5 * 104
// s and t consist of lowercase English letters.

// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

// TC: O(n+m), O(n) since both s and t need to have same length. We're going to visit each elements of s and t, first to create a hashmap then to compare the hashmaps.
// SC: O(n+m), O(n) since both s and t need to have same length. We're going to create a hashmap for both s and t

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  // Without using hashmap, we can first sort s and t then compare the sorted string.
  // Both s and t need to have the same length
  if (s.length !== t.length) {
    return false;
  }

  // Using hashmap
  let countS = {};
  let countT = {};

  // Create the char counter for s and t
  for (let i = 0; i < s.length; i++) {
    if (s[i] in countS) {
      countS[s[i]] += 1;
    } else {
      countS[s[i]] = 1;
    }

    if (t[i] in countT) {
      countT[t[i]] += 1;
    } else {
      countT[t[i]] = 1;
    }
  }

  // Now let's compare the two hashmaps
  for (let c in countS) {
    if (countS[c] !== countT[c]) {
      return false;
    }
  }

  return true;
};
