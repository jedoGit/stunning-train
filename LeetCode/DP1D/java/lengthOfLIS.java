package LeetCode.DP1D.java;

import java.util.Arrays;
import java.util.stream.IntStream;

record InputValueRecord(int[] nums) {

    @Override
    public String toString() {
        return "Nums: " + Arrays.toString(nums);
    }
}

public class lengthOfLIS {

    public int computLengthOfLIS(int[] nums) {
        // LIS - Longest Increasing Subsequence
        int[] LIS = new int[nums.length];
        Arrays.fill(LIS, 1);

        // IntStream.range(-1,
        // nums.length-1).boxed().sorted(Comparator.reverseOrder()).toList()
        for (int i : IntStream.iterate(nums.length - 1, i -> i > -1, i -> i - 1).toArray()) {
            for (int j : IntStream.range(i + 1, nums.length).toArray()) {
                if (nums[i] < nums[j]) {
                    LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
                }
            }
        }

        return Arrays.stream(LIS)
                .boxed() // Boxed from int to Integer wrapper
                .reduce(0, (a, b) -> Integer.max(a, b));
                // .reduce(0, Integer::max);
    }

    public static void main(String[] args) {
        lengthOfLIS soln = new lengthOfLIS();

        InputValueRecord input1 = new InputValueRecord(new int[] { 10, 9, 2, 5, 3, 7, 101, 18 });
        int expected1 = 4;
        int result1 = soln.computLengthOfLIS(input1.nums());

        System.out.println("Input: " + input1.toString());
        System.out.println("Result: " + result1);
        System.out.println("Expected: " + expected1);
        System.out.println("-".repeat(50));

        InputValueRecord input2 = new InputValueRecord(new int[] { 0, 1, 0, 3, 2, 3 });
        int expected2 = 4;
        int result2 = soln.computLengthOfLIS(input2.nums());

        System.out.println("Input: " + input2.toString());
        System.out.println("Result: " + result2);
        System.out.println("Expected: " + expected2);
        System.out.println("-".repeat(50));

        InputValueRecord input3 = new InputValueRecord(new int[] { 7, 7, 7, 7, 7, 7, 7 });
        int expected3 = 1;
        int result3 = soln.computLengthOfLIS(input3.nums());

        System.out.println("Input: " + input3.toString());
        System.out.println("Result: " + result3);
        System.out.println("Expected: " + expected3);
        System.out.println("-".repeat(50));

    }
}
