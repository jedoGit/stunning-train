// Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

// You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

// Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

// For the last line of text, it should be left-justified, and no extra space is inserted between words.

// Note:

// A word is defined as a character sequence consisting of non-space characters only.
// Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
// The input array words contains at least one word.

// Example 1:

// Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
// Output:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]
// Example 2:

// Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
// Output:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]
// Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
// Note that the second line is also left-justified because it contains only one word.
// Example 3:

// Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
// Output:
// [
//   "Science  is  what we",
//   "understand      well",
//   "enough to explain to",
//   "a  computer.  Art is",
//   "everything  else  we",
//   "do                  "
// ]

// Constraints:

// 1 <= words.length <= 300
// 1 <= words[i].length <= 20
// words[i] consists of only English letters and symbols.
// 1 <= maxWidth <= 100
// words[i].length <= maxWidth

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  let res = []; // This will hold our results
  let line = []; // This is the current line of the justified words we are currently processing
  let length = 0; // This is the length of the words of the current line we're processing without spaces
  let i = 0; // This is our index to each words in the string array

  // We want to loop through each words in the string array
  while (i < words.length) {
    // Check if the length of the current line we're processing, the length of the current word we're processing
    // and the length of incoming word we're about to process will fit on the max width for each line
    // If so, we need to process the spaces between words
    if (length + line.length + words.at(i).length > maxWidth) {
      // Line Complete
      // Calculate the extra spaces we need
      let extra_space = maxWidth - length; // Compute the space remaining after we added the current word on the the current line
      let spaces = (extra_space / Math.max(1, line.length - 1)) | 0; // Integer division.... This computes the spaces in between the words in the current line
      let remainder = extra_space % Math.max(1, line.length - 1); // If we don't have an even number of extra spaces computed, we need to compute the remainder and distribute the spaces starting from left.

      // Add the spaces between the words in the current line
      for (let j = 0; j < Math.max(1, line.length - 1); j++) {
        line[j] += " ".repeat(spaces);
        if (remainder) {
          line[j] += " ";
          remainder -= 1;
        }
      }
      // We convert the current line to string then push to our results array
      res.push(line.join(""));
      // Reset these vars before processing the next line
      line = [];
      length = 0;
    }
    // push the words to the current line for processing... without spaces.
    line.push(words[i]);
    length += words[i].length;
    i += 1;
  }
  // Handling last line
  // The last line need to be left justified... convert it to string by adding spaces between the words
  // Also, we need to add trailing spaces
  let last_line = line.join(" ");
  let trail_space = maxWidth - last_line.length;
  res.push(last_line + " ".repeat(trail_space));

  return res;
};
