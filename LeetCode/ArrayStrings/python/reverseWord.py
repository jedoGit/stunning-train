import math
import re

class Solution:
    def reverseWords1(self, s: str) -> str:
        sArray = re.split(r'\s+',s)
        # print(sArray)
        n = len(sArray)

        for i in range(0, math.floor(n/2)):
            tmp = sArray[i]
            sArray[i] = sArray[n-1-i]
            sArray[n-1-i] = tmp

        return " ".join(sArray).strip()
    
    def reverseWords2(self, s: str) -> str:
        sArray = re.split(r'\s+',s)
        # print(sArray)
        n = len(sArray)

        stack = []
        revWord = ""

        for word in sArray:
            stack.append(word)

        for i in range(0,n):
            revWord = revWord + stack.pop() + " "

        return revWord.strip()

    @staticmethod
    def testSolution(input) -> None:
        print("Input: {}".format(input["s"]))
        print("Expected: {}".format(input["expected"]))
        s1 = Solution().reverseWords1(input["s"])
        s2 = Solution().reverseWords2(input["s"])
        print("Result1: {}, {}".format(s1, ("Correct" if s1 == input["expected"] else "Wrong")))
        print("Result2: {}, {}".format(s2, ("Correct" if s2 == input["expected"] else "Wrong")))        
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "the sky is blue", "expected": "blue is sky the"}
    Solution.testSolution(input)
    input = {"s": "  hello world  ", "expected": "world hello"}
    Solution.testSolution(input)
    input = {"s": "a good   example", "expected": "example good a"}
    Solution.testSolution(input)