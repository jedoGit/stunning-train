from typing import List


class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        gasSum = sum(gas)
        costSum = sum(cost)

        if gasSum < costSum:
            return -1
        
        total = 0
        res = 0

        for i in range(0, len(gas)):
            total += (gas[i]-cost[i])
        
            if total < 0:
                total = 0
                res = i + 1

        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: gas: {}".format(input["gas"]))
        print("Input: cost: {}".format(input["cost"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(Solution().canCompleteCircuit(input["gas"], input["cost"])))
        print("-" * 50)

if __name__ == "__main__":
    input = { "gas":[1,2,3,4,5], "cost": [3,4,5,1,2], "expected": 3}
    Solution.testSolution(input)
    input = { "gas":[2,3,4], "cost": [3,4,3], "expected": -1}
    Solution.testSolution(input)