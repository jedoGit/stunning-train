from typing import List

class Solution:
    def maxProfitII(self, prices: List[int]) -> int:
        profit = 0

        for i in range(1, len(prices)):
            if(prices[i] > prices[i-1]):
                profit = profit + (prices[i] - prices[i-1])

        return profit
    
    def testSolution(self, input) -> None:
        print("Input: prices: {}".format(input["prices"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(self.maxProfitII(input["prices"])))
        print("-" * 50)

if __name__ == "__main__":
    obj = Solution()
    input = {"prices": [7,1,5,3,6,4], "expected": 7}
    obj.testSolution(input)
    input = {"prices": [1,2,3,4,5], "expected": 4}
    obj.testSolution(input)
    input = {"prices":[7,6,4,3,1], "expected": 0}
    obj.testSolution(input)