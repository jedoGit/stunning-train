"""House robber dynamic programming examples."""

from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"


@dataclass
class HouseRobberRecord:
    nums: List[int]
    expected: int


class Solution:
    def rob(self, nums: List[int]) -> int:
        # Visually, it will look like this: [rob1, rob2, 2, 7, 9, 3, 1]
        #                                                   0     1            2     3  4  5  6
        # We are trying to see which is more profitable: [ rob1, rob2 , rob2=rob1+2, 7, 9, 3, 1]
        # If you start at 0, it means you'll skip 1. If you start 1, it means you'll skip 0 and 2.
        # From this, rob2 will always be the current loot plus the previous loot, which is rob1.
        # As you move house, rob1 will become the rob2.

        rob1 = 0
        rob2 = 0

        for num in nums:
            temp = max(rob1 + num, rob2)
            rob1 = rob2
            rob2 = temp

        return rob2


def testSolution(record: HouseRobberRecord) -> None:
    print(f"houses: {record.nums}")
    print(f"expected: {record.expected}")

    result = Solution().rob(record.nums)

    print(f"result: {result}")
    print(Result.PASS.value if result == record.expected else Result.FAIL.value)


if __name__ == "__main__":
    records: Tuple[HouseRobberRecord, ...] = (
        HouseRobberRecord([1, 2, 3, 1], 4),
        HouseRobberRecord([2, 7, 9, 3, 1], 12),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        testSolution(record)
        print("-" * 50)
