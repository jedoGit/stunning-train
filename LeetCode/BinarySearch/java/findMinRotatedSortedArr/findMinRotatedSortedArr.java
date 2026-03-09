package findMinRotatedSortedArr;

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

record findMinRotatedSortedArrRecord(int[] nums, int expected) {
}

class Solution {
    public int findMin(int[] nums) {

        int l = 0;
        int r = nums.length - 1;

        while (l < r) {
            int m = (int) (r + l) / 2;

            if (nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return nums[l];
    }

    public static void main(String[] args) {
        findMinRotatedSortedArrRecord[] records = new findMinRotatedSortedArrRecord[] {
                new findMinRotatedSortedArrRecord(new int[] { 3, 4, 5, 1, 2 }, 1),
                new findMinRotatedSortedArrRecord(new int[] { 4, 5, 6, 7, 0, 1, 2 }, 0),
                new findMinRotatedSortedArrRecord(new int[] { 11, 13, 15, 17 }, 11),
        };

        int i = 1;
        for (findMinRotatedSortedArrRecord record : records) {
            System.out.println("# Test case " + i++);
            Solution.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(findMinRotatedSortedArrRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());
        int res = new Solution().findMin(record.nums());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}