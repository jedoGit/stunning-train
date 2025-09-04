from typing import Dict


class Solution:
    def calculate(self, s: str) -> int:
        cur = 0
        res = 0
        sign = 1 # 1 is addition, -1 is subtraction
        stack = []

        for c in s:
            if c >= "0" and c <= "9":
                # print(int(c))
                cur = cur * 10 + int(c)
            elif c == "+" or c == "-":
                res += sign * cur
                sign = 1 if c == "+" else -1
                cur = 0
            elif c == "(":
                stack.append(res)
                stack.append(sign)
                sign = 1
                res = 0
            elif c == ")":
                res += sign * cur
                res *= stack.pop()
                res += stack.pop()
                cur = 0
        return  res + sign * cur
    
    @staticmethod
    def testSolution(input: Dict[str, str | int]) -> None:
        print("Input: s: " + input["s"])
        print("Expected: " + str(input["expected"]))
        res = Solution().calculate(input["s"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"s" : "1 + 1", "expected": 2}
    Solution.testSolution(input)

    input = {"s" : " 2-1 + 2 ", "expected": 3}
    Solution.testSolution(input)

    input = {"s" : "(1+(4+5+2)-3)+(6+8)", "expected": 23}
    Solution.testSolution(input)
