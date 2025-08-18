from collections import defaultdict
from typing import Dict


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        countS = defaultdict(int)
        countT = defaultdict(int)        

        for i in range(len(s)):
            countS[s[i]] = countS.get(s[i], 0) + 1

            countT[t[i]] = countT.get(t[i], 0) + 1

        for c in countS:
            if countS[c] != countT[c]:
                return False

        return True
    
    @staticmethod
    def testSolution(input: Dict[str, str | bool]) -> None:
        print("Input: s: " + input["s"])
        print("\tt: " + input["t"])        
        print("Expected: " + str(input["expected"]))
        res = Solution().isAnagram(input["s"], input["t"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "anagram", "t": "nagaram", "expected": True}
    Solution.testSolution(input)

    input = {"s": "rat", "t": "car", "expected": False}
    Solution.testSolution(input)

