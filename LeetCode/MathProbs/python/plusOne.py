from dataclasses import dataclass
from enum import Enum
from typing import List, Tuple


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class plusOneRecord:
    digits: List[int]
    expected: List[int]

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:

        for i in range(len(digits) - 1, -1, -1):

            if digits[i] + 1 != 10:
                digits[i] += 1
                return digits
            
            # It's equal to 10 so we set the current digit to 0
            digits[i] = 0

            if i == 0:
                return [1] + digits # join the two arrays
            
    @staticmethod
    def testSolution(record: plusOneRecord) -> None:
        print(f"input: digits {record.digits}")
        print(f"expected: {record.expected}")

        res: List[int] = Solution().plusOne(record.digits)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)
            
if __name__ == "__main__":

    records: Tuple[plusOneRecord] = (
        plusOneRecord([1,2,3], [1,2,4]),
        plusOneRecord([4,3,2,1], [4,3,2,2]),
        plusOneRecord([9], [1,0])
    )

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
    