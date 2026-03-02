from dataclasses import dataclass
from enum import Enum
import math
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class findPeakElementRecord:
    nums: List[int]
    expected: int
    
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        l: int = 0
        r: int = len(nums) - 1

        while l < r:
            # m: int = math.floor((r + l) / 2)
            m: int = (r + l) // 2

            if nums[m] > nums[m + 1]:
                r = m
            else:
                l = m + 1
        
        return l

    @staticmethod
    def testSolution(record: findPeakElementRecord) -> None:
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")

        res: int = Solution().findPeakElement(record.nums)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":

    records: List[findPeakElementRecord] = [
        findPeakElementRecord([1,2,3,1], 2),
        findPeakElementRecord([1,2,1,3,5,6,4], 5)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)