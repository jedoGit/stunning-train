package LeetCode.DP1D.java.climbingStairs;

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

record ClimbingStairsRecord(int n, int expected) {
}

class climbingStairs {
    public int computeClimbStairs(int n) {
        if (n <= 2) {
            return n;
        }

        int prev1 = 2;
        int prev2 = 1;
        int cur = 0;

        for (int i = 3; i <= n; i++) {
            cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }

        return cur;
    }

    private static void testSolution(ClimbingStairsRecord record) {
        System.out.println("input: n: " + record.n());
        System.out.println("expected: " + record.expected());

        int res = new climbingStairs().computeClimbStairs(record.n());
        System.out.println("result: " + res);

        System.out.println(res == record.expected() ? TestResult.PASS.getValue() : TestResult.FAIL.getValue());
    }

    public static void main(String[] args) {
        ClimbingStairsRecord[] records = new ClimbingStairsRecord[] {
                new ClimbingStairsRecord(1, 1),
                new ClimbingStairsRecord(2, 2),
                new ClimbingStairsRecord(3, 3),
                new ClimbingStairsRecord(4, 5),
                new ClimbingStairsRecord(5, 8),
                new ClimbingStairsRecord(6, 13)
        };

        int i = 1;
        for (ClimbingStairsRecord record : records) {
            System.out.println("# Test case " + i++);
            climbingStairs.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

}
