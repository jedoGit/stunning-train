# Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

# A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

# Example 1:

# Input: digits = "23"
# Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
# Example 2:

# Input: digits = ""
# Output: []
# Example 3:

# Input: digits = "2"
# Output: ["a","b","c"]

# Constraints:

# 0 <= digits.length <= 4
# digits[i] is a digit in the range ['2', '9'].

# TC: O(n*4^n) because at each level of the backtracking tree, you'll have a worst case 4^n leaf nodes the you'll do that for every digits, n is the length of digits
# SC: O(n) you'll do recursion of n levels

from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class letterCombinationsRecord:
    digits: str
    expected: List[str]

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        res = []
        digitToChar = { "2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz" }

        # print( digitToChar[2] )

        if not digits: return res

        # helper function
        def backtrack(i, curStr):
            if ( i == len(digits) ):
                res.append(curStr)
                return

            # print(digits[i])
            digitChar = digitToChar[digits[i]]

            for c in digitChar:
                backtrack(i+1, curStr + c)

        backtrack(0,"")

        return res
    
    @staticmethod
    def testSolution(record: letterCombinationsRecord) -> None:
        print(f"input: digits: {record.digits}")
        print(f"expected: {record.expected}")
        res = Solution().letterCombinations(record.digits)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)
    
if __name__ == "__main__":
    records: List[letterCombinationsRecord] = [
        letterCombinationsRecord("23", ["ad","ae","af","bd","be","bf","cd","ce","cf"]),
        letterCombinationsRecord("2", ["a","b","c"])
    ]

    print(f"{'-' * 50}")
    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")