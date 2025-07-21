class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        sp = 0
        tp = 0

        while sp < len(s) and tp < len(t):
            if s[sp] == t[tp]:
                sp += 1
            
            tp += 1

        return True if sp == len(s) else False

    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Input: t: {}".format(input["t"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().isSubsequence(input["s"], input["t"])
        print("Result: {}, {}".format(val, ("Correct" if val == input["expected"] else "Wrong")))
        print("-" * 50)



if __name__ == "__main__":
    input = {"s":"abc", "t":"ahbgdc", "expected": True}
    Solution.testSolution(input)

    input = {"s":"axc", "t":"ahbgdc", "expected": False}
    Solution.testSolution(input)