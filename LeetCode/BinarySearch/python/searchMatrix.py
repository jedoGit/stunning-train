from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class searchMatrixRecord:
    matrix: List[List[int]]
    target: int
    expected: bool

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        rows: int = len(matrix)
        cols: int = len(matrix[0])
        row: int = 0
        col: int = cols - 1

        while row < rows and col > -1:
            cur: int = matrix[row][col]

            if cur == target:
                return True
            
            if cur < target:
                row += 1
            else:
                col -= 1
        
        return False

    @staticmethod
    def testSolution(record: searchMatrixRecord) -> None:
        print(f"input:\tmatrix: {record.matrix}")
        print(f"\ttarget: {record.target}")
        print(f"expected: {record.expected}")

        res: bool = Solution().searchMatrix(record.matrix, record.target)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[searchMatrixRecord] = [
        searchMatrixRecord([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3, True),
        searchMatrixRecord([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13, False),
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)