package LeetCode.ArrayStrings.java.findMedianSortedArrays;

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

record findMedianSortedArraysRecord(int[] nums1, int[] nums2, double expected) {

}

class findMedianSortedArrays {
    public double findMedianSortedArraysSolution(int[] nums1, int[] nums2) {
        int[] A = nums1;
        int[] B = nums2;

        // Ensure A is the smaller array to keep complexity O(log(min(m, n)))
        if (B.length < A.length) {
            int[] temp = A;
            A = B;
            B = temp;
        }

        int m = A.length;
        int n = B.length;
        int total = m + n;
        int half = (m + n) / 2;

        int l = 0;
        int r = m; // Search range is [0, m] inclusive

        while (l <= r) {
            int i = l + (r - l) / 2; // Partition index in A
            int j = half - i; // Partition index in B

            // Boundary values
            int Aleft = (i > 0) ? A[i - 1] : Integer.MIN_VALUE;
            int Aright = (i < m) ? A[i] : Integer.MAX_VALUE;
            int Bleft = (j > 0) ? B[j - 1] : Integer.MIN_VALUE;
            int Bright = (j < n) ? B[j] : Integer.MAX_VALUE;

            // Check if partition is correct
            if (Aleft <= Bright && Bleft <= Aright) {
                // If total elements are odd, the median is the smallest of the right half
                if (total % 2 != 0) {
                    return Math.min(Aright, Bright);
                }
                // If even, average of the max-left and min-right
                return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2.0;
            } else if (Aleft > Bright) {
                r = i - 1; // Too many elements from A in the left side
            } else {
                l = i + 1; // Too few elements from A in the left side
            }
        }
        return 0.0;
    }

    public static void main(String[] args) {
        findMedianSortedArraysRecord[] records = new findMedianSortedArraysRecord[] {
                new findMedianSortedArraysRecord(new int[] { 1, 3 }, new int[] { 2 }, 2.00000),
                new findMedianSortedArraysRecord(new int[] { 1, 2 }, new int[] { 3, 4 }, 2.50000)
        };

        int i = 1;
        for (findMedianSortedArraysRecord record : records) {
            System.out.println("# Test case " + i++);
            findMedianSortedArrays.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(findMedianSortedArraysRecord record) {
        System.out.println("input:\tnums: " + Arrays.toString(record.nums1()));
        System.out.println("\tnums2: " + Arrays.toString(record.nums2()));
        String fmtExp = String.format("%.5f", record.expected());
        System.out.println("expected: " + fmtExp);

        double res = new findMedianSortedArrays().findMedianSortedArraysSolution(record.nums1(), record.nums2());
        String fmtRes = String.format("%.5f", res);
        System.out.println("result: " + fmtRes);

        System.out.println(
                Double.valueOf(fmtRes) == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
