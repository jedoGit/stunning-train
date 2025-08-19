package LeetCode.HashMap.java;

import java.util.HashMap;
import java.util.Map;

record validAnagramRecord(String s, String t, boolean expected) {
}

public class validAnagram {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> countS = new HashMap<>();
        Map<Character, Integer> countT = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            countS.put(s.charAt(i), countS.getOrDefault(s.charAt(i), 0) + 1);
            countT.put(t.charAt(i), countT.getOrDefault(t.charAt(i), 0) + 1);
        }

        for (Character c : countS.keySet()) {
            if (!countS.get(c).equals(countT.get(c))) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        validAnagramRecord input = new validAnagramRecord("anagram", "nagaram", true);
        validAnagram.testSolution(input);

        input = new validAnagramRecord("rat", "car", false);
        validAnagram.testSolution(input);
    }

    private static void testSolution(validAnagramRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("\tt: " + input.t());
        System.out.println("Expected: " + input.expected());
        boolean res = new validAnagram().isAnagram(input.s(), input.t());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
