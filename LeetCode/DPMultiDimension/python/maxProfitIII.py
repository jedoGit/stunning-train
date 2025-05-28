from typing import List


class Solution:
    def maxProfitMem(self, prices: List[int]) -> int:
        # This is a 3d array mem[2][3][prices.length]
        # mem[true/false][bought/sold/skip][stock positions]
        mem = [[[-1 for _ in range(len(prices))] for _ in range(3)] for _ in range(2)]

        def recursion(prices, pos, t, bought):
            if pos >= len(prices) or t == 0:
                return 0
            if mem[bought][t][pos] != -1:
                return mem[bought][t][pos]

            # 3 choices for a position-> buy/sell/skip
            result = recursion(prices, pos+1, t, bought) # skip
            if bought:
                result = max(result, recursion(prices, pos+1, t-1, False) + prices[pos]) # Sell
            else:
                result = max(result, recursion(prices, pos+1, t, True) - prices[pos]) # Buy

            mem[bought][t][pos] = result

            return result

        # print(mem)
        res = recursion(prices, 0, 2, False)

        return res    

if __name__ == "__main__":
    obj = Solution()

    input1 = [3,3,5,0,0,3,1,4]
    expected1 = 6
    result1 = obj.maxProfitMem(input1)
    print("Input: {}".format(input1))
    print("Expected: {}".format(expected1))
    print("Result: {}".format(result1))
    print("-" * (50))

    input2 = [1,2,3,4,5]
    expected2 = 4
    result2 = obj.maxProfitMem(input2)
    print("Input: {}".format(input2))
    print("Expected: {}".format(expected2))
    print("Result: {}".format(result2))
    print("-" * (50))

    input3 = [7,6,4,3,1]
    expected3 = 0
    result3 = obj.maxProfitMem(input3)
    print("Input: {}".format(input3))
    print("Expected: {}".format(expected3))
    print("Result: {}".format(result3))
    print("-" * (50))