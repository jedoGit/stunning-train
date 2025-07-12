package LeetCode.ArrayStrings.java;

import java.util.LinkedList;
import java.util.List;

record reverseWordRecord(String s, String expected) {
}

public class reverseWord {
    public String reverseWords1(String s) {
        // Take in the input string and split it with space as delimeter
        String[] strArr = s.split("\\s+");
        int n = strArr.length;

        // System.out.println(Arrays.toString(strArr));

        // Now we do some swapping by using two pointers to start at both ends and
        // moving them to the middle
        for (int i = 0; i < Math.floor(n / 2); i += 1) {
            var tmp = strArr[i];
            strArr[i] = strArr[n - 1 - i];
            strArr[n - 1 - i] = tmp;
        }
        // we want to make sure we trim the end of the string
        return String.join(" ", strArr).trim();

    }

    public String reverseWords2(String s) {
        // Take in the input string and split it with space as delimeter
        String[] strArr = s.split("\\s+");
        int n = strArr.length;
        // System.out.println(Arrays.toString(strArr));

        // we'll use a stack to save the words in the string
        List<String> stack = new LinkedList<>();
        StringBuffer revWord = new StringBuffer();

        // Add the words to the stack
        for (String word : strArr) {
            stack.add(word);
        }

        // Now let's construct the reverse word
        for (int i = 0; i < n; i += 1) {
            revWord.append(stack.removeLast() + " ");
        }

        // we want to make sure we trim the end of the string
        return revWord.toString().stripTrailing();
    }

    public static void main(String[] args) {
        reverseWordRecord input = new reverseWordRecord("the sky is blue", "blue is sky the");
        reverseWord.testSolution(input);

        input = new reverseWordRecord("  hello world  ", "world hello");
        reverseWord.testSolution(input);

        input = new reverseWordRecord("a good   example", "example good a");
        reverseWord.testSolution(input);
    }

    private static void testSolution(reverseWordRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Expected: " + input.expected());
        reverseWord soln = new reverseWord();
        String s1 = soln.reverseWords1(input.s());
        String s2 = soln.reverseWords2(input.s());
        System.out.println("Result1: " + s1 + "\n\t Result: " + (input.expected().equals(s1) ? "Correct" : "Wrong"));
        System.out.println("Result2: " + s2 + "\n\t Result: " + (input.expected().equals(s2) ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }

}
