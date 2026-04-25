package LeetCode.DP1D.java;

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

record climbingStairsRecord(int n, int expected) {
}

class climbingStairs {
    public int computeClimbStairs(int n) {
        if (n <= 3)
            return n;

        int prev1 = 3;
        int prev2 = 2;
        int cur = 0;

        for (int i = 3; i < n; i++) {
            cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }

        return cur;
    }

    private static void testSolution(climbingStairsRecord record) {
        System.out.println("input: n: " + record.n());
        System.out.println("expected: " + record.expected());

        int res = new climbingStairs().computeClimbStairs(record.n());
        System.out.println("result: " + res);

        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }

    public static void main(String[] args) {
        climbingStairsRecord[] records = new climbingStairsRecord[] {
                new climbingStairsRecord(2, 2),
                new climbingStairsRecord(3, 3)
        };

        int i = 1;
        for (climbingStairsRecord record : records) {
            System.out.println("# Test case " + i++);
            climbingStairs.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

}