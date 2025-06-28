package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record productExceptSelfRecord(int[] nums, int[] expected) {
}

public class productExceptSelf {
    public int[] productExceptSelfSolution(int[] nums) {
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];

        // Arrays.fill(left, 1);
        // Arrays.fill(right, 1);
        left[0] = 1;
        right[n - 1] = 1;

        for (int i = 1; i < n; i += 1) {
            left[i] = left[i - 1] * nums[i - 1];
        }

        for (int i = n - 2; i > -1; i -= 1) {
            right[i] = right[i + 1] * nums[i + 1];
        }

        int[] retval = new int[n];

        for (int i = 0; i < n; i += 1) {
            retval[i] = left[i] * right[i];
        }

        return retval;
    }

    public static void main(String[] args) {
        productExceptSelfRecord input = new productExceptSelfRecord(
                new int[] { 1, 2, 3, 4 },
                new int[] { 24, 12, 8, 6 });

        productExceptSelf.testSolution(input);

        input = new productExceptSelfRecord(
                new int[] { -1, 1, 0, -3, 3 },
                new int[] { 0, 0, 9, 0, 0 });

        productExceptSelf.testSolution(input);
    }

    private static void testSolution(productExceptSelfRecord input) {
        System.out.println("Input: nums: " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + Arrays.toString(input.expected()));
        System.out.println("Result: " + Arrays.toString(
                new productExceptSelf().productExceptSelfSolution(input.nums())));
        System.out.println("-".repeat(50));
    }
}
