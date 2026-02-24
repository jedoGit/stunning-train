from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class maxSubarraySumCircularRecord:
    nums: List[int]
    expected: int
    
class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        glob_max: int = nums[0]
        glob_min: int = nums[0]
        cur_max: int = 0
        cur_min: int = 0
        total: int = 0

        for n in nums:
            cur_max = max(cur_max + n, n)
            cur_min = min(cur_min + n, n)
            total += n
            glob_max = max(glob_max, cur_max)
            glob_min = min(glob_min, cur_min)

        return max(glob_max, total - glob_min) if glob_max > 0 else glob_max

    @staticmethod
    def testSolution(record: maxSubarraySumCircularRecord) -> None:
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")
        
        res: int = Solution().maxSubarraySumCircular(record.nums)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":

    records: List[maxSubarraySumCircularRecord] = [
        maxSubarraySumCircularRecord([1,-2,3,-2], 3),
        maxSubarraySumCircularRecord([5,-3,5], 10),
        maxSubarraySumCircularRecord([-3,-2,-3], -2)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)


