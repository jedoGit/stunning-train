from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class findMinRotatedSortedArrRecord:
    nums: List[int]
    expected: int

class Solution:
    def findMin(self, nums: List[int]) -> int:
        l: int = 0
        r: int = len(nums) - 1

        while l < r:
            m: int = (r + l) // 2

            if nums[m] > nums[r]:
                l = m + 1
            else:
                r = m
        
        return nums[l]

    @staticmethod
    def testSolution(record: findMinRotatedSortedArrRecord) -> None:
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")

        res: int = Solution().findMin(record.nums)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[findMinRotatedSortedArrRecord] = [
        findMinRotatedSortedArrRecord([3,4,5,1,2], 1),
        findMinRotatedSortedArrRecord([4,5,6,7,0,1,2], 0),
        findMinRotatedSortedArrRecord([11,13,15,17], 11)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
