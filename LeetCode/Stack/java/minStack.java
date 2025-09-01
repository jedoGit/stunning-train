package LeetCode.Stack.java;

import java.util.Arrays;
import java.util.Stack;

record minStackRecord(String[] operation, int[][] val, String[] expected) {
}

public class minStack {
    private Stack<Integer> stack;
    private Stack<Integer> mStack;

    public minStack() {
        this.stack = new Stack<>();
        this.mStack = new Stack<>();
    }

    public void push(int val) {
        this.stack.push(val);
        int tmpVal = Math.min(val, !this.mStack.isEmpty() ? this.mStack.peek() : val);
        this.mStack.push(tmpVal);
    }

    public void pop() {
        this.stack.pop();
        this.mStack.pop();
    }

    public int top() {
        return this.stack.peek();
    }

    public int getMin() {
        return this.mStack.peek();
    }

    public static void main(String[] args) {
        minStackRecord input = new minStackRecord(
                new String[] { "MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin" },
                new int[][] { {}, { -2 }, { 0 }, { -3 }, {}, {}, {}, {} },
                new String[] { "null", "null", "null", "null", "-3", "null", "0", "-2" });

        minStack.testSolution(input);
    }

    private static void testSolution(minStackRecord input) {
        System.out.println("Input: Operations: " + Arrays.toString(input.operation()) + "\n\t"
                + " values: " + Arrays.deepToString(input.val()));

        int n = input.operation().length;
        String[] output = new String[n];
        minStack soln = null;

        for (int i = 0; i < n; i += 1) {
            switch (input.operation()[i].strip()) {
                case "MinStack" -> {
                    soln = new minStack();
                    output[i] = "null";
                }
                case "push" -> {
                    output[i] = "null";
                    soln.push(input.val()[i][0]);
                }
                case "pop" -> {
                    output[i] = "null";
                    soln.pop();
                }
                case "top" -> {
                    output[i] = String.valueOf(soln.top());
                }
                case "getMin" -> {
                    output[i] = String.valueOf(soln.getMin());
                }
            }
        }

        System.out.println("Expected: " + Arrays.toString(input.expected()));
        System.out.println("Result: " + Arrays.toString(output));

        boolean res = minStack.validateResult(output, input.expected());
        System.out.println(res ? "PASS" : "FAIL");
    }

    private static boolean validateResult(String[] output, String[] expected) {
        if (output.length != expected.length) {
            return false;
        }

        for (int i = 0; i < output.length; i++) {
            if (!output[i].equals(expected[i])) {
                return false;
            }
        }

        return true;
    }
}
