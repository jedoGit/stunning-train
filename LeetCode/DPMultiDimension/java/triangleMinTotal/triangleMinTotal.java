package LeetCode.DPMultiDimension.java.triangleMinTotal;

import java.util.List;
import java.util.Arrays;

enum TestResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    TestResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}

record TriangleMinTotalRecord(List<List<Integer>> triangle, int expected) {
}

class triangleMinTotal {
    public int computeMinimumTotal(List<List<Integer>> triangle) {
        // New comment
        Integer[] dp = new Integer[triangle.size() + 1];
        Arrays.fill(dp, 0);

        for (int row = triangle.size() - 1; row >= 0; row--) {
            List<Integer> rowValues = triangle.get(row);

            for (int i = 0; i < rowValues.size(); i += 1) {
                dp[i] = rowValues.get(i) + Math.min(dp[i], dp[i + 1]);
            }
        }

        return dp[0];
    }

    private static void testSolution(TriangleMinTotalRecord record) {
        System.out.println("input: " + record.triangle());
        System.out.println("expected: " + record.expected());

        int result = new triangleMinTotal().computeMinimumTotal(record.triangle());
        System.out.println("result: " + result);

        System.out.println(result == record.expected() ? TestResult.PASS.getValue() : TestResult.FAIL.getValue());
    }

    public static void main(String[] args) {
        TriangleMinTotalRecord[] records = new TriangleMinTotalRecord[] {
                new TriangleMinTotalRecord(List.of(List.of(2), List.of(3, 4), List.of(6, 5, 7), List.of(4, 1, 8, 3)),
                        11),
                new TriangleMinTotalRecord(List.of(List.of(-10)), -10),
                new TriangleMinTotalRecord(List.of(List.of(-1), List.of(2, 3), List.of(1, -1, -1)), 0),
                new TriangleMinTotalRecord(List.of(List.of(1), List.of(2, 3), List.of(4, 5, 6), List.of(7, 8, 9, 10)),
                        14),
                new TriangleMinTotalRecord(List.of(List.of(5), List.of(9, 6), List.of(4, 6, 8), List.of(0, 7, 1, 5)),
                        18),
                new TriangleMinTotalRecord(List.of(List.of(10), List.of(9, 8), List.of(1, 2, 3)), 20),
                new TriangleMinTotalRecord(List.of(List.of(0), List.of(1, 2), List.of(3, 1, 3), List.of(1, 1, 5, 1),
                        List.of(4, 2, 1, 2, 4)), 4),
                new TriangleMinTotalRecord(List.of(List.of(-2)), -2),
                new TriangleMinTotalRecord(List.of(List.of(3), List.of(-1, -2)), 1),
                new TriangleMinTotalRecord(List.of(List.of(0), List.of(1, 2), List.of(-3, 1, 3)), -2),
                new TriangleMinTotalRecord(List.of(List.of(-1), List.of(-2, -3), List.of(-4, -5, -6),
                        List.of(-7, -8, -9, -10), List.of(-11, -12, -13, -14, -15)), -35)
        };

        int i = 1;
        for (TriangleMinTotalRecord record : records) {
            System.out.println("# Test case " + i++);
            triangleMinTotal.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }
}
