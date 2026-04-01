from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class rangeBitwiseAndRecord:
    left: int
    right: int
    expected: int

class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        cnt: int = 0
        while left != right:
            left >>= 1
            right >>= 1
            cnt += 1
        return left << cnt
    
    @staticmethod
    def testSolution(record: rangeBitwiseAndRecord) -> None:
        print(f"input:\tleft: {record.left}")
        print(f"\tright: {record.right}")
        print(f"expected: {record.expected}")

        res: int = Solution().rangeBitwiseAnd(record.left, record.right)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: Tuple[rangeBitwiseAndRecord] = (
        rangeBitwiseAndRecord(5, 7, 4),
        rangeBitwiseAndRecord(0, 0, 0),
        rangeBitwiseAndRecord(1, 2147483647, 0),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)