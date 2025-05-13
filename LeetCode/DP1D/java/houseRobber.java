package LeetCode.DP1D.java;

import java.util.Arrays;

public class houseRobber {
    public int rob(int[] nums) {
        // Visually, it will look like this: [rob1, rob2, 2, 7, 9, 3, 1]
        // 0 1 2 3 4 5 6
        // We are trying to see which is more profitable: [ rob1, rob2 , rob2=rob1+2, 7,
        // 9, 3, 1]
        // If you start at 0, it means you'll skip 1. If you start 1, it means you'll
        // skip 0 and 2.
        // From this, rob2 will always be the current loot plus the previous loot, which
        // is rob1.
        // As you move house, rob1 will become the rob2.
        // At the end of the operation, the max value will be in rob2 because, it has
        // the loot of the current
        // house plus the previous house.

        int rob1 = 0;
        int rob2 = 0;

        for (int num : nums) {
            int tmp = Math.max(rob1 + num, rob2);
            rob1 = rob2;
            rob2 = tmp;
        }

        return rob2;

    }

    public static void main(String[] args) {
        int[] input = new int[] { 1, 2, 3, 1 };
        int result = new houseRobber().rob(input);
        int expected = 4;

        System.out.println("Input: " + Arrays.toString(input));
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);

        System.out.println("-".repeat(50));

        input = new int[] { 2, 7, 9, 3, 1 };
        result = new houseRobber().rob(input);
        expected = 12;

        System.out.println("Input: " + Arrays.toString(input));
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);

        System.out.println("-".repeat(50));
    }
}
