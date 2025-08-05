package LeetCode.SlidingWindow.java;

import java.util.HashMap;
import java.util.Map;

record minWindowSubstrRecord(String s, String t, String expected) {
}

public class minWindowSubstr {
    public String minWindow(String s, String t) {
        if (t.length() == 0) {
            return "";
        }

        Map<Character, Integer> countT = new HashMap<>();
        Map<Character, Integer> window = new HashMap<>();

        // Get a count of each chars of t. This represents the chars we need for the
        // substring
        for (Character c : t.toCharArray()) {
            countT.put(c, countT.getOrDefault(c, 0) + 1);
        }

        // System.out.println(countT.toString());

        int have = 0;
        int need = countT.keySet().size();
        int[] res = new int[] { -1, -1 };
        Integer resLen = Integer.MAX_VALUE;
        int l = 0;

        // We'll use sliding window to move through chars in s
        // We'll move the r pointer first until we find all the chars in t
        // Then, we'll the l pointer until we find a substr that is minimum in length
        for (int r = 0; r < s.length(); r += 1) {
            Character c = s.charAt(r);

            // Check our window map if we have the current char and update it
            window.put(c, window.getOrDefault(c, 0) + 1);

            // Check if this satisfy the condition?
            // Check if c is in our countT map and
            // Check if the count of c is equal, then update our have count
            if (countT.containsKey(c) && window.get(c).equals(countT.get(c))) {
                have += 1;
            }

            // Let's move the l pointers and update our result
            while (have == need) {
                if ((r - l + 1) < resLen) {
                    res = new int[] { l, r };
                    resLen = r - l + 1;
                }

                // We shrink the window by moving the l pointer
                // Make sure we remove chars from the window map and update our have count
                Character sChar = Character.valueOf(s.charAt(l));
                window.put(sChar, window.get(sChar) - 1);

                // If count if s[l] is less in window than in countT map,
                // we need to decrement our have variable
                if (countT.containsKey(sChar) && window.get(sChar) < countT.get(sChar)) {
                    have -= 1;
                }

                // Lastly, we increment our l pointer
                l += 1;
            }
        }

        // We need to return the minimun substring, we get the index from the res array
        int lp = res[0];
        int rp = res[1];

        return resLen.equals(Integer.MAX_VALUE) ? "" : s.substring(lp, rp + 1);
    }

    public static void main(String[] args) {
        minWindowSubstrRecord input = new minWindowSubstrRecord("ADOBECODEBANC", "ABC", "BANC");
        minWindowSubstr.testSolution(input);

        input = new minWindowSubstrRecord("a", "a", "a");
        minWindowSubstr.testSolution(input);

        input = new minWindowSubstrRecord("a", "aa", "");
        minWindowSubstr.testSolution(input);
    }

    private static void testSolution(minWindowSubstrRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Input: t: " + input.t());
        System.out.println("Expected: " + input.expected());
        String val = new minWindowSubstr().minWindow(input.s(), input.t());
        System.out.println("Result: " + val);
        System.out.println((input.expected().equals(val) ? "PASS" : "FAIL"));
        System.out.println("-".repeat(50));
    }
}
