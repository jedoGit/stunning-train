// You are given a string s and an array of strings words. All the strings of words are of the same length.

// A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

// For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
// Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.

// Example 1:

// Input: s = "barfoothefoobarman", words = ["foo","bar"]

// Output: [0,9]

// Explanation:

// The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
// The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

// Example 2:

// Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

// Output: []

// Explanation:

// There is no concatenated substring.

// Example 3:

// Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

// Output: [6,9,12]

// Explanation:

// The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
// The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
// The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].

// Constraints:

// 1 <= s.length <= 104
// 1 <= words.length <= 5000
// 1 <= words[i].length <= 30
// s and words[i] consist of lowercase English letters.

// TC:
// SC:

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  // Edge case
  if (!s.length || !words.length) return [];

  // Let's get a map of the words we need to check
  let word_freq = {};

  for (let word of words) {
    if (word_freq[word]) {
      word_freq[word] += 1;
    } else {
      word_freq[word] = 1;
    }
  }

  // We need these lengths in order to update our window
  const word_len = words[0].length; // represents the length of word at index 0
  const window_len = words.length * word_len; // represents the length of the window

  let res = [];

  // We'll loop through each char of s and slide the window
  // Let's create a window by using r + window_len
  // In this window, let's set the current word of s and check of each word is in our need word list
  for (let r = 0; r < s.length - window_len + 1; r++) {
    let substr_freq = {};
    let l = r;

    // let's check window length at a time
    while (l < r + window_len) {
      // in our window, let's check the word we need
      let cur_word = s.slice(l, l + word_len);

      // If the current word does not exist in our required word map, we break the while loop
      if (!(cur_word in word_freq)) {
        // console.log("Not here!")
        break;
      }

      // console.log(cur_word)

      // At this point, the current word is in our required word list
      // Now, let's create a map of our current word list.. This are the words we see in the window
      if (substr_freq[cur_word]) {
        substr_freq[cur_word] += 1;
      } else {
        substr_freq[cur_word] = 1;
      }

      // console.log(substr_freq)

      // Let's check if the number of words we see in our current word list is greater than the required word list
      // If so, we found all the words we need and let's break out of the while loop
      if (substr_freq[cur_word] > word_freq[cur_word]) {
        break;
      }

      // We keep going and slide our window
      l += word_len;
    }

    // At ths point, we exited the while loop and our l and r + window_len pointer overlapped
    // So we push index r to our results array
    if (l === r + window_len) {
      res.push(r);
    }
  }

  return res;
};
