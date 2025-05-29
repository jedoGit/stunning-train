package LeetCode.DPMultiDimension.java;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class maxProfitIII {
    private List<List<List<Integer>>> mem;

    private int recursion(int[] prices, int pos, int t, int bought) {
        if (pos >= prices.length || t == 0) {
            return 0;
        }
        if (mem.get(bought).get(t).get(pos) != -1) {
            return mem.get(bought).get(t).get(pos);
        }

        // 3 choices for a position-->buy/sell/skip
        int result = recursion(prices, pos + 1, t, bought); // skip
        if (bought == 1) {
            result = Math.max(result, recursion(prices, pos + 1, t - 1, 0) + prices[pos]); // sell
        } else {
            result = Math.max(result, recursion(prices, pos + 1, t, 1) - prices[pos]); // buy
        }

        mem.get(bought).get(t).set(pos, result);

        return result;
    }

    public int maxProfit(int[] prices) {
        mem = IntStream.range(0, 2)
                .mapToObj(x -> IntStream.range(0, 3)
                        .mapToObj(y -> IntStream.range(0, prices.length)
                                .mapToObj(z -> -1)
                                .collect(Collectors.toList()))
                        .collect(Collectors.toList()))
                .collect(Collectors.toList());

        // mem.forEach(x -> {
        // x.forEach(y -> {
        // System.out.println(y);
        // });
        // });

        int res = recursion(prices, 0, 2, 0);
        return res;
    }

    public static void main(String[] args) {
        maxProfitIII soln = new maxProfitIII();

        int[] input1 = new int[] { 3, 3, 5, 0, 0, 3, 1, 4 };
        int expected1 = 6;
        int result1 = soln.maxProfit(input1);
        System.out.println("Input: " + Arrays.toString(input1));
        System.out.println("Expected: " + expected1);
        System.out.println("Result: " + result1);
        System.out.println("-".repeat(50));

        int[] input2 = new int[] { 1, 2, 3, 4, 5 };
        int expected2 = 4;
        int result2 = soln.maxProfit(input2);
        System.out.println("Input: " + Arrays.toString(input2));
        System.out.println("Expected: " + expected2);
        System.out.println("Result: " + result2);
        System.out.println("-".repeat(50));

        int[] input3 = new int[] { 7, 6, 4, 3, 1 };
        int expected3 = 0;
        int result3 = soln.maxProfit(input3);
        System.out.println("Input: " + Arrays.toString(input3));
        System.out.println("Expected: " + expected3);
        System.out.println("Result: " + result3);
        System.out.println("-".repeat(50));
    }
}