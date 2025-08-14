package LeetCode.HashMap.java;

import java.util.HashMap;
import java.util.Map;

record isomorphicStringsRecord(String s, String t, boolean expected) {
}

public class isomorphicStrings {
    public boolean isIsomorphic(String s, String t) {
        Map<Character, Character> mapST = new HashMap<>();
        Map<Character, Character> mapTS = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            Character c1 = s.charAt(i);
            Character c2 = t.charAt(i);

            if (mapST.containsKey(c1) && !mapST.get(c1).equals(c2) ||
                    mapTS.containsKey(c2) && !mapTS.get(c2).equals(c1)) {
                return false;
            }

            mapST.put(c1, c2);
            mapTS.put(c2, c1);
        }

        return true;
    }

    public static void main(String[] args) {
        isomorphicStringsRecord input = new isomorphicStringsRecord("egg", "add", true);
        isomorphicStrings.testSolution(input);

        input = new isomorphicStringsRecord("foo", "bar", false);
        isomorphicStrings.testSolution(input);

        input = new isomorphicStringsRecord("paper", "title", true);
        isomorphicStrings.testSolution(input);
    }

    private static void testSolution(isomorphicStringsRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("\tt: " + input.t());
        System.out.println("Expected: " + input.expected());
        boolean res = new isomorphicStrings().isIsomorphic(input.s(), input.t());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
