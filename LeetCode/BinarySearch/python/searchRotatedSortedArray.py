from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class searchRotatedSortedArrayRecord:
    nums: List[int]
    target: int
    expected: int

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l: int = 0
        r: int = len(nums) - 1

        while l <= r:
            m: int = l + (r - l)//2

            if nums[m] == target:
                return m
            
            if nums[m] > nums[r]:
                if target < nums[m] and target >= nums[l]:
                    r = m - 1
                else:
                    l = m +  1
            elif nums[m] < nums[l]:
                if target > nums[m] and target <= nums[r]:
                    l = m + 1
                else:
                    r = m - 1
            else:
                if target > nums[m]:
                    l = m + 1
                else:
                    r = m - 1

        return -1

    @staticmethod
    def testSolution(record: searchRotatedSortedArrayRecord) -> None:
        print(f"input:\tnums: {record.nums}")
        print(f"\ttarget: {record.target}")
        print(f"expected: {record.expected}")

        res: int = Solution().search(record.nums, record.target)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[searchRotatedSortedArrayRecord] = [
        searchRotatedSortedArrayRecord([4,5,6,7,0,1,2], 0, 4),
        searchRotatedSortedArrayRecord([4,5,6,7,0,1,2], 3, -1),
        searchRotatedSortedArrayRecord([1], 0, -1)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
