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
  if (!s.length || !words.length) return [];

  let word_freq = {};

  for (let word of words) {
    if (word_freq[word]) {
      word_freq[word] += 1;
    } else {
      word_freq[word] = 1;
    }
  }

  const word_len = words[0].length;
  const window_len = words.length * word_len;

  let res = [];

  for (let i = 0; i < s.length - window_len + 1; i++) {
    let substr_freq = {};
    let j = i;

    while (j < i + window_len) {
      let cur_word = s.slice(j, j + word_len);

      if (!(cur_word in word_freq)) {
        // console.log("Not here!")
        break;
      }

      // console.log(cur_word)

      if (substr_freq[cur_word]) {
        substr_freq[cur_word] += 1;
      } else {
        substr_freq[cur_word] = 1;
      }

      // console.log(substr_freq)

      if (substr_freq[cur_word] > word_freq[cur_word]) {
        break;
      }

      j += word_len;
    }

    if (j === i + window_len) {
      res.push(i);
    }
  }

  return res;
};
