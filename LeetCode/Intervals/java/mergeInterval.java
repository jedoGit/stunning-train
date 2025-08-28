package LeetCode.Intervals.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

record mergeIntervalRecord(int[][] intervals, int[][] expected) {
}

public class mergeInterval {

    public int[][] merge(int[][] intervals) {
        int select = 1;

        if (select == 1) {
            System.out.println("merge1()");
            return merge1(intervals);
        } else {
            System.out.println("merge2()");
            return merge2(intervals);
        }
    }

    public int[][] merge1(int[][] intervals) {

        // System.out.println(Arrays.deepToString(intervals));

        // Arrays.sort(intervals, new Comparator<int[]>() {
        // @Override
        // public int compare(int[] arr1, int[] arr2) {
        // return Integer.compare(arr1[0], arr2[0]);
        // }
        // });

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        // System.out.println(Arrays.deepToString(intervals));

        List<int[]> merged = new ArrayList<>();

        int[] prev = intervals[0];

        for (int i = 1; i < intervals.length; i++) {
            int[] interval = intervals[i];

            if (interval[0] <= prev[1]) {
                prev[1] = Math.max(prev[1], interval[1]);
            } else {
                merged.add(prev);
                prev = interval;

            }
        }

        merged.add(prev);

        return merged.stream()
                .toArray(int[][]::new);
    }

    public int[][] merge2(int[][] intervals) {

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        int[] prev = intervals[0];

        for (int i = 1; i < intervals.length; i++) {
            int[] interval = intervals[i];
            if (interval[0] <= prev[1]) {
                prev[1] = Math.max(prev[1], interval[1]);
            } else {
                merged.add(prev);
                prev = interval;
            }
        }

        merged.add(prev);

        return merged.toArray(new int[merged.size()][]);

    }

    public static void main(String[] args) {
        mergeIntervalRecord input = new mergeIntervalRecord(
                new int[][] { { 1, 3 }, { 2, 6 }, { 8, 10 }, { 15, 18 } },
                new int[][] { { 1, 6 }, { 8, 10 }, { 15, 18 } });
        mergeInterval.testSolution(input);

        input = new mergeIntervalRecord(
                new int[][] { { 1, 4 }, { 4, 5 } },
                new int[][] { { 1, 5 } });
        mergeInterval.testSolution(input);
    }

    private static void testSolution(mergeIntervalRecord input) {
        System.out.println("Input: intervals: " + Arrays.deepToString(input.intervals()));
        System.out.println("Expected: " + Arrays.deepToString(input.expected()));
        int[][] res = new mergeInterval().merge(input.intervals());
        System.out.println("Result: " + Arrays.deepToString(res));
        System.out.println(Arrays.deepEquals(res, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
