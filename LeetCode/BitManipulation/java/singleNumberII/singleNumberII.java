package LeetCode.BitManipulation.java.singleNumberII;

import java.util.Arrays;

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

record singleNumberIIRecord(int[] nums, int expected) {
}

class singleNumberII {
    public int singleNumber(int[] nums) {
        int ones = 0;
        int twos = 0;

        for (int num : nums) {
            ones = (ones ^ num) & ~twos;
            twos = (twos ^ num) & ~ones;
        }

        return ones;
    }

    public static void main(String[] args) {
        singleNumberIIRecord[] records = new singleNumberIIRecord[] {
                new singleNumberIIRecord(new int[] { 2, 2, 3, 2 }, 3),
                new singleNumberIIRecord(new int[] { 0, 1, 0, 1, 0, 1, 99 }, 99),
        };

        int i = 1;
        for (singleNumberIIRecord record : records) {
            System.out.println("# Test case " + i++);
            singleNumberII.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(singleNumberIIRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());
        int res = new singleNumberII().singleNumber(record.nums());
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
