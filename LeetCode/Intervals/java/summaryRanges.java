package LeetCode.Intervals.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

record summaryRangesRecord(int[] nums, List<String> expected) {
}

public class summaryRanges {
    public List<String> summaryRangesSolution(int[] nums) {
        List<String> res = new ArrayList<>();
        int i = 0;

        while (i < nums.length) {
            int start = nums[i];

            while (i < nums.length - 1 && nums[i] + 1 == nums[i + 1]) {
                i++;
            }

            if (start != nums[i]) {
                res.add(start + "->" + nums[i]);
            } else {
                res.add(String.valueOf(start));
            }

            i++;
        }

        return res;
    }

    public static void main(String[] args) {
        summaryRangesRecord input = new summaryRangesRecord(
                new int[] { 0, 1, 2, 4, 5, 7 },
                List.of("0->2", "4->5", "7"));
        summaryRanges.testSolution(input);

        input = new summaryRangesRecord(
                new int[] { 0, 2, 3, 4, 6, 8, 9 },
                List.of("0", "2->4", "6", "8->9"));
        summaryRanges.testSolution(input);
    }

    private static void testSolution(summaryRangesRecord input) {
        System.out.println("Input: nums: " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + input.expected());
        List<String> res = new summaryRanges().summaryRangesSolution(input.nums());
        System.out.println("Result: " + res);
        System.out.println(res.equals(input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
