package LeetCode.DP1D.java.houseRobber;

import java.util.Arrays;

record HouseRobberRecord(int[] houses, int expected) {
}

enum Result {
    PASS("\u001B[92mPASS\u001B[00m"),
    FAIL("\u001B[91mFAIL\u001B[00m");

    private final String label;

    Result(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}

public class houseRobber {
    public static class Solution {
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
    }

    public static void main(String[] args) {
        HouseRobberRecord[] records = new HouseRobberRecord[] {
                new HouseRobberRecord(new int[] { 1, 2, 3, 1 }, 4),
                new HouseRobberRecord(new int[] { 2, 7, 9, 3, 1 }, 12)
        };

        for (int i = 0; i < records.length; i++) {
            testSolution(records[i], i + 1);
        }
    }

    private static void testSolution(HouseRobberRecord record, int caseNumber) {
        System.out.println("# Test case " + caseNumber);
        System.out.println("Input: " + Arrays.toString(record.houses()));
        System.out.println("Expected: " + record.expected());

        int result = new Solution().rob(record.houses());
        System.out.println("Result: " + result);
        System.out.println(result == record.expected() ? Result.PASS.label() : Result.FAIL.label());

        System.out.println("-".repeat(50));
    }
}
