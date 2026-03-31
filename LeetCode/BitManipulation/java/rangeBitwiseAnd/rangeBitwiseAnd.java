package LeetCode.BitManipulation.java.rangeBitwiseAnd;

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

record rangeBitwiseAndRecord(int left, int right, int expected) {
}

class rangeBitwiseAnd {
    public int rangeBitwiseAndSolution1(int left, int right) {
        int cnt = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            cnt++;
        }

        return left << cnt;
    }

    public int rangeBitwiseAndSolution2(int left, int right) {
        while (right > left) {
            right = right & (right - 1);
        }
        return right & left;
    }

    public static void main(String[] args) {
        rangeBitwiseAndRecord[] records = new rangeBitwiseAndRecord[] {
                new rangeBitwiseAndRecord(5, 7, 4),
                new rangeBitwiseAndRecord(0, 0, 0),
                new rangeBitwiseAndRecord(1, 2147483647, 0)
        };

        int i = 1;
        for (rangeBitwiseAndRecord record : records) {
            System.out.println("# Test case " + i++);
            rangeBitwiseAnd.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(rangeBitwiseAndRecord record) {
        System.out.println("input:\tleft: " + record.left());
        System.out.println("\tright: " + record.right());
        System.out.println("expected: " + record.expected());
        int res = new rangeBitwiseAnd().rangeBitwiseAndSolution2(record.left(), record.right());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
