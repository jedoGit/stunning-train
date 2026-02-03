package LeetCode.Backtracking.java.permutations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
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

record permutationsRecord(int[] nums, List<List<Integer>> expected) {
}

public class permutations {
    List<List<Integer>> res = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();

    public List<List<Integer>> permute(int[] nums) {
        this.backtrack(new ArrayList<>(), nums);

        return this.res;
    }

    private void backtrack(List<Integer> path, int[] nums) {
        // Check if the length of our current values (path) is the same as the length of
        // the nums array
        if (path.size() == nums.length) {
            // remember to perform a copy not a reference
            this.res.add(new ArrayList<>(path));
            return;
        }

        // Assemble the permutation
        for (int i = 0; i < nums.length; i++) {
            // If we've seen this index before, just continue
            if (this.visited.contains(i)) {
                continue;
            }

            this.visited.add(i);

            path.add(nums[i]);

            this.backtrack(path, nums);

            path.removeLast();

            this.visited.remove(i);
        }
    }

    public static void main(String[] args) {
        permutationsRecord[] records = new permutationsRecord[] {
                new permutationsRecord(new int[] { 1, 2, 3 }, List.of(List.of(1, 2, 3), List.of(1, 3, 2),
                        List.of(2, 1, 3), List.of(2, 3, 1), List.of(3, 1, 2), List.of(3, 2, 1))),
                new permutationsRecord(new int[] { 0, 1 }, List.of(List.of(0, 1), List.of(1, 0))),
                new permutationsRecord(new int[] { 1 }, List.of(List.of(1)))
        };

        int i = 1;
        for (permutationsRecord record : records) {
            System.out.println("# Test case " + i++);
            permutations.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(permutationsRecord record) {
        System.out.println("input: nums: " + Arrays.toString(record.nums()));
        System.out.println("expected: " + record.expected());
        List<List<Integer>> res = new permutations().permute(record.nums());
        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
