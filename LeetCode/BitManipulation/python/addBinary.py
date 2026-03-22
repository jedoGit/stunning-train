from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class addBinaryRecord:
    a: str
    b: str
    expected: str
    
class Solution:
    def addBinary1(self, a: str, b: str) -> str:
        a: int = int("0b" + a, 2)
        b: int = int("0b" + b, 2)
        return bin(a + b)[2:]
    
    def addBinary2(self, a: str, b: str) -> str:
        i: int = len(a) - 1
        j: int = len(b) - 1
        carry: int = 0

        res: str = ""

        while i > -1 or j > -1 or carry == 1:
            sum: int = carry

            if i > -1:
                sum += int(a[i]) - int('0')
            
            if j > -1:
                sum += int(b[j]) - int('0')

            i -= 1
            j -= 1

            res += str(sum % 2)
            carry = sum // 2
        
        # return "".join(reversed(res))
        return res[::-1]

    @staticmethod
    def testSolution(record: addBinaryRecord) -> None:
        print(f"input:\ta: {record.a}")
        print(f"\tb: {record.b}")
        print(f"expected: {record.expected}")

        res: str = Solution().addBinary1(record.a, record.b)
        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[addBinaryRecord] = [
        addBinaryRecord("11", "1", "100"),
        addBinaryRecord("1010", "1011", "10101"),
        addBinaryRecord("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
                        "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011",
                        "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000")
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)