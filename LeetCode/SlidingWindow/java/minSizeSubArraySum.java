package LeetCode.SlidingWindow.java;

import java.util.Arrays;

record minSizeSubArraySumRecord(int target, int[] nums, int expected) {
}

public class minSizeSubArraySum {
    public int minSubArrayLen(int target, int[] nums) {
        int l = 0;
        int total = 0;
        int res = Integer.MAX_VALUE;
        final int n = nums.length;

        for (int r = 0; r < n; r += 1) {
            total += nums[r];

            while (total >= target) {
                // Update res response while total >= target
                // Take the min of res and (r-l+1)
                res = Math.min(r - l + 1, res);

                // Remove nums[l] from the window and move l to the right
                total -= nums[l];
                l += 1;
            }
        }

        return res == Integer.MAX_VALUE ? 0 : res;
    }

    public static void main(String[] args) {
        minSizeSubArraySumRecord input = new minSizeSubArraySumRecord(7, new int[] { 2, 3, 1, 2, 4, 3 }, 2);
        minSizeSubArraySum.testSolution(input);

        input = new minSizeSubArraySumRecord(4, new int[] { 1, 4, 4 }, 1);
        minSizeSubArraySum.testSolution(input);

        input = new minSizeSubArraySumRecord(11, new int[] { 1, 1, 1, 1, 1, 1, 1, 1 }, 0);
        minSizeSubArraySum.testSolution(input);
    }

    private static void testSolution(minSizeSubArraySumRecord input) {
        System.out.println("Input: target: " + input.target());
        System.out.println("Input: nums: " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + input.expected());
        int val = new minSizeSubArraySum().minSubArrayLen(input.target(), input.nums());
        System.out.println("Result: " + val);
        System.out.println((val == input.expected() ? "PASS" : "FAIL"));
        System.out.println("-".repeat(50));
    }
}
