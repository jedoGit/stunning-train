package LeetCode.HashMap.java;

import java.util.HashMap;
import java.util.Map;

record ransomNoteRecord(String ransomNote, String magazine, boolean expected) {
}

public class ransomNote {
    public boolean canConstruct(String ransomNote, String magazine) {
        Map<Character, Integer> count = new HashMap<>();

        // Let's build a count of each chars in the magazine
        for (Character c : magazine.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        // Here, we check each chars in ransomNote if it exists in our count dictionary
        // If it exist, we decrement the count in the count dictionary... if it it's the
        // last one, we'll remove the entry from out count dictionary
        for (Character c : ransomNote.toCharArray()) {
            int charCheck = count.getOrDefault(c, 0);

            if (charCheck < 1) {
                return false;
            } else {
                count.put(c, charCheck - 1);
                if (count.getOrDefault(c, 0) < 1) {
                    count.remove(c);
                }
            }
        }

        return true;
    }

    public static void main(String[] args) {
        ransomNoteRecord input = new ransomNoteRecord("a", "b", false);
        ransomNote.testSolution(input);

        input = new ransomNoteRecord("aa", "ab", false);
        ransomNote.testSolution(input);

        input = new ransomNoteRecord("aa", "aab", true);
        ransomNote.testSolution(input);
    }

    private static void testSolution(ransomNoteRecord input) {
        System.out.println("Input: ransomeNote: " + input.ransomNote());
        System.out.println("\tmagazine: " + input.magazine());
        System.out.println("Expected: " + input.expected());
        boolean res = new ransomNote().canConstruct(input.ransomNote(), input.magazine());
        System.out.println("Result: " + res);
        System.out.println(input.expected() == res ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
