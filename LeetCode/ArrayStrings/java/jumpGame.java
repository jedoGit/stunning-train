package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record jumpGameRecord(int[] nums, boolean expected) {
}

public class jumpGame {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        int goal = n - 1;

        for (int i = n - 1; i > -1; i -= 1) {
            if (i + nums[i] >= goal) {
                goal = i;
            }
        }

        return goal == 0 ? true : false;
    }

    public static void main(String[] args) {
        jumpGameRecord input = new jumpGameRecord(new int[] { 2, 3, 1, 1, 4 }, true);
        jumpGame.testSolution(input);
        input = new jumpGameRecord(new int[] { 3, 2, 1, 0, 4 }, false);
        jumpGame.testSolution(input);
    }

    private static void testSolution(jumpGameRecord input) {
        System.out.println("Input: " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + input.expected());
        jumpGame soln = new jumpGame();
        System.out.println("Result: " + soln.canJump(input.nums()));
    }

}
