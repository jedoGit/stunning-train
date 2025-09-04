package LeetCode.Stack.java;

import java.util.Stack;

record basicCalculatorRecord(String s, int expected) {
}

public class basicCalculator {
    public int calculate(String s) {
        int cur = 0;
        int res = 0;
        int sign = 1; // 1 is addition, -1 is subtraction
        Stack<Integer> stack = new Stack<>();

        for (char c : s.toCharArray()) {

            if (c >= '0' && c <= '9') {
                cur = cur * 10 + Integer.parseInt(String.valueOf(c));
            } else if (c == '+' || c == '-') {
                res += sign * cur;
                sign = (c == '+') ? 1 : -1;
                cur = 0;
            } else if (c == '(') {
                stack.push(res);
                stack.push(sign);
                sign = 1;
                res = 0;
            } else if (c == ')') {
                res += sign * cur;
                res *= stack.pop();
                res += stack.pop();
                cur = 0;
            }
        }

        return res + sign * cur;
    }

    public static void main(String[] args) {
        basicCalculatorRecord input = new basicCalculatorRecord("1 + 1", 2);
        basicCalculator.testSolution(input);

        input = new basicCalculatorRecord(" 2-1 + 2 ", 3);
        basicCalculator.testSolution(input);

        input = new basicCalculatorRecord("(1+(4+5+2)-3)+(6+8)", 23);
        basicCalculator.testSolution(input);
    }

    private static void testSolution(basicCalculatorRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Expected: " + input.expected());
        int res = new basicCalculator().calculate(input.s());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
