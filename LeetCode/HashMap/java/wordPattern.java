package LeetCode.HashMap.java;

import java.util.HashMap;
import java.util.Map;

record wordPatternRecord(String pattern, String s, boolean expected) {

}

public class wordPattern {
    public boolean wordPatternSolution(String pattern, String s) {
        // We need to create an array of words from the input s
        String[] words = s.split("\\s+");

        // We need to make sure that the length of the list of words is equal to the
        // length of the number of chars in the pattern string.
        if (words.length != pattern.length()) {
            return false;
        }

        // We'll use a JS Object to keep track of k/v pairs
        Map<Character, String> charToWord = new HashMap<>();
        Map<String, Character> wordToChar = new HashMap<>();

        // Since we know that both the pattern and words array should have the same
        // length, we'll use the pattern lenght to bound the for-loop
        for (int i = 0; i < pattern.length(); i++) {
            char c = pattern.charAt(i);
            String w = words[i];

            if (charToWord.containsKey(c) && !charToWord.get(c).equals(w)) {
                return false;
            }

            if (wordToChar.containsKey(w) && !wordToChar.get(w).equals(c)) {
                return false;
            }

            charToWord.put(c, w);
            wordToChar.put(w, c);
        }

        return true;
    }

    public static void main(String[] args) {
        wordPatternRecord input = new wordPatternRecord("abba", "dog cat cat dog", true);
        wordPattern.testSolution(input);

        input = new wordPatternRecord("abba", "dog cat cat fish", false);
        wordPattern.testSolution(input);

        input = new wordPatternRecord("aaaa", "dog cat cat dog", false);
        wordPattern.testSolution(input);
    }

    private static void testSolution(wordPatternRecord input) {
        System.out.println("Input: pattern: " + input.pattern());
        System.out.println("\ts: " + input.s());
        System.out.println("Expected: " + input.expected());
        boolean res = new wordPattern().wordPatternSolution(input.pattern(), input.s());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
