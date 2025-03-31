// Design a data structure that supports adding new words and finding if a string matches any previously added string.

// Implement the WordDictionary class:

// WordDictionary() Initializes the object.
// void addWord(word) Adds word to the data structure, it can be matched later.
// bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.

// Example:

// Input
// ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
// [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
// Output
// [null,null,null,null,false,true,true,true]

// Explanation
// WordDictionary wordDictionary = new WordDictionary();
// wordDictionary.addWord("bad");
// wordDictionary.addWord("dad");
// wordDictionary.addWord("mad");
// wordDictionary.search("pad"); // return False
// wordDictionary.search("bad"); // return True
// wordDictionary.search(".ad"); // return True
// wordDictionary.search("b.."); // return True

// Constraints:

// 1 <= word.length <= 25
// word in addWord consists of lowercase English letters.
// word in search consist of '.' or lowercase English letters.
// There will be at most 2 dots in word for search queries.
// At most 104 calls will be made to addWord and search.

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
}

var WordDictionary = function () {
  // This method initializes the word dictionary.
  // We need a root and for this root, initialize it to an empty trie node
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  // For each chars in the word, check if it's a key in the trie node children object, if not, add it as a key with trie node as the value
  // If exist, switch to this trie node and mark the end of word to true
  let cur = this.root;
  for (let c of word) {
    if (!cur.children[c]) {
      cur.children[c] = new TrieNode();
    }
    // console.log(cur.children[c])
    cur = cur.children[c];
  }
  cur.endOfWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  // DFS to check all of the children of the root node
  // We only need to see 1 match and return true. After that, we don't need to check all the other children
  function dfs(j, root) {
    let cur = root;

    // We need to start from index j!!!!
    for (let i = j; i < word.length; i += 1) {
      let c = word[i];

      // This is the wildcard search if c is a "."
      // We need to check all the children of this root trie node
      if (c === ".") {
        // Remember, children is an object, we can call object.values() to return all the children as an array.
        // The values portion of the children are the trie node.
        for (let child of Object.values(cur.children)) {
          // console.log(child)
          if (dfs(i + 1, child)) {
            return true;
          }
        }
        return false;
      } else {
        if (!cur.children[c]) {
          return false;
        }
        cur = cur.children[c];
      }
    }
    return cur.endOfWord;
  }

  return dfs(0, this.root);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
