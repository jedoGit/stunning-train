from typing import List


class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        strs.sort()
        n = len(strs)
        s1 = strs[0]
        s2 = strs[n-1]
        res = ""
        i = 0

        while i < len(s1) and s1[i] == s2[i]:
            res += s1[i]
            i += 1

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: strs: {}".format(input["strs"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().longestCommonPrefix(input["strs"])))
        print("-" * 50)

if __name__ == "__main__":

    input = {"strs": ["flower","flow","flight"], "expected": "fl"}
    Solution.testSolution(input)

    input = {"strs": ["dog","racecar","car"], "expected": ""}
    Solution.testSolution(input)