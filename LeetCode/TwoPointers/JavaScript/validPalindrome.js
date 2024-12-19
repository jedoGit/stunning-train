// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:

// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:

// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

// Constraints:

// 1 <= s.length <= 2 * 105
// s consists only of printable ASCII characters.

// TC: O(n) we're just looping through all the chars of the string
// SC: O(1) in place processing

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // JS has no method to check for alpha numeric... This functions checks if
  // 0-9, A-Z and a-z
  function isAlphaNumeric(str) {
    return /^[A-Za-z0-9]+$/gi.test(str);
    // return !(!(str.charCodeAt(0) > 47 && str.charCodeAt(0) < 58) &&
    //         !(str.charCodeAt(0) > 96 && str.charCodeAt(0) < 123) &&
    //         !(str.charCodeAt(0) > 64 && str.charCodeAt(0) < 91))
  }

  // Using two pointers starting at both ends of the array
  let l = 0;
  let r = s.length - 1;

  // We stop when l crosses r
  while (l < r) {
    // We keep moving l pointer if the char in non-alphanumeric
    while (l < r && !isAlphaNumeric(s.at(l))) {
      l += 1;
    }
    // Same with the r pointer...
    while (r > l && !isAlphaNumeric(s.at(r))) {
      r -= 1;
    }

    // console.log(s.at(l).toLowerCase(), s.at(r).toLowerCase())
    // We check if the lowercase of what's pointed by l and r is the same
    if (s.at(l).toLowerCase() !== s.at(r).toLowerCase()) {
      return false;
    }

    // we move l and r
    l += 1;
    r -= 1;
  }

  return true;
};
