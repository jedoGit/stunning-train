package LeetCode.HashMap.java;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

record twoSumRecord(int[] nums, int target, int[] expected) {
}

public class twoSum {
    public int[] twoSumSolution(int[] nums, int target) {
        Map<Integer, Integer> numMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (numMap.containsKey(complement)) {
                // get the index from the numMap
                return new int[] { numMap.get(complement), i };
            }
            numMap.put(nums[i], i);
        }

        return new int[] {};
    }

    public static void main(String[] args) {
        twoSumRecord input = new twoSumRecord(
                new int[] { 2, 7, 11, 15 },
                9,
                new int[] { 0, 1 });
        twoSum.testSolution(input);

        input = new twoSumRecord(
                new int[] { 3, 2, 4 },
                6,
                new int[] { 1, 2 });
        twoSum.testSolution(input);

        input = new twoSumRecord(
                new int[] { 3, 3 },
                6,
                new int[] { 0, 1 });
        twoSum.testSolution(input);
    }

    private static void testSolution(twoSumRecord input) {
        System.out.println("Input: nums: " + Arrays.toString(input.nums()));
        System.out.println("\ttarget: " + input.target());
        System.out.println("Expected: " + Arrays.toString(input.expected()));
        int[] res = new twoSum().twoSumSolution(input.nums(), input.target());
        System.out.println("Result: " + Arrays.toString(res));
        System.out.println(Arrays.equals(res, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
