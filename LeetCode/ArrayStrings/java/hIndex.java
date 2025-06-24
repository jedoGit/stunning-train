package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record hIndexRecord(int[] citations, int expected) {

}

public class hIndex {
    public int hIndexSolution(int[] citations) {
        int n = citations.length;

        int[] paper_counts = new int[n + 1];
        Arrays.fill(paper_counts, 0);

        for (int c : citations) {
            paper_counts[Math.min(n, c)] = paper_counts[Math.min(n, c)] + 1;
        }

        int h = n;
        int papers = paper_counts[n];

        while (papers < h) {
            h -= 1;
            papers += paper_counts[h];
        }

        return h;
    }

    public static void main(String[] args) {
        hIndexRecord input = new hIndexRecord(new int[] { 3, 0, 6, 1, 5 }, 3);
        hIndex.testSolution(input);
        input = new hIndexRecord(new int[] { 1, 3, 1 }, 1);
        hIndex.testSolution(input);
    }

    private static void testSolution(hIndexRecord input) {
        System.out.println("Input: citations: " + Arrays.toString(input.citations()));
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + new hIndex().hIndexSolution(input.citations()));
        System.out.println("-".repeat(50));
    }
}
