from dataclasses import dataclass
from enum import Enum
from typing import Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class hammingWeightRecord:
    n: int
    expected: int

class Solution:
    def hammingWeight(self, n: int) -> int:
        res: int = 0

        for i in range(32):
            if ((n >> i) & 1) != 0:
                res += 1
        
        return res

    @staticmethod
    def testSolution(record: hammingWeightRecord) -> None:
        print(f"input: n: {record.n}")
        print(f"expected: {record.expected}")

        res: int = Solution().hammingWeight(record.n)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: Tuple[hammingWeightRecord] = (
        hammingWeightRecord(11, 3),
        hammingWeightRecord(128, 1),
        hammingWeightRecord(2147483645, 30)
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)