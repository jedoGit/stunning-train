package LeetCode.ArrayStrings.java.maxSubArray;

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

record maxSubArrayRecord(int[] nums, int expected) {

}

class maxSubArray {
    public int maxSubArraySolution(int[] nums) {
        int accumVal = 0;
        int maxVal = Integer.MIN_VALUE;

        for (int num : nums) {
            accumVal += num;
            maxVal = Math.max(accumVal, maxVal);

            if (accumVal < 0) {
                accumVal = 0;
            }
        }
        return maxVal;
    }

    public static void main(String[] args) {
        maxSubArrayRecord[] records = new maxSubArrayRecord[] {
                new maxSubArrayRecord(new int[] { -2, 1, -3, 4, -1, 2, 1, -5, 4 }, 6),
                new maxSubArrayRecord(new int[] { 1 }, 1),
                new maxSubArrayRecord(new int[] { 5, 4, -1, 7, 8 }, 23)
        };

        int i = 1;
        for (maxSubArrayRecord record : records) {
            System.out.println("# Test case " + i++);
            maxSubArray.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(maxSubArrayRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());

        int res = new maxSubArray().maxSubArraySolution(record.nums());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }

}
