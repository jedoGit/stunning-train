package LeetCode.Backtracking.java.combinationSum;

import java.util.ArrayList;
import java.util.Arrays;
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

record combinationSumRecord(int[] candidates, int target, List<List<Integer>> expected) {
}

class combinationSum {
    private List<List<Integer>> res = new ArrayList<>();
    private int[] candidates = null;
    private int target = 0;

    public List<List<Integer>> combinationSumSolution(int[] candidates, int target) {
        this.candidates = Arrays.copyOf(candidates, candidates.length);
        this.target = target;

        this.backtrack(0, 0, new ArrayList<>());
        return this.res;
    }

    private void backtrack(int start, int curSum, List<Integer> path) {
        if (curSum == this.target) {
            this.res.add(new ArrayList<>(path));
            return;
        }

        if (curSum > this.target) {
            return;
        }

        for (int i = start; i < this.candidates.length; i++) {
            curSum += this.candidates[i];
            path.add(this.candidates[i]);

            this.backtrack(i, curSum, path);

            curSum -= this.candidates[i];
            path.removeLast();
        }
        return;
    }

    public static void main(String[] args) {
        combinationSumRecord[] records = new combinationSumRecord[] {
                new combinationSumRecord(new int[] { 2, 3, 6, 7 }, 7, List.of(List.of(2, 2, 3), List.of(7))),
                new combinationSumRecord(new int[] { 2, 3, 5 }, 8,
                        List.of(List.of(2, 2, 2, 2), List.of(2, 3, 3), List.of(3, 5))),
                new combinationSumRecord(new int[] { 2 }, 1, List.of()),
        };

        int i = 1;
        System.out.println("-".repeat(50));
        for (combinationSumRecord record : records) {
            System.out.println("# Test case " + i++);
            combinationSum.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(combinationSumRecord record) {
        System.out.println("input: candidates: " + Arrays.toString(record.candidates()));
        System.out.println("target: " + record.target());
        System.out.println("expected: " + record.expected());

        List<List<Integer>> res = new combinationSum().combinationSumSolution(record.candidates(), record.target());

        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
