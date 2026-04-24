package LeetCode.MathProbs.java.maxPoints;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}

record maxPointsRecord(int[][] points, int expected) {
}

class maxPoints {
    public int maxPointsSolution(int[][] points) {
        int n = points.length;
        if (n <= 2)
            return n;

        int res = 1;

        for (int i = 0; i < n; i++) {
            // Using Double as the key to store the slope
            Map<Double, Integer> count = new HashMap<>();

            for (int j = i + 1; j < n; j++) {
                double slope;

                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];

                if (dx == 0) {
                    slope = Double.POSITIVE_INFINITY;
                } else {
                    // Critical: Cast to double to avoid integer division
                    slope = (double) dy / dx;

                    // Handle -0.0 vs 0.0 edge case (Java distinguishes between them)
                    if (slope == -0.0)
                        slope = 0.0;
                }

                // Java version of count[slope] += 1
                count.put(slope, count.getOrDefault(slope, 0) + 1);
                res = Math.max(res, count.get(slope) + 1);
            }
        }

        return res;
    }

    public static void main(String[] args) {
        maxPointsRecord[] records = new maxPointsRecord[] {
                new maxPointsRecord(new int[][] { { 1, 1 }, { 2, 2 }, { 3, 3 } }, 3),
                new maxPointsRecord(new int[][] { { 1, 1 }, { 3, 2 }, { 5, 3 }, { 4, 1 }, { 2, 3 }, { 1, 4 } }, 4),
                new maxPointsRecord(
                        new int[][] { { 0, 0 }, { 4, 5 }, { 7, 8 }, { 8, 9 }, { 5, 6 }, { 3, 4 }, { 1, 1 } }, 5),

        };

        int i = 1;
        for (maxPointsRecord record : records) {
            System.out.println("# Test case " + i++);
            maxPoints.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(maxPointsRecord record) {
        System.out.println("input: points: " + Arrays.deepToString(record.points()));
        System.out.println("expected: " + record.expected());

        int res = new maxPoints().maxPointsSolution(record.points());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
