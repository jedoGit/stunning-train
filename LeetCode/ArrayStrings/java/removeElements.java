package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record removeElementsRecord(int[] nums, int val, int[] expected) {
}

public class removeElements {
    public int removeElementSolution(int[] nums, int val) {
        int iCnt = 0;

        for (int num : nums) {
            if (num != val) {
                nums[iCnt] = num;
                iCnt += 1;
            }
        }
        return iCnt;
    }

    public static void main(String[] args) {
        removeElements soln = new removeElements();

        removeElementsRecord input1 = new removeElementsRecord(
                new int[] { 3, 2, 2, 3 },
                3,
                new int[] { 2, 2 });

        System.out.println("Input: nums: " + Arrays.toString(input1.nums())
                + ", val: " + input1.val());
        System.out.println("Expected: " + Arrays.toString(input1.expected()));
        int k1 = soln.removeElementSolution(input1.nums(), input1.val());
        System.out.println("Result: " + Arrays.toString(Arrays.stream(input1.nums()).limit(k1).toArray())
                + ", k: " + k1);
        System.out.println("-".repeat(50));

        removeElementsRecord input2 = new removeElementsRecord(
                new int[] { 0, 1, 2, 2, 3, 0, 4, 2 },
                2,
                new int[] { 0, 1, 4, 0, 3 });

        System.out.println("Input: nums: " + Arrays.toString(input2.nums())
                + ", val: " + input2.val());
        System.out.println("Expected: " + Arrays.toString(input2.expected()));
        int k2 = soln.removeElementSolution(input2.nums(), input2.val());
        System.out.println("Result: " + Arrays.toString(Arrays.stream(input2.nums()).limit(k2).toArray())
                + ", k: " + k2);
        System.out.println("-".repeat(50));
    }
}
