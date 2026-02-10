from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class wordSearchRecord:
    board: List[List[str]]
    word: str
    expected: bool

class Solution:
    def __init__(self):
        self.numRows = 0
        self.numCols = 0
        self.path = set()

    def exist(self, board: List[List[str]], word: str) -> bool:
        self.numRows = len(board)
        self.numCols = len(board[0])

        for r in range(self.numRows):
            for c in range(self.numCols):
                if self.backtrack(r, c, 0, board, word):
                    return True
                
        return False
    
    def backtrack(self, r: int, c: int, i: int, board: List[List[str]],  word: str) -> bool:
        if i == len(word):
            return True
        
        # Check if out of bound
        if r < 0 or c < 0 or r >= self.numRows or c >= self.numCols:
            return False
        
        # Check if word[i] 
        if word[i] != board[r][c]:
            return False
        
        # Check if we've seen this before
        if (r,c) in self.path:
            return False
        
        # Add the tuple r,c to the path
        self.path.add((r,c))

        # DFS on 4 dirs and backtrack to bruteforce all cells
        res: bool = self.backtrack(r + 1, c, i + 1, board, word) or \
                    self.backtrack(r - 1, c, i + 1, board, word) or \
                    self.backtrack(r, c + 1, i + 1, board, word) or \
                    self.backtrack(r, c - 1, i + 1, board, word)
        
        # Remove the tuple r,c from the path
        self.path.remove((r,c))

        return res

    @staticmethod
    def testSolution(record: wordSearchRecord) -> None:
        print(f"input:\tboard {record.board}")
        print(f"\tword: {record.word}")
        print(f"expected: {record.expected}")

        res: bool = Solution().exist(record.board, record.word)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[wordSearchRecord] = [
        wordSearchRecord([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED", True),
        wordSearchRecord([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE", True),
        wordSearchRecord([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB", False),
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)