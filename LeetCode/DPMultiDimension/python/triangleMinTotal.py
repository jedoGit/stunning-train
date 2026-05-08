from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"


@dataclass
class TriangleMinTotalRecord:
    triangle: List[List[int]]
    expected: int


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        dp = [0] * (len(triangle) + 1)

        for row in triangle[::-1]:
            for i, n in enumerate(row):
                dp[i] = n + min(dp[i], dp[i + 1])

        return dp[0]


def testSolution(record: TriangleMinTotalRecord) -> None:
    print(f"input: {record.triangle}")
    print(f"expected: {record.expected}")

    result: int = Solution().minimumTotal(record.triangle)

    print(f"result: {result}")

    print(Result.PASS.value if result == record.expected else Result.FAIL.value)


if __name__ == "__main__":
    records: Tuple[TriangleMinTotalRecord, ...] = (
        TriangleMinTotalRecord([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]], 11),
        TriangleMinTotalRecord([[-10]], -10),
        TriangleMinTotalRecord([[-1], [2, 3], [1, -1, -1]], 0),
        TriangleMinTotalRecord([[5], [9, 6], [4, 6, 8], [0, 7, 1, 5]], 18),
        TriangleMinTotalRecord([[10], [9, 8], [1, 2, 3]], 20),
        TriangleMinTotalRecord([[0], [1, 2], [3, 1, 3], [1, 1, 5, 1], [4, 2, 1, 2, 4]], 4),
        TriangleMinTotalRecord([[-2]], -2),
        TriangleMinTotalRecord([[3], [-1, -2]], 1),
        TriangleMinTotalRecord([[0], [1, 2], [-3, 1, 3]], -2),
        TriangleMinTotalRecord([[-1], [-2, -3], [-4, -5, -6], [-7, -8, -9, -10], [-11, -12, -13, -14, -15]], -35),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        testSolution(record)
        print("-" * 50)
