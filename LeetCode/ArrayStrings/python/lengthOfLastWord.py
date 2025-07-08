class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        n = len(s)
        r = n-1

        while r > -1 and s[r] == " ":
            r -= 1

        count = 0

        while r > -1 and not s[r] == " ":
            r -= 1
            count += 1

        return count

    @staticmethod
    def testSolution(input) -> None:
        print("Input: {}".format(input["s"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().lengthOfLastWord(input["s"])))
        print("-" * 50)


if __name__ == "__main__":
    input = {"s": "Hello World", "expected": 5}
    Solution.testSolution(input)

    input = {"s": "   fly me   to   the moon  ", "expected": 4}
    Solution.testSolution(input)

    input = {"s": "luffy is still joyboy", "expected": 6}
    Solution.testSolution(input)