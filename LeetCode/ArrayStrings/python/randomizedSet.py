import math
import random

class RandomizedSet:

    def __init__(self):
        self.map = {}
        self.list = []

    def insert(self, val: int) -> bool:
        if not val in self.map:
            self.map[val] = len(self.list)
            self.list.append(val)
            return True
    
        return False

    def remove(self, val: int) -> bool:
        if val in self.map:
            idx = self.map[val]
            lastVal = self.list[-1]
            self.list[idx] = lastVal
            self.list.pop()
            self.map[lastVal] = idx
            del self.map[val]

            return True
        
        return False

    def getRandom(self) -> int:
        max = math.floor(len(self.list))
        randIdx = math.floor(random.random() * max)
        
        return self.list[randIdx]

    @staticmethod
    def testSolution(input) -> None:
        print("Input: operation: {}".format(input["operation"]))
        print("Input: value: {}".format(input["value"]))
        print("Expected: {}".format(input["expected"]))
        output = []
        soln = None
        for i in range(0, len(input["operation"])):
            oper = input["operation"][i]
            if oper == "RandomizedSet":
                output.append("null")
                soln = RandomizedSet()
            elif oper == "insert":
                output.append(str(soln.insert(input["value"][i][0])))
            elif oper == "remove":
                output.append(str(soln.remove(input["value"][i][0])))
            elif oper == "getRandom":
                output.append(str(soln.getRandom()))

        print("Result: {}".format(output))
        print("-" * 50)

# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()

if __name__ == "__main__":
    input = { "operation" : ["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"],
             "value": [[],[1],[2],[2],[],[1],[2],[]],
             "expected": ["null","true","false","true","1","true","false","2"]}
    
    RandomizedSet.testSolution(input)