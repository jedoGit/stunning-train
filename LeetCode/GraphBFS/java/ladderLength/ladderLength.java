package LeetCode.GraphBFS.java.ladderLength;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

}

record ladderLengthRecord(String beginWord, String endWord, List<String> wordList, int expected) {
}

public class ladderLength {
    public int ladderLengthSolution(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        // check if the endWord is not in the wordList, if so, return 0
        if (!wordSet.contains(endWord)) {
            return 0;
        }

        // nei is a k/v where k is a pattern of words and v is an array of words from
        // the wordList that match the pattern
        // nei = {"h*t":[hot, hit, hat], "*nt":[ant, int]}
        Map<String, List<String>> nei = new HashMap<>();
        wordSet.add(beginWord);

        // create an adjacency list
        // go through each words in the wordlist and match it to the pattern.
        // create a pattern for each word, hit=> *it, h*t, hi*. for each of these
        // patterns, add the word to the nei.
        // example: "*it": [hit], "h*t":[hit], "hi*":[hit]
        for (String word : wordSet) {
            // System.out.println(word);
            for (int j = 0; j < word.length(); j++) {
                String pattern = word.substring(0, j) + "*" + word.substring(j + 1, word.length());
                // List<String> tmpList = nei.getOrDefault(pattern, new ArrayList<>());
                // tmpList.add(word);
                // nei.put(pattern, tmpList);
                nei.computeIfAbsent(pattern, k -> new ArrayList<>()).add(word);
            }
        }

        // System.out.println(nei);
        // At this point we have the nei object... it's a list of the patterns and the
        // words associated to tha pattern.
        // example: "*it": [hit], "h*t":[hit], "hi*":[hit]

        // BFS each keys in nei
        Set<String> visited = new HashSet<>();
        visited.add(beginWord);

        Deque<String> queue = new LinkedList<>();
        queue.addLast(beginWord);
        // System.out.println(queue);

        int res = 1;

        while (!queue.isEmpty()) {
            int qSize = queue.size();
            // we just want to loop until q is empty
            for (int i = 0; i < qSize; i++) {
                String word = queue.pollFirst();
                // System.out.println(word);

                // If word is equal to endWord, we're done and return res
                if (word.equals(endWord)) {
                    return res;
                }

                // For the word we're currently processing, let's create all possible patterns
                // and check the nei object and visit each pattern match
                // Each time, add the words we visited and add it to the q so we can BFS it next
                // round
                for (int j = 0; j < word.length(); j++) {
                    String pattern = word.substring(0, j) + "*" + word.substring(j + 1, word.length());

                    // nei[pattern] returns an array
                    // process all words under this pattern
                    for (String neiWord : nei.get(pattern)) {
                        if (!visited.contains(neiWord)) {
                            visited.add(neiWord);
                            queue.addLast(neiWord);
                        }
                    }
                }
            }
            // increment res after every processing of word in the queue
            res += 1;
        }

        return 0;
    }

    public static void main(String[] args) {
        ladderLengthRecord[] records = new ladderLengthRecord[] {
                new ladderLengthRecord("hit", "cog",
                        new ArrayList<>(Arrays.asList("hot", "dot", "dog", "lot", "log", "cog")), 5),
                new ladderLengthRecord("hit", "cog",
                        new ArrayList<>(Arrays.asList("hot", "dot", "dog", "lot", "log")), 0),
                new ladderLengthRecord("red", "tax", new ArrayList<>(Arrays.asList("ted", "tex", "red", "tax", "tad",
                        "den", "rex", "pee")), 4)
        };

        int i = 0;
        for (ladderLengthRecord record : records) {
            System.out.println("Test case " + ++i);
            ladderLength.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    public static void testSolution(ladderLengthRecord record) {
        System.out.println("input:\tbeginWord: " + record.beginWord());
        System.out.println("\tendWord: " + record.endWord());
        System.out.println("\twordList: " + record.wordList());
        System.out.println("expected: " + record.expected());

        int res = new ladderLength().ladderLengthSolution(record.beginWord(), record.endWord(), record.wordList());

        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
