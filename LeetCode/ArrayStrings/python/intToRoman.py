class Solution:
    def intToRoman(self, num: int) -> str:
        roman2Int = [
            ["I", 1],
            ["IV", 4],
            ["V", 5],
            ["IX", 9],
            ["X", 10],
            ["XL", 40],
            ["L", 50],
            ["XC", 90],
            ["C", 100],
            ["CD", 400],
            ["D", 500],
            ["CM", 900],
            ["M", 1000],
        ]

        res = ""

        for i in range(len(roman2Int) - 1, -1, -1):
            (sym, val) = roman2Int[i]

            if num//val > 0: # integer division
                count = num//val # integer division
                res += (sym * count)
                num = num % val

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: num: {}".format(input["num"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().intToRoman(input["num"])))
        print("-" * 50 )

if __name__ == "__main__":
    input = {"num": 3749, "expected": "MMMDCCXLIX"}
    Solution.testSolution(input)
    input = {"num": 58, "expected": "LVIII"}
    Solution.testSolution(input)
    input = {"num": 1994, "expected": "MCMXCIV"}
    Solution.testSolution(input)