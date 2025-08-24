package LeetCode.HashMap.java;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

record containsDuplicateIIRecord(int[] nums, int k, boolean expected) {
}

public class containsDuplicateII {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Set<Integer> window = new HashSet<>();
        int l = 0;

        for (int r = 0; r < nums.length; r++) {
            if (r - l > k) {
                window.remove(nums[l]);
                l++;
            }

            if (window.contains(nums[r])) {
                return true;
            }

            window.add(nums[r]);
        }

        return false;
    }

    public static void main(String[] args) {
        containsDuplicateIIRecord input = new containsDuplicateIIRecord(new int[] { 1, 2, 3, 1 }, 3, true);
        containsDuplicateII.testSolution(input);

        input = new containsDuplicateIIRecord(new int[] { 1, 0, 1, 1 }, 1, true);
        containsDuplicateII.testSolution(input);

        input = new containsDuplicateIIRecord(new int[] { 1, 2, 3, 1, 2, 3 }, 2, false);
        containsDuplicateII.testSolution(input);
    }

    private static void testSolution(containsDuplicateIIRecord input) {
        System.out.println("Input: n: " + Arrays.toString(input.nums()));
        System.out.println("\tk: " + input.k());
        System.out.println("Expected: " + input.expected());
        boolean res = new containsDuplicateII().containsNearbyDuplicate(input.nums(), input.k());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
