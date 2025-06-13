package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record rotateArrayRecord(int[] nums, int k, int[] expected) {
}

public class rotateArray {
    public void rotate(int[] nums, int k) {
        // Compute new k, it should be k % nums.length
        k %= nums.length;

        // Reverse the whole array
        reverse(nums, 0, nums.length - 1);
        // 7,6,5,4,3,2,1

        // Reverse from 0 to k - 1 index
        reverse(nums, 0, k - 1);
        // 5,6,7,4,3,2,1

        // Reverse from k to end of array
        reverse(nums, k, nums.length - 1);
        // 5,6,7,1,2,3,4
    }

    public void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        rotateArray soln = new rotateArray();
        rotateArrayRecord input1 = new rotateArrayRecord(
                new int[] { 1, 2, 3, 4, 5, 6, 7 },
                3,
                new int[] { 5, 6, 7, 1, 2, 3, 4 });

        rotateArray.testSolution(input1, soln);

        rotateArrayRecord input2 = new rotateArrayRecord(
                new int[] { -1, -100, 3, 99 },
                2,
                new int[] { 3, 99, -1, -100 });

        rotateArray.testSolution(input2, soln);
    }

    public static void testSolution(rotateArrayRecord input, rotateArray classToTest) {

        System.out.println(
                "Input: nums: " + Arrays.toString(input.nums()) +
                        ", k: " + input.k());
        System.out.println("Expected: " + Arrays.toString(input.expected()));
        classToTest.rotate(input.nums(), input.k());
        System.out.println("Result: " + Arrays.toString(input.nums()));
        System.out.println("-".repeat(50));
    }

}
