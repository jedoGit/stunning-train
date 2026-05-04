"""Word break dynamic programming examples."""

from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"


@dataclass
class WordBreakRecord:
    s: str
    wordDict: List[str]
    expected: bool


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        dp = [False] * (len(s) + 1)
        dp[len(s)] = True

        for i in range(len(s) - 1, -1, -1):
            for word in wordDict:
                if i + len(word) <= len(s) and s[i : i + len(word)] == word:
                    dp[i] = dp[i + len(word)]
                if dp[i]:
                    break

        return dp[0]


def testSolution(record: WordBreakRecord) -> None:
    print(f"s: {record.s}")
    print(f"dict: {record.wordDict}")
    print(f"expected: {record.expected}")

    result = Solution().wordBreak(record.s, record.wordDict)

    print(f"result: {result}")
    print(Result.PASS.value if result == record.expected else Result.FAIL.value)


if __name__ == "__main__":
    records: Tuple[WordBreakRecord, ...] = (
        WordBreakRecord("leetcode", ["leet", "code"], True),
        WordBreakRecord("applepenapple", ["apple", "pen"], True),
        WordBreakRecord("catsandog", ["cats", "dog", "sand", "and", "cat"], False),
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        testSolution(record)
        print("-" * 50)
