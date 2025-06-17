from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buyPrice = prices[0]
        profit = 0

        for price in prices:
            if price < buyPrice:
                buyPrice = price
            
            profit = max(price - buyPrice, profit)

        return profit
    
    def testSolution(self, input) -> None:
        print("Input: prices: {}".format(input["prices"]))
        print("Expected: {}".format(input["expected"]))
        print("Result: {}".format(self.maxProfit(input["prices"])))
        print("-" * 50)

if __name__ == "__main__":
    obj = Solution()
    input = {"prices": [7,1,5,3,6,4], "expected": 5}
    obj.testSolution(input)
    input = {"prices": [7,6,4,3,1], "expected": 0}
    obj.testSolution(input)