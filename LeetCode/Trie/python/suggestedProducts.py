from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class SuggestedProductsRecord:
    products: List[str]
    searchWord: str
    expected: List[List[str]]

class TrieNode:
    def __init__(self):
        self.children = dict()
        self.words = list()
        self.n = 0
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def add_word(self, word: str) -> None:
        cur = self.root
        for c in word:
            cur = cur.children.setdefault(c, TrieNode())
            
            if cur.n < 3:
                cur.words.append(word)
                cur.n += 1
        
    def find_word_by_prefix(self, prefix: str) -> List[str]:
        cur = self.root
        for c in prefix:
            if c not in cur.children: 
                return []
            cur = cur.children[c] 
        return cur.words

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        products.sort()
        trie = Trie()
        
        for word in products: 
            trie.add_word(word)
        
        ans = []
        cur = ""

        for c in searchWord:
            cur += c 
            ans.append(trie.find_word_by_prefix(cur))
        
        return ans    

    @staticmethod
    def testSolution(record: SuggestedProductsRecord) -> None:
        print(f"input:\tproducts: {record.products}")
        print(f"\tsearchWord: {record.searchWord}")
        print(f"expected: {record.expected}")

        res = Solution().suggestedProducts(record.products, record.searchWord)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[SuggestedProductsRecord] = [
        SuggestedProductsRecord(
            ["mobile","mouse","moneypot","monitor","mousepad"], 
            "mouse", 
            [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]),
        SuggestedProductsRecord(
            ["havana"], 
            "havana",
            [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]),
        SuggestedProductsRecord(
            ["havana"],
            "tatiana",
            [[], [], [], [], [], [], []]
        )
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")