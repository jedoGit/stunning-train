class Solution:
    def convert(self, s: str, numRows: int) -> str:

        if numRows == 1:
            return s

        res = ""

        for r in range(0, numRows):
            increment = 2 * (numRows - 1)

            for i in range(r, len(s), increment):
                res += s[i]
                if r > 0 and r < numRows - 1 and i + increment - 2 * r < len(s):
                    res += s[i + increment - 2 * r]

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Input: numRows: {}".format(input["numRows"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().convert(input["s"], input["numRows"])
        print("Result: {}, {}".format(val, ("Correct" if val == input["expected"] else "Wrong")))
        print("-" * 50)


if __name__ == "__main__":
    input = { "s": "PAYPALISHIRING", "numRows": 3, "expected": "PAHNAPLSIIGYIR"}
    Solution.testSolution(input)

    input = { "s": "PAYPALISHIRING", "numRows": 4, "expected": "PINALSIGYAHRPI"}
    Solution.testSolution(input)

    input = { "s": "A", "numRows": 1, "expected": "A"}
    Solution.testSolution(input)