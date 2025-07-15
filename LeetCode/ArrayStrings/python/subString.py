class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if needle == "":
            return 0
        
        for i in range(0, len(haystack) + 1 - len(needle)):
            if haystack[i : i + len(needle)] == needle:
                return i
            
        return -1

    @staticmethod
    def testSolution(input) -> None:
        print("Input: haystack: {}".format(input["haystack"]))
        print("Input: needle: {}".format(input["needle"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().strStr(input["haystack"], input["needle"])
        print("Result: {} , {}".format(val, ("Correct" if val == input["expected"] else "Wrong")))
        print("-" * 50)

if __name__ == "__main__":
    input = {"haystack":"sadbutsad", "needle":"sad", "expected": 0}
    Solution.testSolution(input)

    input={"haystack":"leetcode", "needle":"leeto", "expected": -1}
    Solution.testSolution(input)
