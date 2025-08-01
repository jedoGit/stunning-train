package LeetCode.SlidingWindow.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

record substringWithConcatenationRecord(String s, String[] words, List<Integer> expected) {
}

public class substringWithConcatenation {

    public List<Integer> findSubstring(String s, String[] words) {
        int input = 0;
        if (input == 0) {
            System.out.println("findSubstring1");
            return findSubstring1(s, words);
        } else {
            System.out.println("findSubstring2");
            return findSubstring2(s, words);
        }
    }

    public List<Integer> findSubstring1(String s, String[] words) {
        // edge case
        if (s.length() == 0 || words.length == 0) {
            return List.of();
        }

        // Let's grab a word freq map
        Map<String, Integer> word_freq = new HashMap<>();

        for (String word : words) {
            word_freq.put(word, word_freq.getOrDefault(word, 0) + 1);
        }
        // Map<String, Long> word_freq = Arrays.stream(words)
        // .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        // System.out.println("word_freq: " + word_freq.toString());

        // We need these lengths in order to update our window
        final int word_len = words[0].length(); // represents the length of word at index 0
        final int window_len = words.length * word_len; // represents the length of the window we need to check.

        List<Integer> res = new ArrayList<>();

        // We'll loop through each char of s and slide the window
        // Let's create a window by using r + window_len
        // In this window, let's set the current word of s and check of each word is in
        // our need word list
        for (int r = 0; r < s.length() - window_len + 1; r += 1) {
            Map<String, Integer> subStr_freq = new HashMap<>();
            int l = r;

            // let's check window length at a time
            while (l < r + window_len) {
                // in our window, let's check the word we need
                String cur_word = s.substring(l, l + word_len);

                // If the current word does not exist in our required word map, we break the
                // while loop
                if (!word_freq.containsKey(cur_word)) {
                    break;
                }

                // At this point, the current word is in our required word list
                // Now, let's create a map of our current word list.. This are the words we see
                // in the window
                // if (subStr_freq.containsKey(cur_word)) {
                // subStr_freq.put(cur_word, subStr_freq.get(cur_word) + 1);
                // } else {
                // subStr_freq.put(cur_word, 1);
                // }
                subStr_freq.put(cur_word, subStr_freq.getOrDefault(cur_word, 0) + 1);

                // Let's check if the number of words we see in our current word list is greater
                // than the required word list
                // If so, we found all the words we need and let's break out of the while loop
                if (subStr_freq.get(cur_word) > word_freq.get(cur_word)) {
                    break;
                }

                // We keep going and slide our window
                l += word_len;
            }

            // At ths point, we exited the while loop and our l and r + window_len pointer
            // overlapped
            // So we push index r to our results array
            if (l == r + window_len) {
                res.add(r);
            }
        }

        return res;
    }

    public List<Integer> findSubstring2(String s, String[] words) {
        List<Integer> result = new ArrayList<>();
        if (s.length() == 0 || words.length == 0)
            return result;

        int wordLen = words[0].length();
        int totalWords = words.length;
        // int totalLen = wordLen * totalWords;

        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        for (int i = 0; i < wordLen; i++) {
            int left = i, right = i;
            int count = 0;
            Map<String, Integer> seen = new HashMap<>();

            while (right + wordLen <= s.length()) {
                String word = s.substring(right, right + wordLen);
                right += wordLen;

                if (wordCount.containsKey(word)) {
                    seen.put(word, seen.getOrDefault(word, 0) + 1);
                    count++;

                    while (seen.get(word) > wordCount.get(word)) {
                        String leftWord = s.substring(left, left + wordLen);
                        seen.put(leftWord, seen.get(leftWord) - 1);
                        count--;
                        left += wordLen;
                    }

                    if (count == totalWords) {
                        result.add(left);
                    }
                } else {
                    seen.clear();
                    count = 0;
                    left = right;
                }
            }
        }

        return result;
    }

    public static void main(String[] args) {
        substringWithConcatenationRecord input = new substringWithConcatenationRecord(
                "barfoothefoobarman",
                new String[] { "foo", "bar" },
                List.of(0, 9));
        substringWithConcatenation.testSolution(input);

        input = new substringWithConcatenationRecord(
                "wordgoodgoodgoodbestword",
                new String[] { "foo", "bar" },
                List.of());
        substringWithConcatenation.testSolution(input);

        input = new substringWithConcatenationRecord(
                "barfoofoobarthefoobarman",
                new String[] { "bar", "foo", "the" },
                List.of(6, 9, 12));
        substringWithConcatenation.testSolution(input);
    }

    private static void testSolution(substringWithConcatenationRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("words: " + Arrays.toString(input.words()));
        System.out.println("Expected: " + input.expected());
        List<Integer> val = new substringWithConcatenation().findSubstring(input.s(), input.words());
        System.out.println("Result: " + val);
        System.out.println((input.expected().equals(val) ? "PASS" : "FAIL"));
        System.out.println("-".repeat(50));
    }
}
