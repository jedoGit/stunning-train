from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class permutationRecord:
    nums: List[int]
    expected: List[List[int]]
    
class Solution:
    def __init__(self):
        self.res = []
        self.visited = set()

    def permute(self, nums: List[int]) -> List[List[int]]:
        self.backtrack([], nums)
        return self.res
    
    def backtrack(self, path: List[int], nums: List[int]) -> None: 
        # Check if the length of our current values (path) is the same as the length of the nums array
        if len(path) == len(nums):
            # remember to perform a copy not a reference
            self.res.append(path[:])
            return
        
        # Assemble the permutation
        for i in range(len(nums)):
            # If we've seen this index before, just continue
            if i in self.visited:
                continue
            # Add the current index to our visited list
            self.visited.add(i)
            # Add the number to our path array
            path.append(nums[i])
            # backtrack
            self.backtrack(path, nums)
            # remove the current end of path
            path.pop()
            # remove current index from visited
            self.visited.remove(i)

    @staticmethod
    def testSolution(record: permutationRecord) -> None:
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")
        res: List[List[int]] = Solution().permute(record.nums)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records:  List[permutationRecord] = [
        permutationRecord([1,2,3], [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]),
        permutationRecord([0,1], [[0,1],[1,0]]),
        permutationRecord([1], [[1]])
    ]

    print("-" * 50)
    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)