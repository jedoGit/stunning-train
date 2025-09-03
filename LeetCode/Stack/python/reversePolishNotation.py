from typing import Dict, List


class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []

        for c in tokens:
            if c == "+":
                stack.append(stack.pop() + stack.pop())
            elif c == "-":
                a, b = stack.pop(), stack.pop()
                stack.append(b-a)
            elif c == "*":
                stack.append(stack.pop() * stack.pop())
            elif c == "/":
                a, b = stack.pop(), stack.pop()
                stack.append(int(b/a))
            else:
                stack.append(int(c))
                
        return stack[-1]
    
    @staticmethod
    def testSolution(input: Dict[str, List[int] | int]) -> None:
        print("Input: tokens: " + str(input["tokens"]))
        print("Expected: " + str(input["expected"]))
        res = Solution().evalRPN(input["tokens"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"tokens": ["2","1","+","3","*"], "expected": 9}
    Solution.testSolution(input)

    input = {"tokens": ["4","13","5","/","+"], "expected": 6}
    Solution.testSolution(input)

    input = {"tokens": ["10","6","9","3","+","-11","*","/","*","17","+","5","+"], "expected": 22}
    Solution.testSolution(input)