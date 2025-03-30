# A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

# Implement the Trie class:

# Trie() Initializes the trie object.
# void insert(String word) Inserts the string word into the trie.
# boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
# boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

# Example 1:

# Input
# ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
# [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
# Output
# [null, null, true, false, true, null, true]

# Explanation
# Trie trie = new Trie();
# trie.insert("apple");
# trie.search("apple");   // return True
# trie.search("app");     // return False
# trie.startsWith("app"); // return True
# trie.insert("app");
# trie.search("app");     // return True

# Constraints:

# 1 <= word.length, prefix.length <= 2000
# word and prefix consist only of lowercase English letters.
# At most 3 * 104 calls in total will be made to insert, search, and startsWith.

# =============================================================================
# This is similar to a BST instead, we use a map, key/val pair.
# For insert method, we check the chars of the word if it exists in our map.
# TC: O(n) for insert because at worst, we'll create a chain of trie node, one for each chars of the word
# SC: O(n) for insert because at worst, we'll create a chain of trie node, one for each chars of the word
# For search and startsWith method, we check the chars of the word if it exists in our map.
# TC: O(n) for insert because at worst, we all the trie nodes until we hit the endOfWord indicator
# SC: O(1) in place processing

# Create a TridNode class
class TrieNode:
    def __init__(self):
        self.children = {}
        self.endOfWord = False    

class Trie:

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        current = self.root

        # for each chars in the word, check all the children if the c exists in the key. If not, create a K/V.
        # We do this until we check all chars and then we mark the endOfWord to true
        for c in word:
            if c not in current.children:
                current.children[c] = TrieNode()
            current = current.children[c]
        
        current.endOfWord = True

    def search(self, word: str) -> bool:
        current = self.root
        # The search method will check each chars in word if it exists in our children nodes.
        # If it does not exist, we return false. If we reach the end of the trie, we return the endOfWord boolean
        for c in word:
            if c not in current.children:
                return False
            current = current.children[c]
        return current.endOfWord

    def startsWith(self, prefix: str) -> bool:
        current = self.root
        # The startsWith method will check each chars in prefix if it exists in our children nodes.
        # If it does not exist, we return false. If we reach the end of the trie, we return true
        for c in prefix:
            if c not in current.children:
                return False
            current = current.children[c]
        return True


# Your Trie object will be instantiated and called as such:
# obj = Trie()
# obj.insert(word)
# param_2 = obj.search(word)
# param_3 = obj.startsWith(prefix)