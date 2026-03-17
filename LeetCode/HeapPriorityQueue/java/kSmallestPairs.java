package LeetCode.HeapPriorityQueue.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

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

record kSmallestPairsRecord(int[] nums1, int[] nums2, int k, List<List<Integer>> expected) {
}

record recordPair(int sumVal, int i, int j) {
}

class kSmallestPairs {
    public List<List<Integer>> getkSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<List<Integer>> res = new ArrayList<>();

        if (nums1.length == 0 || nums2.length == 0 || k == 0) {
            return res;
        }

        // push to heap: [sum(nums1[0], nums2[0]), 0, 0] => [s, i, j] => we're using s
        // as the index for comparison in the heap
        PriorityQueue<recordPair> hmin = new PriorityQueue<>(Comparator.comparingInt(recordPair::sumVal));
        Set<List<Integer>> visited = new HashSet<>();

        hmin.add(new recordPair(nums1[0] + nums2[0], 0, 0));
        visited.add(List.of(0, 0));

        while (k > 0 && !hmin.isEmpty()) {
            recordPair record = hmin.poll();

            int i = record.i();
            int j = record.j();

            res.add(List.of(nums1[i], nums2[j]));

            if (i + 1 < nums1.length && !visited.contains(List.of(i + 1, j))) {
                hmin.add(new recordPair(nums1[i + 1] + nums2[j], i + 1, j));
                visited.add(List.of(i + 1, j));
            }

            if (j + 1 < nums2.length && !visited.contains(List.of(i, j + 1))) {
                hmin.add(new recordPair(nums1[i] + nums2[j + 1], i, j + 1));
                visited.add(List.of(i, j + 1));
            }

            k -= 1;
        }

        return res;
    }

    public static void main(String[] args) {
        kSmallestPairsRecord[] records = new kSmallestPairsRecord[] {
                new kSmallestPairsRecord(new int[] { 1, 7, 11 }, new int[] { 2, 4, 6 }, 3,
                        List.of(List.of(1, 2), List.of(1, 4), List.of(1, 6))),
                new kSmallestPairsRecord(new int[] { 1, 1, 2 }, new int[] { 1, 2, 3 }, 2,
                        List.of(List.of(1, 1), List.of(1, 1)))
        };

        int i = 1;
        for (kSmallestPairsRecord record : records) {
            System.out.println("# Test case " + i++);
            kSmallestPairs.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(kSmallestPairsRecord record) {
        System.out.println("input:\tnums1: " + Arrays.toString(record.nums1()));
        System.out.println("\tnums2: " + Arrays.toString(record.nums2()));
        System.out.println("\tk: " + record.k());
        System.out.println("expected: " + record.expected());

        List<List<Integer>> res = new kSmallestPairs().getkSmallestPairs(record.nums1(), record.nums2(), record.k());
        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
