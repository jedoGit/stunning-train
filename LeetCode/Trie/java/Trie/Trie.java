package LeetCode.Trie.java.Trie;

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

record TrieRecord(String[] operations, String[][] words, List<String> expected) {
}

class TrieNode {
    private Map<Character, TrieNode> children = new HashMap<>();
    private boolean endOfWord = false;

    public TrieNode() {
    }

    public boolean existKeyInChildren(char key) {
        return this.children.containsKey(key);
    }

    public TrieNode getChildren(char key) {
        return this.children.get(key);
    }

    public void setChildren(char key, TrieNode node) {
        // this.children.compute(key, (k, v) -> (v == null) ? new TrieNode() : node);
        // this.children.computeIfAbsent(key, (k) -> new TrieNode());
        this.children.put(key, node);
    }

    public boolean getEndOfWord() {
        return this.endOfWord;
    }

    public void setEndOfWord(boolean value) {
        this.endOfWord = value;
    }
}

class Trie {

    private TrieNode root = null;

    public Trie() {
        this.root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode current = this.root;

        // for each chars in the word, check all the children if the c exists in the
        // key. If not, create a K/V.
        // We do this until we check all chars and then we mark the endOfWord to true
        for (char c : word.toCharArray()) {
            if (!current.existKeyInChildren(c)) {
                current.setChildren(c, new TrieNode());
            }
            // current.initChildrenIfKeyIsAbsent(c);
            current = current.getChildren(c);
        }

        current.setEndOfWord(true);
    }

    public boolean search(String word) {
        TrieNode current = this.root;
        // The search method will check each chars in word if it exists in our children
        // nodes.
        // If it does not exist, we return false. If we reach the end of the trie, we
        // return the endOfWord boolean
        for (char c : word.toCharArray()) {
            if (!current.existKeyInChildren(c)) {
                return false;
            }
            current = current.getChildren(c);
        }

        return current.getEndOfWord();
    }

    public boolean startsWith(String prefix) {
        TrieNode current = this.root;
        // The startsWith method will check each chars in prefix if it exists in our
        // children nodes.
        // If it does not exist, we return false. If we reach the end of the trie, we
        // return true
        for (char c : prefix.toCharArray()) {
            if (!current.existKeyInChildren(c)) {
                return false;
            }
            current = current.getChildren(c);
        }
        return true;
    }

    public static void main(String[] args) {
        TrieRecord[] records = new TrieRecord[] {
                new TrieRecord(
                        new String[] { "Trie", "insert", "search", "search", "startsWith", "insert", "search" },
                        new String[][] { {}, { "apple" }, { "apple" }, { "app" }, { "app" }, { "app" }, { "app" } },
                        List.of("null", "null", "true", "false", "true", "null", "true"))
        };

        int i = 1;
        for (TrieRecord record : records) {
            System.out.println("# Test case " + i++);
            Trie.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(TrieRecord record) {
        System.out.println("input:\toperations: " + Arrays.toString(record.operations()));
        System.out.println("\twords: " + Arrays.deepToString(record.words()));
        System.out.println("expected: " + record.expected());

        List<String> output = new ArrayList<>();
        Trie obj = null;

        for (int i = 0; i < record.operations().length; i++) {
            String operation = record.operations()[i].strip();

            switch (operation) {
                case "Trie" -> {
                    obj = new Trie();
                    output.add("null");
                }
                case "insert" -> {
                    obj.insert(record.words()[i][0]);
                    output.add("null");
                }
                case "search" -> {
                    output.add(String.valueOf(obj.search(record.words()[i][0])));
                }
                case "startsWith" -> {
                    output.add(String.valueOf(obj.startsWith(record.words()[i][0])));
                }
            }
        }

        System.out.println("result: " + output);
        System.out.println(output.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */