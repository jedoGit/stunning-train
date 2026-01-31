# Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

# You may return the answer in any order.

# Example 1:

# Input: n = 4, k = 2
# Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
# Explanation: There are 4 choose 2 = 6 total combinations.
# Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
# Example 2:

# Input: n = 1, k = 1
# Output: [[1]]
# Explanation: There is 1 choose 1 = 1 total combination.

# Constraints:

# 1 <= n <= 20
# 1 <= k <= n

# TC:
# SC:

from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class combinationsRecord:
    n: int
    k: int
    expected: List[List[int]]

class Solution:
    def __init__(self):
        self.res = []
        self.comb = []

    def combine(self, n: int, k: int) -> List[List[int]]:
        self.backtrack(1, n, k)

        return self.res
    
    def backtrack(self, start: int, n: int, k: int) -> None:
        if len(self.comb) == k:
            self.res.append(self.comb[:])
            return
            
        for i in range(start, n + 1):
            self.comb.append(i)
            self.backtrack(i + 1, n, k)
            self.comb.pop()
    
    @staticmethod
    def testSolution(record: combinationsRecord) -> None:
        print(f"input:\tn: {record.n}")
        print(f"\tk: {record.k}")
        print(f"expected: {record.expected}")

        res: List[List[int]] = Solution().combine(record.n, record.k)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)
    
if __name__ == "__main__":

    records: List[combinationsRecord] = [
        combinationsRecord(4, 2, [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]),
        combinationsRecord(1, 1, [[1]])
    ]

    print("-" * 50)
    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)

