package findFirstAndLastPosOfElInSorted;

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

record findFirstAndLastPosOfElInSortedRecord(int[] nums, int target, int[] expected) {
}

class Solution {
    public int[] searchRange(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;
        int[] res = { -1, -1 };

        while (l <= r) {
            int m = l + ((r - l) / 2);

            if (target > nums[m]) {
                l = m + 1;
            } else if (target < nums[m]) {
                r = m - 1;
            } else {
                while (nums[l] != target)
                    l++;
                while (nums[r] != target)
                    r--;

                res[0] = l;
                res[1] = r;
                break;
            }
        }

        return res;
    }

    public static void main(String[] args) {
        findFirstAndLastPosOfElInSortedRecord[] records = new findFirstAndLastPosOfElInSortedRecord[] {
                new findFirstAndLastPosOfElInSortedRecord(new int[] { 5, 7, 7, 8, 8, 10 }, 8, new int[] { 3, 4 }),
                new findFirstAndLastPosOfElInSortedRecord(new int[] { 5, 7, 7, 8, 8, 10 }, 6, new int[] { -1, -1 }),
                new findFirstAndLastPosOfElInSortedRecord(new int[] {}, 0, new int[] { -1, -1 })
        };

        int i = 1;
        for (findFirstAndLastPosOfElInSortedRecord record : records) {
            System.out.println("# Test case" + i++);
            Solution.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(findFirstAndLastPosOfElInSortedRecord record) {
        System.out.println("input:\tnums: " + Arrays.toString(record.nums()));
        System.out.println("\ttarget: " + record.target());
        System.out.println("expected: " + Arrays.toString(record.expected()));

        int[] res = new Solution().searchRange(record.nums(), record.target());

        System.out.println("result: " + Arrays.toString(res));
        System.out.println(
                Arrays.equals(res, record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}