package LeetCode.TwoPointers.java;

import java.util.Arrays;

record maxAreaRecord(int[] height, int expected) {
}

public class maxArea {
    public int maxAreaSolution(int[] height) {
        int lp = 0;
        int rp = height.length - 1;
        int max_area = 0;

        while (lp < rp) {
            int h = Math.min(height[lp], height[rp]);
            int w = rp - lp;
            int current_area = h * w;
            max_area = Math.max(max_area, current_area);

            if (height[lp] < height[rp]) {
                lp += 1;
            } else {
                rp -= 1;
            }
        }
        return max_area;
    }

    public static void main(String[] args) {
        maxAreaRecord input = new maxAreaRecord(new int[] { 1, 8, 6, 2, 5, 4, 8, 3, 7 }, 49);
        maxArea.testSolution(input);

        input = new maxAreaRecord(new int[] { 1, 1 }, 1);
        maxArea.testSolution(input);
    }

    public static void testSolution(maxAreaRecord input) {
        System.out.println("Input: " + Arrays.toString(input.height()));
        System.out.println("Expected: " + input.expected());
        int val = new maxArea().maxAreaSolution(input.height());
        System.out.println("Result: " + val + ", " + (val == input.expected() ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
