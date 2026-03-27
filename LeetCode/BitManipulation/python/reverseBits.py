from dataclasses import dataclass
from enum import Enum
from typing import List


class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class reverseBitsRecord:
    n: int
    expected: int
    
class Solution:
    def reverseBits(self, n: int) -> int:
        mask: int = 1
        ans: int = 0

        for i in range(1, 33):
            if (mask & n) != 0:
                ans |= (1 << 32 - i)
                # print(f"ans: {ans}")
            mask <<= 1
        
        return ans

        # res: int = 0
        # for i in range(0, 32):
        #     bit: int = (n >> i) & 1
        #     res = res | (bit << (31 - i))
        
        # return res

    @staticmethod
    def testSolution(record: reverseBitsRecord) -> None:
        print(f"input: n: {record.n}")
        print(f"expected: {record.expected}")

        res: int = Solution().reverseBits(record.n)
        print(f"result: {res}")

        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[reverseBitsRecord] = [
        reverseBitsRecord(43261596, 964176192),
        reverseBitsRecord(2147483644, 1073741822)
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)
