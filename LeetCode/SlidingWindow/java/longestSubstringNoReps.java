package LeetCode.SlidingWindow.java;

import java.util.HashSet;
import java.util.Set;

record longestSubstringNoRepsRecord(String s, int expected) {
}

public class longestSubstringNoReps {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>(); // we use a set to keep track of duplicates
        int maxLen = 0;
        int n = s.length();
        int l = 0;

        // Check each chars of s using r pointer
        for (int r = 0; r < n; r += 1) {
            // Check if there are duplicates in our set and update our set
            // Here we're shrinking our window by moving the left pointer
            // and removing the duplicate from our set
            while (set.contains(s.charAt(r))) {
                set.remove(s.charAt(l));
                l += 1;
            }

            // at this point, our set have no duplicates, so add the char to our set
            set.add(s.charAt(r));

            // at every iteration, update our max length
            maxLen = Math.max(maxLen, r - l + 1);

        }

        return maxLen;
    }

    public static void main(String[] args) {
        longestSubstringNoRepsRecord input = new longestSubstringNoRepsRecord("abcabcbb", 3);
        longestSubstringNoReps.testSolution(input);

        input = new longestSubstringNoRepsRecord("bbbbb", 1);
        longestSubstringNoReps.testSolution(input);

        input = new longestSubstringNoRepsRecord("pwwkew", 3);
        longestSubstringNoReps.testSolution(input);
    }

    private static void testSolution(longestSubstringNoRepsRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Expected: " + input.expected());
        int val = new longestSubstringNoReps().lengthOfLongestSubstring(input.s());
        System.out.println("Result: " + val);
        System.out.println((val == input.expected() ? "PASS" : "FAIL"));
        System.out.println("-".repeat(50));
    }
}
