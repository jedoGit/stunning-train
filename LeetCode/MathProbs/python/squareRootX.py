# Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

# You must not use any built-in exponent function or operator.

# For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
 

# Example 1:

# Input: x = 4
# Output: 2
# Explanation: The square root of 4 is 2, so we return 2.
# Example 2:

# Input: x = 8
# Output: 2
# Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
 

# Constraints:

# 0 <= x <= 231 - 1

from dataclasses import dataclass
from enum import Enum
from typing import Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class SquareRootXRecord:
    x: int
    expected: int

class SquareRootX:
    def mySqrt(self, x: int) -> int:
        l = 0
        r = x
        res = 0

        while l <= r:
            m = l + ((r-l) // 2)
            if m**2 > x:
                r = m-1
            elif m**2 < x:
                l = m+1
                res = m
            else:
                return m
        return res
    
    @staticmethod
    def testSolution(record: SquareRootXRecord) -> None:
        print(f"input: x: {record.x}")
        print(f"expected: {record.expected}")

        res: int = SquareRootX().mySqrt(record.x)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: Tuple[SquareRootXRecord] = (
        SquareRootXRecord(4, 2),
        SquareRootXRecord(8, 2)
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        SquareRootX.testSolution(record)
        print("-" * 50)