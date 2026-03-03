package findPeakElements;

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

record findPeakElementRecord(int[] nums, int expected) {
}

class Solution {
    public int findPeakElement(int[] nums) {
        int l = 0;
        int r = nums.length - 1;

        while (l < r) {
            int m = (int) Math.floor((r + l) / 2);

            if (nums[m] > nums[m + 1]) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }

    public static void main(String[] args) {
        findPeakElementRecord[] records = new findPeakElementRecord[] {
                new findPeakElementRecord(new int[] { 1, 2, 3, 1 }, 2),
                new findPeakElementRecord(new int[] { 1, 2, 1, 3, 5, 6, 4 }, 5)
        };

        int i = 1;
        for (findPeakElementRecord record : records) {
            System.out.println("# Test case " + i++);
            Solution.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(findPeakElementRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());
        int res = new Solution().findPeakElement(record.nums());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}