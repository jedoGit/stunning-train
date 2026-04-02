from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class singleNumberRecord:
    nums: List[int]
    expected: int
    
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        ans: int = 0

        for num in nums:
            ans = ans ^ num
        
        return ans

    @staticmethod
    def testSolution(record: singleNumberRecord) -> None:
        print(f"input: nums: {record.nums}")
        print(f"expected: {record.expected}")

        res: int = Solution().singleNumber(record.nums)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: Tuple[singleNumberRecord] = (
        singleNumberRecord([2,2,1], 1),
        singleNumberRecord([4,1,2,1,2], 4),
        singleNumberRecord([1], 1)
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)