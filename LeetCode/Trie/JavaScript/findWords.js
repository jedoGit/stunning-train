// Given an m x n board of characters and a list of strings words, return all words on the board.

// Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

// Example 1:

// Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]
// Example 2:

// Input: board = [["a","b"],["c","d"]], words = ["abcb"]
// Output: []

// Constraints:

// m == board.length
// n == board[i].length
// 1 <= m, n <= 12
// board[i][j] is a lowercase English letter.
// 1 <= words.length <= 3 * 104
// 1 <= words[i].length <= 10
// words[i] consists of lowercase English letters.
// All the strings of words are unique.

// TC:
// SC:

// Create a class for TrieNode() so we can use it to store the node information
// For the trie node, we want to keep track of the children of the root node
// For this application, it's used for a word search. So, each children of a root node will
// potentially have 26 children (case insensitive) or 52 (case sensitive).
// We use a Object so we can store K/V, where the char is the key, and the value assigned is a child trie node.
// Ex: this.root points to { "children": {},
//                           "endOfWord": false }
//
// Ex: "a": { "children": { "a": { "children": { "a": { "children": {},
//                                                       "endOfWord": false },
//                                 "endOfWord": false },
//                          "b": { "children": { "a": { "children": {},
//                                                      "endOfWord": false },
//                                 "endOfWord": false },
//                           ....
//                          "z": { "children": { "a": { "children": {},
//                                                      "endOfWord": false },
//                                 "endOfWord": false } },
//            "endOfWord": false }
// We also need a marker for the end of the word that was added. Boolean.

class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }

  // Create an entry of the input word to our prefix tree
  addWord(word) {
    let cur = this;
    for (let c of word) {
      if (!(c in cur.children)) {
        // you can also use !this.children[c]... both work because this.children is an object
        cur.children[c] = new TrieNode();
      }
      cur = cur.children[c];
    }
    cur.endOfWord = true;
  }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  // We need to implement a prefix tree search algorithm using a Trie data structure

  // First add each words in the input word array to our prefix tree
  let root = new TrieNode();

  for (let w of words) {
    root.addWord(w);
  }

  // Now let's setup to DFS our board
  const m = board.length;
  const n = board[0].length;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let visited = new Set();
  let res = new Set();

  // This is our DFS helper function
  function DFS(r, c, node, word) {
    // Check if we're out of bound, if so, just return
    if (r < 0 || r > m - 1 || c < 0 || c > n - 1) return;
    // If we've visited this cell before, no need to revisit it
    if (visited.has([r, c].join())) return;
    // If this board value is not in our prefix tree
    if (!(board[r][c] in node.children)) return; // Remember node.children is an object!

    // We're not out of bound and we've not visited this, so let's process it
    // First add it to the visited set
    visited.add([r, c].join());

    node = node.children[board[r][c]]; // node.children is an object
    word += board[r][c];

    // Check if for this current node, we've reach the end of the word, if so, add the word to our result set
    if (node.endOfWord) {
      res.add(word);
    }

    // Then, let's DFS on 4 directions
    for (let [dr, dc] of dirs) {
      DFS(r + dr, c + dc, node, word);
    }

    // Here, we're backtracking and remove the r,c from our visited list
    visited.delete([r, c].join());

    return;
  }

  // Loop through each position on the board and check our prefix tree if there are words we can assemble that exists in our input word list
  // If so, add the word to our res array. Mark each cell we visited in the board as visited.
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (!visited.has([i, j].join())) {
        DFS(i, j, root, "");
      }
    }
  }

  return Array.from(res); // Returns the values as an array
};
