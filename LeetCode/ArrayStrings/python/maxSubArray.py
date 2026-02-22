from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class maxSubArrayRecord:
    nums: List[int]
    expected: int

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        accum_Val: int = 0
        max_Val: int = float('-inf') # use for comparing to max neg int value

        for num in nums:
            accum_Val += num
            max_Val = max(accum_Val, max_Val)

            if accum_Val < 0:
                accum_Val = 0
        
        return max_Val

    @staticmethod
    def testSolution(record: maxSubArrayRecord) -> None:
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")

        res: int = Solution().maxSubArray(record.nums)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[maxSubArrayRecord] = [
        maxSubArrayRecord([-2,1,-3,4,-1,2,1,-5,4], 6),
        maxSubArrayRecord([1], 1),
        maxSubArrayRecord([5,4,-1,7,8], 23)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50 )