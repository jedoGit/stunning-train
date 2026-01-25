package LeetCode.Trie.java.wordDictionary;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

record wordDictionaryRecord(String[] operations, String[][] words, List<String> expected) {
}

class TrieNode {
    public Map<Character, TrieNode> children;
    public boolean endOfWord;

    TrieNode() {
        this.children = new HashMap<>();
        this.endOfWord = false;
    }
}

class WordDictionary {

    private TrieNode root;

    public WordDictionary() {
        this.root = new TrieNode();
    }

    public void addWord(String word) {
        // For each chars in the word, check if it's a key in the trie node children
        // object, if not, add it as a key with trie node as the value
        // If exist, switch to this trie node and mark the end of word to true
        TrieNode cur = this.root;

        for (char c : word.toCharArray()) {
            cur = cur.children.computeIfAbsent(c, k -> new TrieNode());
        }

        cur.endOfWord = true;
    }

    public boolean search(String word) {
        return this.DFS(0, this.root, word);
    }

    private boolean DFS(int index, TrieNode node, String word) {
        // DFS to check all of the children of the root node
        // We only need to see 1 match and return true. After that, we don't need to
        // check all the other children
        TrieNode cur = node;

        // We need to start from index!!!!
        for (int i = index; i < word.length(); i++) {
            char c = word.charAt(i);

            // This is the wildcard search if c is a "."
            // We need to check all the children of this root trie node
            if (c == '.') {
                // Remember, children is an object, we can call object.values() to return all
                // the children as an array.
                // The values portion of the children are the trie node.
                for (TrieNode child : cur.children.values()) {
                    if (this.DFS(i + 1, child, word)) {
                        return true;
                    }
                }
                return false;
            } else {
                if (!cur.children.containsKey(c)) {
                    return false;
                }
                cur = cur.children.get(c);
            }
        }

        return cur.endOfWord;
    }

    public static void main(String[] args) {
        wordDictionaryRecord[] records = new wordDictionaryRecord[] {
                new wordDictionaryRecord(
                        new String[] { "WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search",
                                "search" },
                        new String[][] { {}, { "bad" }, { "dad" }, { "mad" }, { "pad" }, { "bad" }, { ".ad" },
                                { "b.." } },
                        List.of("null", "null", "null", "null", "false", "true", "true", "true"))
        };

        int i = 1;
        for (wordDictionaryRecord record : records) {
            System.out.println("# Test case " + i++);
            WordDictionary.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(wordDictionaryRecord record) {
        System.out.println("input:\toperations: " + Arrays.toString(record.operations()));
        System.out.println("\twords: " + Arrays.deepToString(record.words()));
        System.out.println("expected: " + record.expected());

        WordDictionary obj = null;
        List<String> res = new ArrayList<>();

        for (int i = 0; i < record.operations().length; i++) {
            String operation = record.operations()[i];

            switch (operation) {
                case "WordDictionary" -> {
                    obj = new WordDictionary();
                    res.add("null");
                }
                case "addWord" -> {
                    obj.addWord(record.words()[i][0]);
                    res.add("null");
                }
                case "search" -> {
                    boolean tmp = obj.search(record.words()[i][0]);
                    res.add(String.valueOf(tmp).toLowerCase());
                }
            }
        }

        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary();
 * obj.addWord(word);
 * boolean param_2 = obj.search(word);
 */