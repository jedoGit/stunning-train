from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class TrieRecord:
    operations: List[str]
    words: List[List[str]]
    expected: List[str]

# Create a TridNode class
class TrieNode:
    def __init__(self):
        self.children = {}
        self.endOfWord = False

class WordDictionary:

    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        # For each chars in the word, check if it's a key in the trie node children object, if not, add it as a key with trie node as the value
        # If exist, switch to this trie node and mark the end of word to true
        current = self.root
        for c in word:
            current = current.children.setdefault(c, TrieNode())

        current.endOfWord = True

    def search(self, word: str) -> bool:
        return self.DFS(0, self.root, word)

    def DFS(self, index: int, node: TrieNode, word: str) -> bool:
        # DFS to check all of the children of the root node
        # We only need to see 1 match and return true. After that, we don't need to check all the other children
        current = node

        # We need to start from index j!!!!
        for i in range(index, len(word)):
            c = word[i]

            # This is the wildcard search if c is a "."
            # We need to check all the children of this root trie node
            if c == ".":
                # Remember, children is an object, we can call object.values() to return all the children as an array. 
                # The values portion of the children are the trie node.
                for childNode in current.children.values():
                    if self.DFS(i + 1, childNode, word):
                        return True
                return False
            else:
                if c not in current.children:
                    return False
                current = current.children[c]
        return current.endOfWord

    @staticmethod
    def testSolution(record: TrieRecord) -> None:
        print(f"input:\toperations: {record.operations}")
        print(f"\twords: {record.words}")
        print(f"expected: {record.expected}")

        output: List[str] = []
        obj = None
        for i, operation in enumerate(record.operations):
            if operation == "WordDictionary":
                obj = WordDictionary()
                output.append("null")
            elif operation == "addWord":
                obj.addWord(record.words[i][0])
                output.append("null")
            elif operation == "search":
                tmp: bool = obj.search(record.words[i][0])
                output.append(str(tmp).lower())
            
        print(f"result: {output}")
        print(f"{Result.PASS.value if output == record.expected else Result.FAIL.value}")

# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)

if __name__ == "__main__":
    records: List[TrieRecord] = [TrieRecord(["WordDictionary","addWord","addWord","addWord","search","search","search","search"], 
                   [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]], 
                   ["null","null","null","null","false","true","true","true"])]

    for i, record in enumerate(records):
        print(f"# Test case {i+1}")
        WordDictionary.testSolution(record)
        print(f"{'-' * 50}")