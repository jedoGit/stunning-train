from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"


@dataclass
class LengthOfLISRecord:
    nums: List[int]
    expected: int


class Solution:
    def computeLengthOfLIS(self, nums: List[int]) -> int:
        LIS = [1] * len(nums)

        for i in range(len(nums) - 1, -1, -1):
            for j in range(i + 1, len(nums)):
                if nums[i] < nums[j]:
                    LIS[i] = max(LIS[i], 1 + LIS[j])

        return max(LIS)


def testSolution(record: LengthOfLISRecord) -> None:
    print(f"nums: {record.nums}")
    print(f"expected: {record.expected}")

    result = Solution().computeLengthOfLIS(record.nums)

    print(f"result: {result}")
    print(Result.PASS.value if result == record.expected else Result.FAIL.value)


if __name__ == "__main__":
    records: Tuple[LengthOfLISRecord, ...] = (
        LengthOfLISRecord([10, 9, 2, 5, 3, 7, 101, 18], 4),
        LengthOfLISRecord([0, 1, 0, 3, 2, 3], 4),
        LengthOfLISRecord([7, 7, 7, 7, 7, 7, 7], 1),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        testSolution(record)
        print("-" * 50)

