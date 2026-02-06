# The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

# Given an integer n, return the number of distinct solutions to the n-queens puzzle.

# Example 1:

# Input: n = 4
# Output: 2
# Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
# Example 2:

# Input: n = 1
# Output: 1

# Constraints:

# 1 <= n <= 9

# TC:
# SC:

from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class totalNQueensRecord:
    n: int
    expected: int

class Solution:

    def __init__(self):
        self.col = set()
        self.posDiag = set()
        self.negDiag = set()
        self.res = 0

    def totalNQueens(self, n: int) -> int:
                
        self.backtrack(0, n)

        return self.res
    
    def backtrack(self, r: int, n: int ) -> None:
        if r == n:
            self.res += 1
            return

        for c in range(n):
            if c in self.col or (r + c) in self.posDiag or (r - c) in self.negDiag:
                continue
                
            self.col.add(c)
            self.posDiag.add(r + c)
            self.negDiag.add(r - c)

            self.backtrack(r + 1, n)

            self.col.remove(c)
            self.posDiag.remove(r + c)
            self.negDiag.remove(r - c)
            
        return
    
    @staticmethod
    def testSolution(record: totalNQueensRecord) -> None:
        print(f"input: n: {record.n}")
        print(f"expected: {record.expected}")
        res: int = Solution().totalNQueens(record.n)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[totalNQueensRecord] = [
        totalNQueensRecord(4, 2),
        totalNQueensRecord(1, 1),
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
        