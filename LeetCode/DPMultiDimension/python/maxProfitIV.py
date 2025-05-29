from typing import List


class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        if not prices: return 0

        N = len(prices)
        dp = [0]*N

        # if k > N:
        #     B = [prices[i] - prices[i-1] for i in range(1, N)]
        #     # filter b > 0 from B and sum all of them
        #     filteredB = [b for b in B if b > 0]
        #     return sum(filteredB)
        
        for t in range(k):
            pos = -prices[0]
            profit = 0
            for i in range(1, N):
                pos = max(pos, dp[i] - prices[i])
                profit = max(profit, pos + prices[i])
                dp[i] = profit
                
        # print(dp)
        # print("dp[-1] : {}".format(dp[-1]))
        return dp[N-1]
    


if __name__ == "__main__":
    obj = Solution()

    input1 = {"prices": [2,4,1], "k":2}
    expected1 = 2
    result1 = obj.maxProfit(input1["k"], input1["prices"])
    print("Input: {}".format(input1))
    print("Expected: {}".format(expected1))
    print("Result: {}".format(result1))
    print("-" * (50))

    input2 = {"prices": [3,2,6,5,0,3], "k":2}
    expected2 = 7
    result2 = obj.maxProfit(input2["k"], input2["prices"])
    print("Input: {}".format(input2))
    print("Expected: {}".format(expected2))
    print("Result: {}".format(result2))
    print("-" * (50))

