// Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.

// Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

// Example 1:

// Input: s = "abciiidef", k = 3
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.
// Example 2:

// Input: s = "aeiou", k = 2
// Output: 2
// Explanation: Any substring of length 2 contains 2 vowels.
// Example 3:

// Input: s = "leetcode", k = 3
// Output: 2
// Explanation: "lee", "eet" and "ode" contain 2 vowels.

// Constraints:

// 1 <= s.length <= 105
// s consists of lowercase English letters.
// 1 <= k <= s.length

// TC: O(n) we're looping only one time
// SC: O(1) we're doing in-place processing, but we're using a Set as lookup table for our vowels

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  let rp = 0;
  let lp = 0;
  let maxVowelCount = -Infinity;
  let vowelSet = new Set(["a", "e", "i", "o", "u"]);
  let windowVowelCount = 0;

  // Let' find the vowels on the first k elements
  // then update the maxVowelCount

  while (rp < k) {
    if (vowelSet.has(s[rp])) {
      windowVowelCount++;
    }
    rp++;
  }

  // At this point, rp has a value of k (we're 0 index based)

  maxVowelCount = windowVowelCount;

  // Now that we created the window, we' continue by using the sliding window
  // algorithm. If you do a bruteforce calculation, you'll notice that
  // algorithm is=> windowVowelCount = windowVowelCount - the vowel leaving the sliding window
  //                             + the vowel entering the sliding window
  while (rp < s.length) {
    let vowelLeaving = vowelSet.has(s[lp]) ? 1 : 0;
    let vowelEntering = vowelSet.has(s[rp]) ? 1 : 0;

    windowVowelCount =
      windowVowelCount - // This is the previous windowVowelCount
      vowelLeaving + // This is the vowel that left the sliding window
      vowelEntering; // This is the vowel entering the sliding window

    // Slide the window
    lp++;
    rp++;

    // Update the maxVowelCount
    maxVowelCount = Math.max(maxVowelCount, windowVowelCount);
  }

  return maxVowelCount;
};
