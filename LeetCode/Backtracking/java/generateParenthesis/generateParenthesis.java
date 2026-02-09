package LeetCode.Backtracking.java.generateParenthesis;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
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

record generateParenthesisRecord(int n, List<String> expected) {
}

class generateParenthesis {
    private Deque<String> stack = new ArrayDeque<>();
    private List<String> res = new ArrayList<>();

    public List<String> generateParenthesisSolution(int n) {
        this.backtrack(0, 0, n);

        return this.res;

    }

    private void backtrack(int openN, int closedN, int n) {
        if (openN == n && closedN == n) {
            this.res.add(String.join("", this.stack));
            return;
        }

        if (openN < n) {
            this.stack.addLast("(");
            this.backtrack(openN + 1, closedN, n);
            this.stack.removeLast();
        }

        if (closedN < openN) {
            this.stack.addLast(")");
            this.backtrack(openN, closedN + 1, n);
            this.stack.removeLast();
        }

        return;
    }

    public static void main(String[] args) {
        generateParenthesisRecord[] records = new generateParenthesisRecord[] {
                new generateParenthesisRecord(3, List.of("((()))", "(()())", "(())()", "()(())", "()()()")),
                new generateParenthesisRecord(1, List.of("()"))
        };

        int i = 1;
        for (generateParenthesisRecord record : records) {
            System.out.println("# Test case " + i++);
            generateParenthesis.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(generateParenthesisRecord record) {
        System.out.println("input: n: " + record.n());
        System.out.println("expected: " + record.expected());
        List<String> res = new generateParenthesis().generateParenthesisSolution(record.n());
        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
