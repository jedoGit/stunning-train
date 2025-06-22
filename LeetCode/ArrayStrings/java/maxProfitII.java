package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record maxProfitIIRecord(int[] prices, int expected) {
}

public class maxProfitII {

    public int maxProfitSoln(int[] prices) {
        int profit = 0;

        for (int i = 1; i < prices.length; i += 1) {
            if (prices[i] > prices[i - 1]) {
                profit = profit + (prices[i] - prices[i - 1]);
            }
        }

        return profit;
    }

    public static void main(String[] args) {
        maxProfitRecord input1 = new maxProfitRecord(new int[] { 7, 1, 5, 3, 6, 4 }, 7);
        maxProfitII.testSolution(input1);
        maxProfitRecord input2 = new maxProfitRecord(new int[] { 1, 2, 3, 4, 5 }, 4);
        maxProfitII.testSolution(input2);
        maxProfitRecord input3 = new maxProfitRecord(new int[] { 7, 6, 4, 3, 1 }, 0);
        maxProfitII.testSolution(input3);

    }

    private static void testSolution(maxProfitRecord input) {
        maxProfitII soln = new maxProfitII();
        System.out.println("Input: prices: " + Arrays.toString(input.prices()));
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + soln.maxProfitSoln(input.prices()));
        System.out.println("-".repeat(50));
    }

}
