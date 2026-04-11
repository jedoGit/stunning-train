# Given an integer n, return the number of trailing zeroes in n!.

# Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

 

# Example 1:

# Input: n = 3
# Output: 0
# Explanation: 3! = 6, no trailing zero.
# Example 2:

# Input: n = 5
# Output: 1
# Explanation: 5! = 120, one trailing zero.
# Example 3:

# Input: n = 0
# Output: 0
 

# Constraints:

# 0 <= n <= 104
 

# Follow up: Could you write a solution that works in logarithmic time complexity?

# Trailing zeros in a factorial come from multiplying pairs of 2 and 5. 
# Since factors of 2 are more frequent,we only need to count 
# the number of 5 s in the prime factorization of n!.

from dataclasses import dataclass
from enum import Enum
from typing import Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class trailingZeroesRecord:
    n: int
    expected: int

class Solution:
    def trailingZeroes(self, n: int) -> int:
        # number of 5's in the divisor

        count = 0
        # count the number of 5's
        while n > 0:
            count += n // 5
            n //= 5

        return count
    
    @staticmethod
    def testSolution(record: trailingZeroesRecord) -> None:
        print(f"input: n: {record.n}")
        print(f"expected: {record.expected}")

        res: int = Solution().trailingZeroes(record.n)

        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)
    
if __name__ == "__main__":
    records: Tuple[trailingZeroesRecord] = (
        trailingZeroesRecord(3, 0),
        trailingZeroesRecord(5, 1),
        trailingZeroesRecord(0, 0)
    )

    for i, record, in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
