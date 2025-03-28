// A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

// Every adjacent pair of words differs by a single letter.
// Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
// sk == endWord
// Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

// Example 1:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5
// Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
// Example 2:

// Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
// Output: 0
// Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

// Constraints:

// 1 <= beginWord.length <= 10
// endWord.length == beginWord.length
// 1 <= wordList.length <= 5000
// wordList[i].length == beginWord.length
// beginWord, endWord, and wordList[i] consist of lowercase English letters.
// beginWord != endWord
// All the words in wordList are unique.

// TC:
// SC:

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  // If the array wordList does not includes the endWord, return 0
  if (!wordList.includes(endWord)) {
    // console.log("not in wordlist")
    return 0;
  }

  // nei is a k/v where k is a pattern of words and v is an array of words from the wordList that match the pattern
  // nei = {"h*t":[hot, hit, hat], "*nt":[ant, int]}
  let nei = {};
  wordList.push(beginWord);

  // create an adjacency list
  // go through each words in the wordlist and match it to the pattern.
  // create a pattern for each word, hit=> *it, h*t, hi*. for each of these patterns, add the word to the nei.
  // example: "*it": [hit], "h*t":[hit], "hi*":[hit]

  for (let word of wordList) {
    // console.log(word)
    for (let j = 0; j < word.length; j += 1) {
      // create the pattern
      let pattern = word.slice(0, j) + "*" + word.slice(j + 1);
      // add pattern to nei object and add the word to the pattern created.
      if (!nei[pattern]) nei[pattern] = [];
      nei[pattern].push(word);
    }
  }

  // console.log(nei)
  // At this point we have the nei object... it's a list of the patterns and the words associated to tha pattern.
  // example: "*it": [hit], "h*t":[hit], "hi*":[hit]

  // We BFS each keys in nei
  let visited = new Set();
  // add beginWord as the initial value
  visited.add(beginWord);
  // console.log( visited)
  let q = [];
  q.push(beginWord);
  let res = 1;

  while (q.length) {
    let qLen = q.length;

    for (let i = 0; i < qLen; i += 1) {
      let word = q.shift();

      // console.log(word)

      // If word is equal to endWord, we're done and return res
      if (word === endWord) return res;

      // For the word we're currently processing, let's create all possible patterns and check the nei object and visit each pattern match
      // Each time, add the words we visited and add it to the q so we can BFS it next round
      for (let j = 0; j < word.length; j += 1) {
        let pattern = word.slice(0, j) + "*" + word.slice(j + 1);

        // if ( nei[pattern] ) console.log("nei[pattern] exist")
        // console.log(pattern)

        // nei[pattern] returns an array, so use for-of
        // process all words under this pattern
        for (let neiWord of nei[pattern]) {
          // console.log(neiWord)
          if (!visited.has(neiWord)) {
            visited.add(neiWord);
            q.push(neiWord);
          }
        }
      }
    }
    // increment res after every processing of word in the queue
    res += 1;
  }

  return 0;
};
