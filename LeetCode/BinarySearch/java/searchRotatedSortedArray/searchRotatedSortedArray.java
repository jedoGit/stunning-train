package searchRotatedSortedArray;

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

record searchRotatedSortedArrayRecord(int[] nums, int target, int expected) {
}

class Solution {
    public int search(int[] nums, int target) {
        var l = 0;
        var r = nums.length - 1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            if (nums[m] == target) {
                return m;
            }

            if (nums[m] > nums[r]) { // Array is rotated and lowest value is in the right side
                // if the target we're looking for is in the left side
                if (target < nums[m] && target >= nums[l]) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            } else if (nums[m] < nums[l]) { // Array is rotated and the lowest value is in the left side
                // if the target we're looking for is in the right side
                if (target > nums[m] && target <= nums[r]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            } else { // Array is not rotated, so perform BST
                if (target > nums[m]) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        searchRotatedSortedArrayRecord[] records = new searchRotatedSortedArrayRecord[] {
                new searchRotatedSortedArrayRecord(new int[] { 4, 5, 6, 7, 0, 1, 2 }, 0, 4),
                new searchRotatedSortedArrayRecord(new int[] { 4, 5, 6, 7, 0, 1, 2 }, 3, -1),
                new searchRotatedSortedArrayRecord(new int[] { 1 }, 0, -1),
        };

        int i = 1;
        for (searchRotatedSortedArrayRecord record : records) {
            System.out.println("# Test case " + i++);
            Solution.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(searchRotatedSortedArrayRecord record) {
        System.out.println("input:\tnums: " + Arrays.toString(record.nums()));
        System.out.println("\ttarget: " + record.target());
        System.out.println("expected: " + record.expected());
        int res = new Solution().search(record.nums(), record.target());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}