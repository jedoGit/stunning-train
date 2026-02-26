from dataclasses import dataclass
from enum import Enum
import math
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class searchInsertRecord:
    nums: List[int]
    target: int
    expected: int
    
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        l: int = 0
        r: int = len(nums)

        while l < r:
            m: int = l + math.floor((r - l)/2)

            if target > nums[m]:
                l = m + 1
            else:
                r = m
        
        return r

    @staticmethod
    def testSolution(record: searchInsertRecord) -> None:
        print(f"input:\tnums: {record.nums}")
        print(f"\ttarget: {record.target}")
        print(f"expected: {record.expected}")
        res: int = Solution().searchInsert(record.nums, record.target)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[searchInsertRecord] = [
        searchInsertRecord([1,3,5,6], 5, 2),
        searchInsertRecord([1,3,5,6], 2, 1),
        searchInsertRecord([1,3,5,6], 7, 4),
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)