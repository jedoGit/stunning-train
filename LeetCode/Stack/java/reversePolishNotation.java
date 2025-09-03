package LeetCode.Stack.java;

import java.util.Arrays;
import java.util.Stack;

record reversePolishNotationRecord(String[] tokens, int expected) {
}

public class reversePolishNotation {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();

        for (String c : tokens) {
            switch (c) {
                case "+" -> stack.add(stack.pop() + stack.pop());
                case "-" -> {
                    int a = stack.pop();
                    int b = stack.pop();
                    stack.add(b - a);
                }
                case "*" -> stack.add(stack.pop() * stack.pop());
                case "/" -> {
                    int a = stack.pop();
                    int b = stack.pop();
                    stack.add(Integer.valueOf(b / a));
                }
                default -> stack.add(Integer.valueOf(c));
            }
        }

        return stack.peek();
    }

    public static void main(String[] args) {
        reversePolishNotationRecord input = new reversePolishNotationRecord(
                new String[] { "2", "1", "+", "3", "*" },
                9);
        reversePolishNotation.testSolution(input);

        input = new reversePolishNotationRecord(
                new String[] { "4", "13", "5", "/", "+" },
                6);
        reversePolishNotation.testSolution(input);

        input = new reversePolishNotationRecord(
                new String[] { "10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+" },
                22);
        reversePolishNotation.testSolution(input);
    }

    private static void testSolution(reversePolishNotationRecord input) {
        System.out.println("Input: s: " + Arrays.toString(input.tokens()));
        System.out.println("Expected: " + input.expected());
        int res = new reversePolishNotation().evalRPN(input.tokens());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
