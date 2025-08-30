package LeetCode.Intervals.java;

import java.util.Arrays;

record minNumberOfArrosToBurstBalloonsRecord(int[][] points, int expected) {
}

public class minNumberOfArrosToBurstBalloons {
    public int findMinArrowShots(int[][] points) {
        final int start = 0;
        final int end = 1;

        Arrays.sort(points, (a, b) -> Integer.compare(a[0], b[0]));
        int res = points.length;

        int[] prev = points[0];

        for (int i = 1; i < points.length; i++) {
            int[] cur = points[i];

            // It's overlapping if curr starting point is less than the prev ending point
            // [1 , 5] , [ 2 , 6] => the new prev will be [2 , 5] <== this is the
            // overlapping portion
            // [1 , 5] , [ 2 , 4] => the new prev will be [2 , 4] <== this is the
            // overlapping portion
            // Everytime we see an overlap, we subtract 1 from our results variable.
            // Remember, we initialize it with 1 arrovw for each interval.
            if (cur[start] <= prev[end]) {
                res -= 1;
                prev = new int[] { cur[start], Math.min(cur[end], prev[end]) };
            } else {
                prev = cur;
            }
        }

        return res;
    }

    public static void main(String[] args) {
        minNumberOfArrosToBurstBalloonsRecord input = new minNumberOfArrosToBurstBalloonsRecord(
                new int[][] { { 10, 16 }, { 2, 8 }, { 1, 6 }, { 7, 12 } }, 2);
        minNumberOfArrosToBurstBalloons.testSolution(input);

        input = new minNumberOfArrosToBurstBalloonsRecord(
                new int[][] { { 1, 2 }, { 3, 4 }, { 5, 6 }, { 7, 8 } }, 4);
        minNumberOfArrosToBurstBalloons.testSolution(input);

        input = new minNumberOfArrosToBurstBalloonsRecord(
                new int[][] { { 1, 2 }, { 2, 3 }, { 3, 4 }, { 4, 5 } }, 2);
        minNumberOfArrosToBurstBalloons.testSolution(input);
    }

    private static void testSolution(minNumberOfArrosToBurstBalloonsRecord input) {
        System.out.println("Input: points: " + Arrays.deepToString(input.points()));
        System.out.println("Expected: " + input.expected());
        int res = new minNumberOfArrosToBurstBalloons().findMinArrowShots(input.points());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
