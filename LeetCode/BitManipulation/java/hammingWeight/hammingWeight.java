package LeetCode.BitManipulation.java.hammingWeight;

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

record hammingWeightRecord(int n, int expected) {

}

class hammingWeight {
    public int hammingWeightSolution(int n) {
        int res = 0;

        for (int i = 0; i < 32; i++) {
            if (((n >> i) & 1) != 0) {
                res += 1;
            }
        }

        return res;
    }

    public static void main(String[] args) {
        hammingWeightRecord[] records = new hammingWeightRecord[] {
                new hammingWeightRecord(11, 3),
                new hammingWeightRecord(128, 1),
                new hammingWeightRecord(2147483645, 30)
        };

        int i = 1;
        for (hammingWeightRecord record : records) {
            System.out.println("# Test case " + i++);
            hammingWeight.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(hammingWeightRecord record) {
        System.out.println("input: n: " + record.n());
        System.out.println("expected: " + record.expected());
        int res = new hammingWeight().hammingWeightSolution(record.n());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
