package LeetCode.BitManipulation.java.singleNumber;

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

record singleNumberRecord(int[] nums, int expected) {

}

class singleNumber {
    public int singleNumberSolution(int[] nums) {
        int ans = 0;

        for (int num : nums) {
            ans ^= num;
        }

        return ans;
    }

    public static void main(String[] args) {
        singleNumberRecord[] records = new singleNumberRecord[] {
                new singleNumberRecord(new int[] { 2, 2, 1 }, 1),
                new singleNumberRecord(new int[] { 4, 1, 2, 1, 2 }, 4),
                new singleNumberRecord(new int[] { 1 }, 1)
        };

        int i = 1;
        for (singleNumberRecord record : records) {
            System.out.println("# Test case " + i++);
            singleNumber.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(singleNumberRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());
        int res = new singleNumber().singleNumberSolution(record.nums());
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }

}
