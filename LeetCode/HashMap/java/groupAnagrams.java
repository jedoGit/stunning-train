package LeetCode.HashMap.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

record groupAnagramsRecord(String[] strs, List<List<String>> expected) {
}

public class groupAnagrams {
    public List<List<String>> groupAnagramsSolution(String[] strs) {
        int select = 2;

        if (select == 1) {
            System.out.println("Using groupAnagramsSolution1()");
            return groupAnagramsSolution1(strs);
        } else {
            System.out.println("Using groupAnagramsSolution2()");
            return groupAnagramsSolution2(strs);
        }
    }

    public List<List<String>> groupAnagramsSolution1(String[] strs) {
        Map<String, List<String>> res = new HashMap<>();

        for (String s : strs) {
            // we need an array of size 26 to store the counts for each chars
            int[] count = new int[26];
            Arrays.fill(count, 0);

            // Let's count the chars in each strings
            for (char c : s.toCharArray()) {
                // What were doing here is to map a char to a certain value
                // for example, "d" = 100, "a" = 97 => d-a = 100 - 97 = 3 => "d"
                // here "d" is mapped to 3, and we count the occurence of d, which is mapped to
                // index 3.
                char idx = (char) (c - "a".charAt(0));
                count[idx] += 1;
            }

            // We need to convert count array to a string so we can search our hashmap
            // The whole count array will become our key in the hashmap.
            String countStr = Arrays.toString(count);

            // Check first if we have the count string in our hashmap
            // if not, create it and for the value, create an array and push the string s
            // If so, get the k/v pair and push s to the values array
            List<String> tmp = res.getOrDefault(countStr, new ArrayList<>());
            tmp.add(s);
            res.put(countStr, tmp);
        }

        return res.values().stream().toList();
    }

    public List<List<String>> groupAnagramsSolution2(String[] strs) {
        // What we need to do here is go through each string in strs.
        // Group each strings if they have the same number of letters and the same
        // letters.
        Map<String, List<String>> res = new HashMap<>();

        for (String s : strs) {
            // Convert the string to a char array and sort them.
            char[] chars = s.toCharArray();
            Arrays.sort(chars);

            // We want to use this sorted char array as key to our res map.
            // We need to convet it to string.
            String sortedChars = String.valueOf(chars);

            // Check if our sorted chars string key exists in our res map.
            // If not, initialize it with an empty arraylist
            // If so, get the existing arraylist and append the string s.
            List<String> tmp = res.getOrDefault(sortedChars, new ArrayList<>());
            tmp.add(s);
            res.put(sortedChars, tmp);
        }

        return res.values().stream().toList();
    }

    public static void main(String[] args) {
        groupAnagramsRecord input = new groupAnagramsRecord(
                new String[] { "eat", "tea", "tan", "ate", "nat", "bat" },
                List.of(List.of("bat"),
                        List.of("tan", "nat"),
                        List.of("eat", "tea", "ate")));

        groupAnagrams.testSolution(input);

        input = new groupAnagramsRecord(new String[] { "" }, List.of(List.of("")));
        groupAnagrams.testSolution(input);

        input = new groupAnagramsRecord(new String[] { "a" }, List.of(List.of("a")));
        groupAnagrams.testSolution(input);

    }

    private static void testSolution(groupAnagramsRecord input) {

        System.out.println("Input: strs: " + Arrays.toString(input.strs()));
        System.out.println("Expected: " + input.expected().toString());
        List<List<String>> res = new groupAnagrams().groupAnagramsSolution(input.strs());
        System.out.println("Result: " + res.toString());
        System.out.println(groupAnagrams.isEqual(res, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static boolean isEqual(List<List<String>> l1, List<List<String>> l2) {
        if (l1.size() != l2.size()) {
            return false;
        }

        // We'll use set to compare the two List<List<String>> input
        // We'll have a Set<Set<String>>

        Set<Set<String>> canonicalList1 = new HashSet<>();

        // Here for each innerlist of the input, add it as a new hashset and append to
        // the outer hashset
        for (List<String> innerList : l1) {
            canonicalList1.add(new HashSet<>(innerList));
        }

        // Here for each innerlist of the input, add it as a new hashset and append to
        // the outer hashset
        Set<Set<String>> canonicalList2 = new HashSet<>();
        for (List<String> innerList : l2) {
            canonicalList2.add(new HashSet<>(innerList));
        }

        // We then compare the outer hashsets
        return canonicalList1.equals(canonicalList2);
    }
}
