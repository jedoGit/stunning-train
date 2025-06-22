package LeetCode.ArrayStrings.java;

import java.util.Arrays;
import java.util.stream.IntStream;

record jumpGameIIRecord(int[] nums, int expected) {

}

public class jumpGameII {
    public int jump(int[] nums) {
        int n = nums.length;
        int res = 0;
        int l = 0;
        int r = 0;

        while (r < n - 1) {
            int farthest = 0;

            for (int i : IntStream.range(l, r + 1).toArray()) {
                farthest = Math.max(farthest, i + nums[i]);
            }

            l = r + 1;
            r = farthest;

            res += 1;
        }

        return res;
    }

    public static void main(String[] args) {
        jumpGameIIRecord input = new jumpGameIIRecord(new int[] { 2, 3, 1, 1, 4 }, 2);
        jumpGameII.testSolution(input);

        input = new jumpGameIIRecord(new int[] { 2, 3, 0, 1, 4 }, 2);
        jumpGameII.testSolution(input);
    }

    private static void testSolution(jumpGameIIRecord input) {
        System.out.println("Input: nums: " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + new jumpGameII().jump(input.nums()));
        System.out.println("-".repeat(50));
    }
}
