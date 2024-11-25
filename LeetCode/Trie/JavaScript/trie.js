// A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

// Implement the Trie class:

// Trie() Initializes the trie object.
// void insert(String word) Inserts the string word into the trie.
// boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
// boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

// Example 1:

// Input
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// Output
// [null, null, true, false, true, null, true]

// Explanation
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // return True
// trie.search("app");     // return False
// trie.startsWith("app"); // return True
// trie.insert("app");
// trie.search("app");     // return True

// Constraints:

// 1 <= word.length, prefix.length <= 2000
// word and prefix consist only of lowercase English letters.
// At most 3 * 104 calls in total will be made to insert, search, and startsWith.

// =============================================================================
// This is similar to a BST instead, we use a map, key/val pair.
// For insert method, we check the chars of the word if it exists in our map.
// TC: O(n) for insert because at worst, we'll create a chain of trie node, one for each chars of the word
// SC: O(n) for insert because at worst, we'll create a chain of trie node, one for each chars of the word
// For search and startsWith method, we check the chars of the word if it exists in our map.
// TC: O(n) for insert because at worst, we all the trie nodes until we hit the endOfWord indicator
// SC: O(1) in place processing

class TrieNode {
  constructor() {
    this.children = {}; // This is an JS Object, Key/Value Pair
    this.endOfWord = false; // This need to be a boolean
  }
}

var Trie = function () {
  // This function will create a root variable by instantiating a TrieNode()
  // This is kind off the constructor of the Trie DS
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  // The insert method will check of each chars in the word is in the childrens map.
  // If not, we create a new trie node for that char. We do this until we check all chars and then we mark the endOfWord to true
  let current = this.root;

  for (const c of word) {
    if (!current.children[c]) {
      current.children[c] = new TrieNode();
    }
    current = current.children[c];
  }
  current.endOfWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  // The search method will check each chars in word if it exists in our children nodes.
  // If it does not exist, we return false. If we reach the end of the trie, we return the endOfWord boolean
  let current = this.root;

  for (const c of word) {
    if (!current.children[c]) {
      return false;
    }
    current = current.children[c];
  }
  return current.endOfWord;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  // The search method will check each chars in prefix if it exists in our children nodes.
  // If it does not exist, we return false. If we reach the end of the trie, we return true
  let current = this.root;

  for (const c of prefix) {
    if (!current.children[c]) {
      return false;
    }
    current = current.children[c];
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
