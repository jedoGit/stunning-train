package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record majorityElementRecord(int[] nums, int expected) {
}

public class majorityElement {
        public int majorityElementSolution(int[] nums) {
                int res = 0;
                int count = 0;

                for (int num : nums) {
                        if (count == 0) {
                                res = num;
                        }

                        count += (num == res ? 1 : -1);
                }

                return res;
        }

        public static void main(String[] args) {
                majorityElement soln = new majorityElement();

                majorityElementRecord input1 = new majorityElementRecord(
                                new int[] { 3, 2, 3 },
                                3);

                System.out.println("Input: nums: " + Arrays.toString(input1.nums()));
                System.out.println("Expected: " + input1.expected());
                System.out.println("Result: " + soln.majorityElementSolution(input1.nums()));
                System.out.println("-".repeat(50));

                majorityElementRecord input2 = new majorityElementRecord(
                                new int[] { 2, 2, 1, 1, 1, 2, 2 },
                                2);

                System.out.println("Input: nums: " + Arrays.toString(input2.nums()));
                System.out.println("Expected: " + input2.expected());
                System.out.println("Result: " + soln.majorityElementSolution(input2.nums()));
                System.out.println("-".repeat(50));
        }
}
