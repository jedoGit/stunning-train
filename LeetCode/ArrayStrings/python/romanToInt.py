class Solution:
    def romanToInt(self, s: str) -> int:
        romanToIntMap = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}

        res = 0

        for i in range(0, len(s)):
            
            s2 = s[i+1] if i < len(s) - 1 else ""

            if not s2 == "" and romanToIntMap[s[i]] < romanToIntMap[s[i+1]]:
                res -= romanToIntMap[s[i]]
            else:
                res += romanToIntMap[s[i]]

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().romanToInt(input["s"])))
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "III", "expected": 3}
    Solution.testSolution(input)
    
    input = {"s": "LVIII", "expected": 58}
    Solution.testSolution(input)

    input = {"s": "MCMXCIV", "expected": 1994}
    Solution.testSolution(input)