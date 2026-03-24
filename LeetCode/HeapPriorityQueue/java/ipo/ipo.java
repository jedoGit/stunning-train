package LeetCode.HeapPriorityQueue.java.ipo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;

import java.util.List;
import java.util.PriorityQueue;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

record projectRecord(Integer capital, Integer profit) {
}

record findMaximizedCapitalRecord(int k, int w, int[] profits, int[] capital, int expected) {
}

class ipo {

    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;

        List<projectRecord> projects = IntStream.range(0, capital.length)
                .mapToObj(i -> new projectRecord(capital[i], profits[i]))
                .sorted(Comparator.comparing(projectRecord::capital))
                .collect(Collectors.toCollection(ArrayList::new));

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());

        int i = 0;

        while (k > 0) {
            while (i < n && projects.get(i).capital() <= w) {
                maxHeap.add(projects.get(i).profit());
                i++;
            }
            if (maxHeap.isEmpty()) {
                return w;
            }
            w += maxHeap.poll();
            k--;
        }

        return w;
    }

    public static void main(String[] args) {
        findMaximizedCapitalRecord[] records = new findMaximizedCapitalRecord[] {
                new findMaximizedCapitalRecord(2, 0, new int[] { 1, 2, 3 }, new int[] { 0, 1, 1 }, 4),
                new findMaximizedCapitalRecord(3, 0, new int[] { 1, 2, 3 }, new int[] { 0, 1, 2 }, 6),
        };

        int i = 1;
        for (findMaximizedCapitalRecord record : records) {
            System.out.println("# Test case " + i++);
            ipo.testSolution(record);
            System.out.println("-".repeat(50));
        }

    }

    private static void testSolution(findMaximizedCapitalRecord record) {
        System.out.println("input:\tk: " + record.k());
        System.out.println("\tw: " + record.w());
        System.out.println("\tprofits: " + Arrays.toString(record.profits()));
        System.out.println("\tcapital: " + Arrays.toString(record.capital()));

        int res = new ipo().findMaximizedCapital(record.k(), record.w(), record.profits(), record.capital());

        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
