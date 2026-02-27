package LeetCode.ArrayStrings.java.searchInsert;

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

record searchInsertRecord(int[] nums, int target, int expected) {
}

public class searchInsert {
    public int searchInsertSolution(int[] nums, int target) {
        int l = 0;
        int r = nums.length;

        while (l < r) {
            int m = l + ((r - l) / 2);
            if (target > nums[m]) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return r;
    }

    public static void main(String[] args) {
        searchInsertRecord[] records = new searchInsertRecord[] {
                new searchInsertRecord(new int[] { 1, 3, 5, 6 }, 5, 2),
                new searchInsertRecord(new int[] { 1, 3, 5, 6 }, 2, 1),
                new searchInsertRecord(new int[] { 1, 3, 5, 6 }, 7, 4),
        };

        int i = 1;
        for (searchInsertRecord record : records) {
            System.out.println("# Test case " + i++);
            searchInsert.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(searchInsertRecord record) {
        System.out.println("input:\tnums: " + Arrays.toString(record.nums()));
        System.out.println("\ttarget: " + record.target());
        System.out.println("expected: " + record.expected());

        int res = new searchInsert().searchInsertSolution(record.nums(), record.target());

        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
