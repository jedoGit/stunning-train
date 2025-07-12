import math
import re

class Solution:
    def reverseWords(self, s: str) -> str:
        sArray = re.split(r'\s+',s)
        # print(sArray)
        n = len(sArray)

        for i in range(0, math.floor(n/2)):
            tmp = sArray[i]
            sArray[i] = sArray[n-1-i]
            sArray[n-1-i] = tmp

        return " ".join(sArray).strip()

    @staticmethod
    def testSolution(input) -> None:
        print("Input: {}".format(input["s"]))
        print("Expected: {}".format(input["expected"]))
        s1 = Solution().reverseWords(input["s"])
        print("Result: {}".format(s1))
        print("Result: {}".format("Correct" if s1 == input["expected"] else "Wrong"))
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "the sky is blue", "expected": "blue is sky the"}
    Solution.testSolution(input)
    input = {"s": "  hello world  ", "expected": "world hello"}
    Solution.testSolution(input)
    input = {"s": "a good   example", "expected": "example good a"}
    Solution.testSolution(input)