package LeetCode.DPMultiDimension.java;

import java.util.Arrays;

record MaxProfitIVRecord(int[] prices, int k) {
}

public class maxProfitIV {
    public int maxProfit(int k, int[] prices) {
        if (prices.length < 1) {
            return 0;
        }

        int N = prices.length;
        int[] dp = new int[N];
        Arrays.fill(dp, 0);

        // if (k > N) {
        // return IntStream.range(1, N)
        // .mapToObj(i -> prices[i] - prices[i - 1]) // map i to new stream of prices[i]
        // - prices[i-1]
        // .filter(b -> b > 0) // filter only the positive values
        // .reduce(0, (a, b) -> a + b); // sum all the positive values
        // }

        for (int t = 0; t < k; t += 1) {
            int pos = -1 * prices[0];
            int profit = 0;
            for (int i = 1; i < N; i += 1) {
                pos = Math.max(pos, dp[i] - prices[i]);
                profit = Math.max(profit, pos + prices[i]);
                dp[i] = profit;
            }
        }

        return dp[N - 1];
    }

    public static void main(String[] args) {
        maxProfitIV soln = new maxProfitIV();

        MaxProfitIVRecord input1 = new MaxProfitIVRecord(new int[] { 2, 4, 1 }, 2);
        int expected1 = 2;
        int result1 = soln.maxProfit(input1.k(), input1.prices());
        System.out.println("Input: Prices: " + Arrays.toString(input1.prices()) + " k: " + input1.k());
        System.out.println("Expected: " + expected1);
        System.out.println("Result: " + result1);
        System.out.println("-".repeat(50));

        MaxProfitIVRecord input2 = new MaxProfitIVRecord(new int[] { 3, 2, 6, 5, 0, 3 }, 2);
        int expected2 = 7;
        int result2 = soln.maxProfit(input2.k(), input2.prices());
        System.out.println("Input: Prices: " + Arrays.toString(input2.prices()) + " k: " + input2.k());
        System.out.println("Expected: " + expected2);
        System.out.println("Result: " + result2);
        System.out.println("-".repeat(50));
    }
}
