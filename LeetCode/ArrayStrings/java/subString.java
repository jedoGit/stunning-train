package LeetCode.ArrayStrings.java;

record subStringRecord(String haystack, String needle, int expected) {
}

public class subString {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) {
            return 0;
        }

        for (int i = 0; i < haystack.length() + 1 - needle.length(); i += 1) {
            if (haystack.substring(i, i + needle.length()).equals(needle)) {
                return i;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        subStringRecord input = new subStringRecord("sadbutsad", "sad", 0);
        subString.testSolution(input);

        input = new subStringRecord("leetcode", "leeto", -1);
        subString.testSolution(input);
    }

    private static void testSolution(subStringRecord input) {
        System.out.println("Input: haystack: " + input.haystack());
        System.out.println("Input: needle: " + input.needle());
        System.out.println("Expected: " + input.expected());
        int val = new subString().strStr(input.haystack(), input.needle());
        System.out.println("Result: " + val + ", " + (val == input.expected() ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
