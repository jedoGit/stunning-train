package LeetCode.TwoPointers.java;

record isSubsequenceRecord(String s, String t, boolean expected) {
}

public class isSubsequence {
    public boolean isSubsequenceSolution(String s, String t) {
        int sp = 0;
        int tp = 0;

        while (sp < s.length() && tp < t.length()) {
            if (s.charAt(sp) == t.charAt(tp)) {
                sp += 1;
            }
            tp += 1;
        }

        return sp == s.length() ? true : false;
    }

    public static void main(String[] args) {
        isSubsequenceRecord input = new isSubsequenceRecord("abc", "ahbgdc", true);
        isSubsequence.testSolution(input);

        input = new isSubsequenceRecord("axc", "ahbgdc", false);
        isSubsequence.testSolution(input);
    }

    public static void testSolution(isSubsequenceRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Input: t: " + input.t());
        System.out.println("Expected: " + input.expected());
        boolean val = new isSubsequence().isSubsequenceSolution(input.s(), input.t());
        System.out.println("Result: " + val + ", " + (val == input.expected() ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
