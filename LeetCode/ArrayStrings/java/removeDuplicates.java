package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record removeDuplicatesRecord(int[] nums, int[] expected) {
}

public class removeDuplicates {
    public int removeDuplicatesSoln(int[] nums) {
        int l = 0;
        int r = 0;
        int n = nums.length;

        while (r < n) {
            int count = 1;

            while ((r + 1 < n) && (nums[r] == nums[r + 1])) {
                r += 1;
                count += 1;
            }

            for (int i = 0; i < Math.min(1, count); i += 1) {
                nums[l] = nums[r];
                l += 1;
            }

            r += 1;
        }

        return l;
    }

    public static void main(String[] args) {
        removeDuplicates soln = new removeDuplicates();
        removeDuplicatesRecord input1 = new removeDuplicatesRecord(
                new int[] { 1, 1, 2 },
                new int[] { 1, 2 });

        System.out.println("Input: nums: " + Arrays.toString(input1.nums()));
        System.out.println("Expected: " + Arrays.toString(input1.expected()));
        int k1 = soln.removeDuplicatesSoln(input1.nums());
        System.out.println("Result: " + Arrays.toString(Arrays.stream(input1.nums()).limit(k1).toArray()));
        System.out.println("-".repeat(50));

        removeDuplicatesRecord input2 = new removeDuplicatesRecord(
                new int[] { 0, 0, 1, 1, 1, 2, 2, 3, 3, 4 },
                new int[] { 0, 1, 2, 3, 4 });
        System.out.println("Input: nums: " + Arrays.toString(input2.nums()));
        System.out.println("Expected: " + Arrays.toString(input2.expected()));
        int k2 = soln.removeDuplicatesSoln(input2.nums());
        System.out.println("Result: " + Arrays.toString(Arrays.stream(input2.nums()).limit(k2).toArray()));
        System.out.println("-".repeat(50));
    }
}
