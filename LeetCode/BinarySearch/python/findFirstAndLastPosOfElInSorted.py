from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class findFirstAndLastPosOfElInSortedRecord:
    nums: List[int]
    target: int
    expected: List[int]

class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        l: int = 0
        r: int = len(nums) - 1
        res: List[int] = [-1,-1]

        while l <= r:
            m: int = l + ((r - l) // 2)

            if target > nums[m]:
                l = m + 1
            elif target < nums[m]:
                r = m - 1
            else:
                while nums[l] != target:
                    l += 1
                while nums[r] != target:
                    r -= 1
                
                res = [l, r]
                break

        return res
    
    @staticmethod
    def testSolution(record: findFirstAndLastPosOfElInSortedRecord) -> None:
        print(f"input:\tnums: {record.nums}")
        print(f"\ttarget: {record.target}")
        print(f"expected: {record.expected}")

        res: List[int] = Solution().searchRange(record.nums, record.target)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)


if __name__ == "__main__":
    records: List[findFirstAndLastPosOfElInSortedRecord] = [
        findFirstAndLastPosOfElInSortedRecord([5,7,7,8,8,10], 8, [3,4]),
        findFirstAndLastPosOfElInSortedRecord([5,7,7,8,8,10], 6, [-1,-1]),
        findFirstAndLastPosOfElInSortedRecord([], 0, [-1,-1]),
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)