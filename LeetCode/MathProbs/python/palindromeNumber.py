from dataclasses import dataclass
from enum import Enum
from typing import Tuple

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class palindromeNumberRecord:
    x: int
    expected: bool

class Solution:
    def isPalindrome1(self, x: int) -> bool:
        if x < 0:
            return False
        
        reverse: int = 0
        xcopy: int = x

        while x > 0:
            reverse = (reverse * 10) + (x % 10)
            x = x // 10

        return reverse == xcopy
    
    def isPalindrome2(self, x: int) -> bool:
        if x < 0:
            return False
        
        x: str = str(x)

        l = 0
        r = len(x) - 1

        while l < r:
            if x[l] != x[r]:
                return False
            l += 1
            r -= 1
        
        return True

    @staticmethod
    def testSolution(record: palindromeNumberRecord) -> None:
        print(f"input: {record.x}")
        print(f"expected: {record.expected}")

        res: bool = Solution().isPalindrome2(record.x)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ is "__main__":
    records: Tuple[palindromeNumberRecord] = (
        palindromeNumberRecord(121, True),
        palindromeNumberRecord(-121, False),
        palindromeNumberRecord(10, False)
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)


    