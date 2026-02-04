from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class combinationSumRecord:
    candidates: List[int]
    target: int
    expected: List[List[int]]

class Solution:
    def __init__(self):
        self.res: List[List[int]] = []
        self.candidates: List[int] = []
        self.target: int = 0
        
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        self.candidates = list(candidates[:])
        self.target = target
        self.backtrack(0, 0, [])
        return self.res
    
    # helper function to dfs and backtrack through a path and check if sum of the path is equal to target.
    # If equal, add to res array.
    # If greater than, return, pop current comb and backtrack.
    # If less than continue and push next index.
    def backtrack(self, start: int, curSum: int, path: List[int]) -> None: 
        if curSum == self.target:
            self.res.append(path[:])
            return
        
        if curSum > self.target:
            return
        
        for i in range(start, len(self.candidates)):
            curSum += self.candidates[i]
            path.append(self.candidates[i])

            self.backtrack(i, curSum, path)

            curSum -= self.candidates[i]
            path.pop()

        return 
    
    @staticmethod
    def testSolution(record: combinationSumRecord) -> None:
        print(f"input: candidates: {record.candidates}")
        print(f"target: {record.target}")
        print(f"expected: {record.expected}")
        res: List[List[int]] = Solution().combinationSum(record.candidates, record.target)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[combinationSumRecord] = [
        combinationSumRecord([2,3,6,7], 7, [[2,2,3],[7]]),
        combinationSumRecord([2,3,5], 8, [[2,2,2,2],[2,3,3],[3,5]]),
        combinationSumRecord([2], 1, [])
    ]

    print("-" * 50)
    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)