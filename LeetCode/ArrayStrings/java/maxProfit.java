package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record maxProfitRecord(int[] prices, int expected) {
}

public class maxProfit {

    public int maxProfitSoln(int[] prices) {
        int buyPrice = prices[0];
        int profit = 0;

        for (int price : prices) {
            if (price < buyPrice) {
                buyPrice = price;
            }

            profit = Math.max(price - buyPrice, profit);
        }
        return profit;
    }

    public static void main(String[] args) {
        maxProfitRecord input1 = new maxProfitRecord(new int[] { 7, 1, 5, 3, 6, 4 }, 5);
        maxProfit.testSolution(input1);
        maxProfitRecord input2 = new maxProfitRecord(new int[] { 7, 6, 4, 3, 1 }, 0);
        maxProfit.testSolution(input2);

    }

    private static void testSolution(maxProfitRecord input1) {
        System.out.println("Input: prices: " +
                Arrays.toString(input1.prices()));
        System.out.println("Expected: " + input1.expected());
        System.out.println("Result: " + new maxProfit().maxProfitSoln(input1.prices()));
        System.out.println("-".repeat(50));
    }

}
