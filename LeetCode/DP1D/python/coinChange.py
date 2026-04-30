"""Coin change dynamic programming examples."""

from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"


@dataclass
class CoinChangeRecord:
    coins: List[int]
    amount: int
    expected: int


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0

        for a in range(1, amount + 1):
            for c in coins:
                if c <= a:
                    dp[a] = min(dp[a], 1 + dp[a - c])

        if dp[amount] > amount:
            return -1

        return dp[amount]


def testSolution(record: CoinChangeRecord) -> None:
    print(f"coins: {record.coins}")
    print(f"amount: {record.amount}")
    print(f"expected: {record.expected}")

    result = Solution().coinChange(record.coins, record.amount)

    print(f"result: {result}")
    print(Result.PASS.value if result == record.expected else Result.FAIL.value)


if __name__ == "__main__":
    records: Tuple[CoinChangeRecord, ...] = (
        CoinChangeRecord([1, 2, 5], 11, 3),
        CoinChangeRecord([2], 3, -1),
        CoinChangeRecord([1], 0, 0),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        testSolution(record)
        print("-" * 50)
