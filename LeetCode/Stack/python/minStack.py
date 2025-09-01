from typing import Dict, List


class MinStack:

    def __init__(self):
        self.stack = []
        self.mStack = []
        
    def push(self, val: int) -> None:
        self.stack.append(val)
        tmpVal = min(val, self.mStack[-1] if len(self.mStack) > 0 else val)
        self.mStack.append(tmpVal)

    def pop(self) -> None:
        self.stack.pop()
        self.mStack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.mStack[-1]
        
    @staticmethod
    def testSolution(input: Dict[str, List[str] | List[List[int]]]) -> None:
        print("Input: operation: {}".format(input["operation"]))
        print("Input: values: {}".format(input["values"]))
        print("Expected: {}".format(input["expected"]))
        output = []
        soln = None

        for i in range(0, len(input["operation"])):
            oper = input["operation"][i]
            if oper == "MinStack":
                output.append("null")
                soln = MinStack()
            elif oper == "push":
                output.append("null")
                soln.push(input["values"][i][0])
            elif oper == "pop":
                output.append("null")
                soln.pop()
            elif oper == "top":
                val = soln.top()
                output.append(str(val))
            elif oper == "getMin":
                val = soln.getMin()
                output.append(str(val))

        print("Result: {}".format(output))
        res = MinStack.validateResult(output, input["expected"])
        print("PASS" if res else "FAIL")
        print("-" * 50)

    @staticmethod
    def validateResult(output: List[str], expected: List[str]) -> bool:
        if len(output) != len(expected):
            return False
        
        for i in range(len(output)):
            if output[i] != expected[i]:
                return False
        
        return True

# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(val)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()

if __name__ == "__main__":
    input = { "operation" : ["MinStack","push","push","push","getMin","pop","top","getMin"],
             "values": [[],[-2],[0],[-3],[],[],[],[]],
             "expected": ["null","null","null","null","-3","null","0","-2"]}
    
    MinStack.testSolution(input)