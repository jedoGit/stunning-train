from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class generateParenthesisRecord:
    n: int
    expected: List[str]

class Solution:
    def __init__(self):
        self.stack: List[str] = []
        self.res: List[str] = []

    def generateParenthesis(self, n: int) -> List[str]:
        self.backtrack(0,0,n)

        return self.res
    
    def backtrack(self, openN: int, closedN: int, n: int) -> None: 
        if openN == n and closedN == n:
            self.res.append("".join(self.stack[:]))
            return
        
        if openN < n:
            self.stack.append("(")
            self.backtrack(openN + 1, closedN, n)
            self.stack.pop()

        if closedN < openN:
            self.stack.append(")")
            self.backtrack(openN, closedN + 1, n)
            self.stack.pop()

        return

    @staticmethod
    def testSolution(record: generateParenthesisRecord) -> None:
        print(f"input: n: {record.n}")
        print(f"expected: {record.expected}")
        res: List[str] = Solution().generateParenthesis(record.n)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[generateParenthesisRecord] = [
        generateParenthesisRecord(3, ["((()))","(()())","(())()","()(())","()()()"]),
        generateParenthesisRecord(1, ["()"])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
