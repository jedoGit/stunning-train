package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record mergeSortedArrayRecord(int[] nums1, int m, int[] nums2, int n, int[] expected) {

}

public class mergeSortedArray {
    public void merge(int[] nums1, int m, int[] nums2, int n) {

        // we need to merge nums2 to nums1
        for (int j = 0, i = m; j < n; j += 1) {
            nums1[i] = nums2[j];
            i += 1;
        }
        Arrays.sort(nums1);
    }

    public static void main(String[] args) {
        mergeSortedArray soln = new mergeSortedArray();
        mergeSortedArrayRecord input1 = new mergeSortedArrayRecord(
                new int[] { 1, 2, 3, 0, 0, 0 },
                3,
                new int[] { 2, 5, 6 },
                3,
                new int[] { 1, 2, 2, 3, 5, 6 });

        System.out.println("Input: nums1: " + Arrays.toString(input1.nums1())
                + ", m: " + input1.m()
                + ", nums2: " + Arrays.toString(input1.nums2())
                + ", n: " + input1.n());
        System.out.println("Expected: " + Arrays.toString(input1.expected()));
        soln.merge(input1.nums1(), input1.m(), input1.nums2(), input1.n());
        System.out.println("Result: " + Arrays.toString(input1.nums1()));
        System.out.println("-".repeat(50));

        mergeSortedArrayRecord input2 = new mergeSortedArrayRecord(
                new int[] { 1 },
                1,
                new int[] {},
                0,
                new int[] { 1 });

        System.out.println("Input: nums1: " + Arrays.toString(input2.nums1())
                + ", m: " + input2.m()
                + ", nums2: " + Arrays.toString(input2.nums2())
                + ", n: " + input2.n());
        System.out.println("Expected: " + Arrays.toString(input2.expected()));
        soln.merge(input2.nums1(), input2.m(), input2.nums2(), input2.n());
        System.out.println("Result: " + Arrays.toString(input2.nums1()));
        System.out.println("-".repeat(50));

        mergeSortedArrayRecord input3 = new mergeSortedArrayRecord(
                new int[] { 0 },
                0,
                new int[] { 1 },
                1,
                new int[] { 1 });

        System.out.println("Input: nums1: " + Arrays.toString(input3.nums1())
                + ", m: " + input3.m()
                + ", nums2: " + Arrays.toString(input3.nums2())
                + ", n: " + input3.n());
        System.out.println("Expected: " + Arrays.toString(input3.expected()));
        soln.merge(input3.nums1(), input3.m(), input3.nums2(), input3.n());
        System.out.println("Result: " + Arrays.toString(input3.nums1()));
        System.out.println("-".repeat(50));
    }
}
