from typing import Dict


class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        closeToOpen = {")": "(", "]": "[", "}": "{"}

        for c in s:
            # If c is a closing bracket, let's check the top of the 
            # stack if it's an openning bracket of similar kind and 
            # pop it from the stack. Else return false
            # If c is not a closing bracket, add it to the stack.
            if c in closeToOpen:
                if len(stack) > 0 and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)

        # If we popped everything from the stack, 
        # that means our input have valid parentheses
        return True if len(stack) == 0 else False
    
    @staticmethod
    def testSolution(input: Dict[str, str | bool]) -> None:
        print("Input: s: " + input["s"])
        print("Expected: " + str(input["expected"]))
        res = Solution().isValid(input["s"])
        print("Result: " + str(res))
        print("PASS" if res == input["expected"] else "FAIL")
        print("-" * 50)
    

if __name__ == "__main__":
    input = {"s": "()", "expected": True}
    Solution.testSolution(input)

    input = {"s": "()[]{}", "expected": True}
    Solution.testSolution(input)

    input = {"s": "(]", "expected": False}
    Solution.testSolution(input)

    input = {"s": "([])", "expected": True}
    Solution.testSolution(input)

    input = {"s": "([)]", "expected": False}
    Solution.testSolution(input)