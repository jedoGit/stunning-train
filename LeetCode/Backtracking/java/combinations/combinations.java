package LeetCode.Backtracking.java.combinations;

import java.util.ArrayList;
import java.util.List;

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

record combinationsRecord(int n, int k, List<List<Integer>> expected) {
}

public class combinations {
    private List<List<Integer>> result = new ArrayList<>();
    private List<Integer> comb = new ArrayList<>();

    public List<List<Integer>> combine(int n, int k) {
        this.result.clear();
        this.comb.clear();

        this.backTrack(1, n, k);

        return this.result;
    }

    private void backTrack(int start, int n, int k) {
        if (this.comb.size() == k) {
            // Create a new ArrayList copy of the current combination
            this.result.add(new ArrayList<>(comb));
            return;
        }

        for (int i = start; i < n + 1; i++) {
            this.comb.add(i);
            this.backTrack(i + 1, n, k);
            this.comb.removeLast();
        }
    }

    public static void main(String[] args) {
        combinationsRecord[] records = new combinationsRecord[] {
                new combinationsRecord(4, 2, List.of(
                        List.of(1, 2), List.of(1, 3), List.of(1, 4), List.of(2, 3), List.of(2, 4), List.of(3, 4))),
                new combinationsRecord(1, 1, List.of(List.of(1)))
        };

        int i = 1;
        System.out.println("-".repeat(50));
        for (combinationsRecord record : records) {
            System.out.println("# Test case " + i++);
            combinations.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(combinationsRecord record) {
        System.out.println("input:\tn: " + record.n());
        System.out.println("\tk: " + record.k());
        System.out.println("expected: " + record.expected());
        List<List<Integer>> res = new combinations().combine(record.n(), record.k());
        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
