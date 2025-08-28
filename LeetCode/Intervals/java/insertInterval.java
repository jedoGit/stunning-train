package LeetCode.Intervals.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

record insertIntervalRecord(int[][] intervals, int[] newInterval, int[][] expected) {
}

public class insertInterval {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();

        final int start = 0;
        final int end = 1;

        for (int i = 0; i < intervals.length; i++) {
            if (newInterval[end] < intervals[i][start]) {
                res.add(newInterval);

                // We need to return [ res, intervals[i:] ]
                Stream<int[]> st1 = res.stream(); // Stream of int[]
                Stream<int[]> st2 = Arrays.stream(intervals) // Stream of int[]
                        .skip(i); // Skip the first i elements

                // Merge the stream of int[] and convert to int[][]
                int[][] mergedArray = Stream.concat(st1, st2).toArray(int[][]::new);

                return mergedArray;
            } else if (newInterval[start] > intervals[i][end]) {
                res.add(intervals[i]);
            } else {
                newInterval = new int[] { Math.min(newInterval[start], intervals[i][start]),
                        Math.max(newInterval[end], intervals[i][end]) };
            }
        }

        res.add(newInterval);

        return res.stream().toArray(int[][]::new);
    }

    public static void main(String[] args) {
        insertIntervalRecord input = new insertIntervalRecord(
                new int[][] { { 1, 3 }, { 6, 9 } },
                new int[] { 2, 5 },
                new int[][] { { 1, 5 }, { 6, 9 } });
        insertInterval.testSolution(input);

        input = new insertIntervalRecord(
                new int[][] { { 1, 2 }, { 3, 5 }, { 6, 7 }, { 8, 10 }, { 12, 16 } },
                new int[] { 4, 8 },
                new int[][] { { 1, 2 }, { 3, 10 }, { 12, 16 } });
        insertInterval.testSolution(input);
    }

    private static void testSolution(insertIntervalRecord input) {
        System.out.println("Input: intervals: " + Arrays.deepToString(input.intervals()));
        System.out.println("newIntervals: " + Arrays.toString(input.newInterval()));
        System.out.println("Expected: " + Arrays.deepToString(input.expected()));
        int[][] res = new insertInterval().insert(input.intervals(), input.newInterval());
        System.out.println("Result: " + Arrays.deepToString(res));
        System.out.println(Arrays.deepEquals(res, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
