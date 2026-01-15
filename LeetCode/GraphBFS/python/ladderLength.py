from collections import deque
from dataclasses import dataclass
from enum import Enum
from typing import Dict, List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class ladderLengthRecord:
    beginWord: str
    endWord: str
    wordList: List[str]
    expected: int

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        # check if the endWord is not in the wordList, if so, return 0
        if endWord not in wordList: 
            return 0
        
        # nei is a k/v where k is a pattern of words and v is an array of words from the wordList that match the pattern
        # nei = {"h*t":[hot, hit, hat], "*nt":[ant, int]}
        nei: Dict[str, List[str]] = {}
        wordList.append(beginWord)

        # create an adjacency list
        # go through each words in the wordlist and match it to the pattern.
        # create a pattern for each word, hit=> *it, h*t, hi*. for each of these patterns, add the word to the nei.
        # example: "*it": [hit], "h*t":[hit], "hi*":[hit]
        for word in wordList:
            for j in range(len(word)):
                pattern = word[:j] + "*" + word[j+1:] # patterns: *XY, X*Y, XY*
                tmp: List[str] = nei.get(pattern, [])
                tmp.append(word)
                nei[pattern] = tmp

        # print(f"{nei}")
        #   At this point we have the nei object... it's a list of the patterns and the words associated to tha pattern.
        #   example: "*it": [hit], "h*t":[hit], "hi*":[hit]   

        # We BFS each keys in nei
        visited = set()
        visited.add(beginWord)

        queue = deque()
        queue.append(beginWord)

        res = 1

        while len(queue) >= 0:
            # we just want to loop until q is empty
            for _ in range(len(queue)):
                word = queue.popleft()

                # If word is equal to endWord, we're done and return res
                if word == endWord:
                    return res
             
                #   For the word we're currently processing, let's create all possible patterns and check the nei object and visit each pattern match
                #   Each time, add the words we visited and add it to the q so we can BFS it next round
                for j in range(len(word)):
                    pattern = word[:j] + "*" + word[j+1:]

                    # nei[pattern] returns an array
                    # process all words under this pattern
                    for neiWord in nei.get(pattern):
                        if neiWord not in visited:
                            visited.add(neiWord)
                            queue.append(neiWord)
            # increment res after every processing of word in the queue
            res += 1

        return 0

    def testSolution(record: ladderLengthRecord) -> None:
        print(f"input:\tbeginWord: {record.beginWord}")
        print(f"\tendWord: {record.endWord}")
        print(f"\twordList: {record.wordList}")
        print(f"expected: {record.expected}")

        res = Solution().ladderLength(record.beginWord, record.endWord, record.wordList)

        print(f"result: {res}")
        print(f"{Result.PASS.value if res == record.expected else Result.FAIL.value}")

if __name__ == "__main__":
    records: Tuple[ladderLengthRecord] = (ladderLengthRecord("hit", "cog", ["hot","dot","dog","lot","log","cog"], 5), 
               ladderLengthRecord("hit", "cog", ["hot","dot","dog","lot","log"], 0))
    
    for i, record in enumerate(records):
        print(f"Test case {i+1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")