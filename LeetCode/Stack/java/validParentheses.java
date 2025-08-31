package LeetCode.Stack.java;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

record validParenthesesRecord(String s, boolean expected) {
}

public class validParentheses {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> closeToOpen = new HashMap<>() {
            {
                put(')', '(');
                put(']', '[');
                put('}', '{');
            }
        };

        for (char c : s.toCharArray()) {

            if (closeToOpen.containsKey(c)) {
                // For a deque, the first element is the top of the stack (LIFO).
                if (!stack.isEmpty() && stack.peekFirst().equals(closeToOpen.get(c))) {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }

        return stack.isEmpty() ? true : false;
    }

    public static void main(String[] args) {
        validParenthesesRecord input = new validParenthesesRecord("()", true);
        validParentheses.testSolution(input);

        input = new validParenthesesRecord("()[]{}", true);
        validParentheses.testSolution(input);

        input = new validParenthesesRecord("(]", false);
        validParentheses.testSolution(input);

        input = new validParenthesesRecord("([])", true);
        validParentheses.testSolution(input);

        input = new validParenthesesRecord("([)]", false);
        validParentheses.testSolution(input);
    }

    private static void testSolution(validParenthesesRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Expected: " + input.expected());
        boolean res = new validParentheses().isValid(input.s());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
