// For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).
// Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

// Example 1:

// Input: str1 = "ABCABC", str2 = "ABC"
// Output: "ABC"
// Example 2:

// Input: str1 = "ABABAB", str2 = "ABAB"
// Output: "AB"
// Example 3:

// Input: str1 = "LEET", str2 = "CODE"
// Output: ""

// Constraints:

// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of English uppercase letters.

// TC: O(n+m), we are comparing two concatenated strings
// SC: O(n+m), we are comparing two concatenated strings

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

var gcdOfStrings = function (str1, str2) {
  // Compare the concatenation of the two strings
  if (str1 + str2 !== str2 + str1) {
    return "";
  }

  // We need to compute the GCD of two lengths
  let gcdLength = gcd(str1.length, str2.length);

  // The GCD of Strings can be computed as
  return str1.slice(0, gcdLength);
};
