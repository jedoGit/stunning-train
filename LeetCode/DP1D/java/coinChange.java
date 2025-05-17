// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount.If that amount of money cannot be made up by any combination of the coins,return-1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:

// Input:coins=[1,2,5],amount=11 Output:3 Explanation:11=5+5+1 Example 2:

// Input:coins=[2],amount=3 Output:-1 Example 3:

// Input:coins=[1],amount=0 Output:0

// Constraints:

// 1<=coins.length<=12 1<=coins[i]<=231-1 0<=amount<=104

// TC: O(amount * coins.length)
// SC: O(amount)

package LeetCode.DP1D.java;

import java.util.Arrays;
import java.util.stream.IntStream;

record CoinInput(int[] coins, int amount) {

    @Override
    public String toString() {
        return "Coins: " + Arrays.toString(coins) + ", Amount: " + amount;
    }
}

public class coinChange {

    public int computeCoinChange(int[] coins, int amount) {
        // Create DP Array
        int[] dp = new int[amount + 1];
        // Initialize DP Array
        Arrays.fill(dp, amount + 1);
        dp[0] = 0; // DP[0] will always be 0 because after we're trying to compute such that the
                   // value will be zero

        // Iterate through the amounts and the coins values we have... remember we have
        // infinite coins with these values.
        for (int a : IntStream.rangeClosed(1, amount).toArray()) {
            for (int c : coins) {
                // if current coin is <= the current amount
                if (c <= a) {
                    // dp[current amount] is the min of dp[current amount] and 1 plus dp[current
                    // amount - current coin]
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
                }
            }
        }

        // If DP[amount] > amount, we return -1
        if (dp[amount] > amount) {
            return -1;
        }

        // Return dp[amount]
        return dp[amount];
    }

    public static void main(String[] args) {
        CoinInput input1 = new CoinInput(new int[] { 1, 2, 5 }, 11);
        int expected1 = 3;
        int result1 = new coinChange().computeCoinChange(input1.coins(), input1.amount());

        System.out.println("Input: " + input1.toString());
        System.out.println("Result: " + result1);
        System.out.println("Expected: " + expected1);
        System.out.println("-".repeat(50));

        CoinInput input2 = new CoinInput(new int[] { 2 }, 3);
        int expected2 = -1;
        int result2 = new coinChange().computeCoinChange(input2.coins(), input2.amount());

        System.out.println("Input: " + input2.toString());
        System.out.println("Result: " + result2);
        System.out.println("Expected: " + expected2);
        System.out.println("-".repeat(50));

        CoinInput input3 = new CoinInput(new int[] { 1 }, 0);
        int expected3 = 0;
        int result3 = new coinChange().computeCoinChange(input3.coins(), input3.amount());

        System.out.println("Input: " + input3.toString());
        System.out.println("Result: " + result3);
        System.out.println("Expected: " + expected3);
        System.out.println("-".repeat(50));

    }
}
