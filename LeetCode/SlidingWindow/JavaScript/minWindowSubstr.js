// Given two strings s and t of lengths m and n respectively, return the minimum window
// substring
//  of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

// The testcases will be generated such that the answer is unique.

// Example 1:

// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
// Example 2:

// Input: s = "a", t = "a"
// Output: "a"
// Explanation: The entire string s is the minimum window.
// Example 3:

// Input: s = "a", t = "aa"
// Output: ""
// Explanation: Both 'a's from t must be included in the window.
// Since the largest window of s only has one 'a', return empty string.

// Constraints:

// m == s.length
// n == t.length
// 1 <= m, n <= 105
// s and t consist of uppercase and lowercase English letters.

// Follow up: Could you find an algorithm that runs in O(m + n) time?

// TC: O(n) we're doing one pass of all elements in s
// SC: O(n) worst case scenario we have unique elements we we fill our maps

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // Edge case
  if (t === "") return "";

  let countT = {}; // This represents the chars we need to have
  let window = {}; // This represent the chars we currently have on the window. We update it as we slide our window.

  // Get a count of each chars of t. This represents the chars we need for the substring
  for (const c of t) {
    if (countT[c]) {
      countT[c] += 1;
    } else {
      countT[c] = 1;
    }
  }

  // console.log(countT)

  let have = 0; // We update it every time we see chars that we need
  let need = Object.keys(countT).length; // This represent the number of chars that we need for the substring. The countT map holds the count of the chars we need. Because this is an object, we'll get the length using Object.keys(obj1).length
  let res = [-1, -1]; // Initialized with default
  let resLen = Infinity; // Initialize with large value
  let l = 0; // This is our l pointer

  // We'll use sliding window to move through chars in s
  // We'll move the r pointer first until we find all the chars in t
  // Then, we'll the l pointer until we find a substr that is minimum in length
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    // console.log(c)

    // Check our window map if we have the current char and update it
    if (window[c]) {
      window[c] += 1;
    } else {
      window[c] = 1;
    }

    // console.log(window)

    // Check if this satisfy the condition?
    // Check if c is in our countT map and
    // Check if the count of c is equal, then update our have count
    if (c in countT && window[c] === countT[c]) {
      have += 1;
      // console.log("have: ", have)
    }

    // console.log("have: " + have + "need: " + need)
    // Let's move the l pointers and update our result
    while (have === need) {
      if (r - l + 1 < resLen) {
        res = [l, r];
        resLen = r - l + 1;
      }

      // console.log("res1: ", res )
      // We shrink the window by moving the l pointer
      // Make sure we remove chars from the window map and update our have count
      window[s[l]] -= 1;

      // If count if s[l] is less in window than in countT map,
      // we need to decrement our have variable
      if (s[l] in countT && window[s[l]] < countT[s[l]]) {
        have -= 1;
      }

      // Lastly, we increment our l pointer
      l++;
    }
  }

  // We need to return the minimun substring, we get the index from the res array
  let [lp, rp] = res;
  // console.log("res2: ", lp, rp )

  // Check if resLen was updated, if so, we return the s starting from index l to r + 1, else and empty string
  return resLen !== Infinity ? s.slice(lp, rp + 1) : "";
};
