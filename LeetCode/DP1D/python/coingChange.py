from typing import List


class countChange:
    def computeCoinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount+1] * (amount+1)
        # print(dp)
        dp[0] = 0

        for a in range(1, amount+1):
            for c in coins:
                if c <= a:
                    dp[a] = min(dp[a], 1+dp[a-c])

        if dp[amount] > amount:
            return -1

        return dp[amount]
    

if __name__ == "__main__":
    obj = countChange()

    input1 = { "coins": [1, 2, 5], "amount" : 11}
    expected1 = 3
    result1 = obj.computeCoinChange(input1["coins"], input1["amount"])
    print("Input: {}".format(input1))
    print("Result: {}".format(result1))
    print("Expected: {}".format(expected1))
    print("-" * 50)
    
    
    input2 = { "coins": [2], "amount" : 3}
    expected2 = -1
    result2 = obj.computeCoinChange(input2["coins"], input2["amount"])
    print("Input: {}".format(input2))
    print("Result: {}".format(result2))
    print("Expected: {}".format(expected2))
    print("-" * 50)
    
    input3 = { "coins": [1], "amount" : 0}
    expected3 = 0
    result3 = obj.computeCoinChange(input3["coins"], input3["amount"])
    print("Input: {}".format(input3))
    print("Result: {}".format(result3))
    print("Expected: {}".format(expected3))
    print("-" * 50)











        # CoinInput input1 = new CoinInput(new int[] { 1, 2, 5 }, 11);
        # int expected1 = 3;
        # int result1 = new coinChange().computeCoinChange(input1.coins(), input1.amount());

        # System.out.println("Input: " + input1.toString());
        # System.out.println("Result: " + result1);
        # System.out.println("Expected: " + expected1);
        # System.out.println("-".repeat(50));

        # CoinInput input2 = new CoinInput(new int[] { 2 }, 3);
        # int expected2 = -1;
        # int result2 = new coinChange().computeCoinChange(input2.coins(), input2.amount());

        # System.out.println("Input: " + input2.toString());
        # System.out.println("Result: " + result2);
        # System.out.println("Expected: " + expected2);
        # System.out.println("-".repeat(50));

        # CoinInput input3 = new CoinInput(new int[] { 1 }, 0);
        # int expected3 = 0;
        # int result3 = new coinChange().computeCoinChange(input3.coins(), input3.amount());

        # System.out.println("Input: " + input3.toString());
        # System.out.println("Result: " + result3);
        # System.out.println("Expected: " + expected3);
        # System.out.println("-".repeat(50));