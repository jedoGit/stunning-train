package LeetCode.ArrayStrings.java.maxSubarrSumCircular;

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

record maxSubarrSumCircularRecord(int[] nums, int expected) {
}

public class maxSubarrSumCircular {
    public int maxSubarraySumCircular(int[] nums) {
        int globMax = nums[0];
        int globMin = nums[0];
        int curMax = 0;
        int curMin = 0;
        int total = 0;

        for (int n : nums) {
            curMax = Math.max(curMax + n, n);
            curMin = Math.min(curMin + n, n);
            total += n;
            globMax = Math.max(globMax, curMax);
            globMin = Math.min(globMin, curMin);
        }

        return globMax > 0 ? Math.max(globMax, total - globMin) : globMax;
    }

    public static void main(String[] args) {
        maxSubarrSumCircularRecord[] records = new maxSubarrSumCircularRecord[] {
                new maxSubarrSumCircularRecord(new int[] { 1, -2, 3, -2 }, 3),
                new maxSubarrSumCircularRecord(new int[] { 5, -3, 5 }, 10),
                new maxSubarrSumCircularRecord(new int[] { -3, -2, -3 }, -2)
        };

        int i = 1;
        for (maxSubarrSumCircularRecord record : records) {
            System.out.println("# Test case " + i++);
            maxSubarrSumCircular.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(maxSubarrSumCircularRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());

        int res = new maxSubarrSumCircular().maxSubarraySumCircular(record.nums());

        System.out.println("result: " + res);

        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
