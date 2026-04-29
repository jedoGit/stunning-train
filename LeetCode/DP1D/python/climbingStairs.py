"""Climbing stairs dynamic programming examples."""

from dataclasses import dataclass
from enum import Enum
from typing import Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"


@dataclass
class ClimbingStairsRecord:
    n: int
    expected: int

class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 0:
            return 0
        if n == 1:
            return 1

        one_step_before = 1
        two_steps_before = 1

        for _ in range(1, n):
            current = one_step_before + two_steps_before
            two_steps_before = one_step_before
            one_step_before = current

        return one_step_before


def testSolution(record: ClimbingStairsRecord) -> None:
    print(f"input: n: {record.n}")
    print(f"expected: {record.expected}")

    res: int = Solution().climbStairs(record.n)

    print(f"result: {res}")

    print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":

    records: Tuple[ClimbingStairsRecord, ...] = (
        ClimbingStairsRecord(1, 1),
        ClimbingStairsRecord(2, 2),
        ClimbingStairsRecord(3, 3),
        ClimbingStairsRecord(4, 5),
        ClimbingStairsRecord(5, 8),
        ClimbingStairsRecord(6, 13),
        ClimbingStairsRecord(10, 89),
        ClimbingStairsRecord(0, 0),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        testSolution(record)
        print("-" * 50)
