from dataclasses import dataclass
from enum import Enum
from typing import List

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

@dataclass
class ipAddressRecord:
    s: str
    expected: List[str]

class Solution:
    def __init__(self):
        self.res: List[str] = list()
        
    def restoreIpAddresses(self, s: str) -> List[str]:
        # If the size of s has more than 12 digits, it means it's not possible to create a valid ip address.
        if (len(s) > 12):
            return self.res
        
        self.backtrack(0, 0, "", s)

        return self.res
    
    def backtrack(self, i: int, numDots: int, curIp: str, s: str) -> None:
        sLen: int = len(s)
        if numDots == 4 and i == sLen:
            # Let's push the string curIpAddr to our results array. Exclude the last dot added
            self.res.append(curIp[0 : -1])
            return
        
        if numDots > 4:
            return
        
        # We start from the index passed to the function. The check for the next 3 digit. In the case that we have less than 3 digits left, we stop at the end of array.
        for j in range(i, min(i + 3, sLen)):
            # Here we only consider the chars in s one at a time. Check it if the integer value is between 0 to 255.
            # Also, check if the leading digit should not be 0. 
            if int(s[i : j + 1]) < 256 and (i == j or s[i] != "0"):
                # We recurse and pass the next index, increment the numDots, append the new slice of Ip digit we added and don't forget to add the dot.
                self.backtrack(j + 1, numDots + 1, curIp + s[i : j + 1] + ".", s)

    @staticmethod
    def testSolution(record: ipAddressRecord) -> None:
        print(f"input: s: {record.s}")
        print(f"expected: {record.expected}")

        res: List[str] = Solution().restoreIpAddresses(record.s)

        print(f"result: {res}")
        print(Result.PASS.value if res == record.expected else Result.FAIL.value)

if __name__ == "__main__":
    records: List[ipAddressRecord] = [
        ipAddressRecord("25525511135", ["255.255.11.135","255.255.111.35"]),
        ipAddressRecord("0000", ["0.0.0.0"]),
        ipAddressRecord("101023", ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"])
    ]

    for i, record in enumerate(records):
        print(f"# Test case {i + 1}")
        Solution.testSolution(record)
        print("-" * 50)