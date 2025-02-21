// Given a string s, return the number of segments in the string.

// A segment is defined to be a contiguous sequence of non-space characters.

// Example 1:

// Input: s = "Hello, my name is John"
// Output: 5
// Explanation: The five segments are ["Hello,", "my", "name", "is", "John"]
// Example 2:

// Input: s = "Hello"
// Output: 1

// Constraints:

// 0 <= s.length <= 300
// s consists of lowercase and uppercase English letters, digits, or one of the following characters "!@#$%^&*()_+-=',.:".
// The only space character in s is ' '.

// TC: O(n)
// SC: O((n/2) - 1) we used an array to store the segments such as "a a a a a a".

/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  if (s.length < 1) return 0;

  let p = 0;
  let curVal = "";
  let res = [];

  // console.log(s.length)
  while (p <= s.length) {
    // console.log(p, s.at(p))
    if (s.at(p) !== " " && p < s.length) {
      curVal += s.at(p);
      // console.log(p, curVal)
    } else if (
      (curVal.length > 0 && s.at(p) === " ") ||
      (curVal.length > 0 && p === s.length)
    ) {
      // console.log(p, curVal.length, curVal[0])
      res.push(curVal);
      curVal = "";
    }

    p += 1;
  }

  // console.log(res)

  return res.length;

  // return s.split(" ").filter(x => x !== "").length
};
