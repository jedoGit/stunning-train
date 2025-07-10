package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record longestCommonPrefixRecord(String[] strs, String expected) {
}

public class longestCommonPrefix {
    public String longestCommonPrefixSolution(String[] strs) {

        // We need to sort the words in the strings
        // After it's sorted, we compare the words at index 0 and the last index chars
        // by chars
        // Exit if we see that there's no common chars
        Arrays.sort(strs);

        int n = strs.length;

        String s1 = strs[0];
        String s2 = strs[n - 1];

        StringBuilder res = new StringBuilder();

        int i = 0;

        // Because this is sorted, s1 will contain the string with smaller length
        while (i < s1.length() && s1.charAt(i) == s2.charAt(i)) {
            res.append(String.valueOf(s1.charAt(i)));
            i += 1;
        }

        return res.toString();
    }

    public static void main(String[] args) {
        longestCommonPrefixRecord input = new longestCommonPrefixRecord(
                new String[] { "flower", "flow", "flight" },
                "fl");

        longestCommonPrefix.testSolution(input);

        input = new longestCommonPrefixRecord(
                new String[] { "dog", "racecar", "car" },
                "");

        longestCommonPrefix.testSolution(input);
    }

    private static void testSolution(longestCommonPrefixRecord input) {
        System.out.println("Input: strs: " + Arrays.toString(input.strs()));
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + new longestCommonPrefix().longestCommonPrefixSolution(input.strs()));
        System.out.println("-".repeat(50));
    }

}
