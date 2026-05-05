package LeetCode.DP1D.java.lengthOfLIS;

import java.util.Arrays;

record LengthOfLISRecord(int[] nums, int expected) {
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

public class lengthOfLIS {
    public static class Solution {
        public int computeLengthOfLIS(int[] nums) {
            int[] LIS = new int[nums.length];
            Arrays.fill(LIS, 1);

            for (int i = nums.length - 1; i > -1; i--) {
                for (int j = i + 1; j < nums.length; j++) {
                    if (nums[i] < nums[j]) {
                        LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
                    }
                }
            }

            return Arrays.stream(LIS)
                    .boxed()
                    .reduce(0, Integer::max);
        }
    }

    public static void main(String[] args) {
        LengthOfLISRecord[] records = new LengthOfLISRecord[] {
                new LengthOfLISRecord(new int[] { 10, 9, 2, 5, 3, 7, 101, 18 }, 4),
                new LengthOfLISRecord(new int[] { 0, 1, 0, 3, 2, 3 }, 4),
                new LengthOfLISRecord(new int[] { 7, 7, 7, 7, 7, 7, 7 }, 1),
        };

        for (int i = 0; i < records.length; i++) {
            testSolution(records[i], i + 1);
        }
    }

    private static void testSolution(LengthOfLISRecord record, int caseNumber) {
        System.out.println("# Test case " + caseNumber);
        System.out.println("Nums: " + Arrays.toString(record.nums()));
        System.out.println("Expected: " + record.expected());

        int result = new Solution().computeLengthOfLIS(record.nums());
        System.out.println("Result: " + result);
        System.out.println(result == record.expected() ? Result.PASS.label() : Result.FAIL.label());

        System.out.println("-".repeat(50));
    }
}
