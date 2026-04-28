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

package LeetCode.DP1D.java.coinChange;

import java.util.Arrays;
import java.util.stream.IntStream;

enum TestResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    TestResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}

record CoinInputRecord(int[] coins, int amount, int expected) {

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

    private static void testSolution(CoinInputRecord record) {
        System.out.println("input: " + record.toString());
        System.out.println("expected: " + record.expected());

        int res = new coinChange().computeCoinChange(record.coins(), record.amount());
        System.out.println("result: " + res);

        System.out.println(res == record.expected() ? TestResult.PASS.getValue() : TestResult.FAIL.getValue());
    }

    public static void main(String[] args) {
        CoinInputRecord[] records = new CoinInputRecord[] {
                new CoinInputRecord(new int[] { 1, 2, 5 }, 11, 3),
                new CoinInputRecord(new int[] { 2 }, 3, -1),
                new CoinInputRecord(new int[] { 1 }, 0, 0),
                new CoinInputRecord(new int[] { 1, 3, 4 }, 6, 2),
                new CoinInputRecord(new int[] { 2, 5, 10, 1 }, 27, 4)
        };

        int i = 1;
        for (CoinInputRecord record : records) {
            System.out.println("# Test case " + i++);
            coinChange.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }
}
