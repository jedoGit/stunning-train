package LeetCode.MathProbs.java.squareRootX;

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

record squareRootXRecord(int x, int expected) {

}

class squareRootX {
    public int mySqrt(int x) {
        if (x == 0 || x == 1) {
            return x;
        }

        int l = 0;
        int r = x;

        int res = 0;

        while (l <= r) {
            int m = l + ((r - l) / 2);

            if (Math.pow(m, 2) > x) {
                r = m - 1;
            } else if (Math.pow(m, 2) < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }
        return res;
    }

    public static void main(String[] args) {
        squareRootXRecord[] records = new squareRootXRecord[] {
                new squareRootXRecord(4, 2),
                new squareRootXRecord(8, 2),
                new squareRootXRecord(2147395599, 46339)
        };

        int i = 1;
        for (squareRootXRecord record : records) {
            System.out.println("# Test case: " + i++);
            squareRootX.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(squareRootXRecord record) {
        System.out.println("input: x: " + record.x());
        System.out.println("expected: " + record.expected());

        int res = new squareRootX().mySqrt(record.x());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());

    }
}
