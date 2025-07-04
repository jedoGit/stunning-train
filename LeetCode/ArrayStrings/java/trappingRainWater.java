package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record trappingRainWaterRecord(int[] height, int expected) {
}

public class trappingRainWater {
    public int trap(int[] height) {

        if (height.length < 1) {
            return 0;
        }

        int n = height.length;
        int l = 0;
        int r = n - 1;
        int lMax = height[l];
        int rMax = height[r];
        int res = 0;

        while (l < r) {
            if (lMax < rMax) {
                l += 1;
                lMax = Math.max(lMax, height[l]);
                res += lMax - height[l];
            } else {
                r -= 1;
                rMax = Math.max(rMax, height[r]);
                res += rMax - height[r];
            }
        }

        return res;
    }

    public static void main(String[] args) {
        trappingRainWaterRecord input = new trappingRainWaterRecord(
                new int[] { 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1 },
                6);

        trappingRainWater.testSolution(input);

        input = new trappingRainWaterRecord(
                new int[] { 4, 2, 0, 3, 2, 5 },
                9);

        trappingRainWater.testSolution(input);
    }

    private static void testSolution(trappingRainWaterRecord input) {
        System.out.println("Input: height: " + Arrays.toString(input.height()));
        System.out.println("Expected: " + input.expected());
        System.out.println("Results: " + new trappingRainWater().trap(input.height()));
        System.out.println("-".repeat(50));
    }
}
