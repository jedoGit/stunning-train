package LeetCode.TwoPointers.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

record threeSumRecord(int[] nums, List<List<Integer>> expected) {
}

public class threeSum {
    public List<List<Integer>> threeSumSolution(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;
        Arrays.sort(nums);

        for (int i = 0; i < n; i += 1) {
            int a = nums[i];

            if (i > 0 && a == nums[i - 1]) {
                continue;
            }

            int l = i + 1;
            int r = n - 1;

            while (l < r) {
                int threeSum = a + nums[l] + nums[r];

                if (threeSum > 0) {
                    r -= 1;
                } else if (threeSum < 0) {
                    l += 1;
                } else {
                    res.add(List.of(a, nums[l], nums[r]));
                    l += 1;

                    while (nums[l] == nums[l - 1] && l < r) {
                        l += 1;
                    }
                }
            }
        }

        return res;
    }

    public static void main(String[] args) {

        threeSumRecord input = new threeSumRecord(
                new int[] { -1, 0, 1, 2, -1, -4 },
                List.of(List.of(-1, -1, 2),
                        List.of(-1, 0, 1)));

        threeSum.testSolution(input);

        input = new threeSumRecord(
                new int[] { 0, 1, 1 },
                List.of());

        threeSum.testSolution(input);

        input = new threeSumRecord(
                new int[] { 0, 0, 0 },
                List.of(List.of(0, 0, 0)));

        threeSum.testSolution(input);

        input = new threeSumRecord(
                new int[] { 2, -3, 0, -2, -5, -5, -4, 1, 2, -2, 2, 0, 2, -4, 5, 5, -10 },
                List.of(List.of(-10, 5, 5),
                        List.of(-5, 0, 5),
                        List.of(-4, 2, 2),
                        List.of(-3, -2, 5),
                        List.of(-3, 1, 2),
                        List.of(-2, 0, 2)));

        threeSum.testSolution(input);
    }

    private static void testSolution(threeSumRecord input) {
        System.out.println("Input: nums " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + input.expected().toString());
        List<List<Integer>> val = new threeSum().threeSumSolution(input.nums());
        System.out.println("Result: " + val.toString() + ", " +
                (val.equals(input.expected()) ? "\nPASS" : "\nFAIL"));
        System.out.println("-".repeat(50));
    }

}
