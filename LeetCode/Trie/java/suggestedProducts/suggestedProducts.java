package LeetCode.Trie.java.suggestedProducts;

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

record suggestedProductsRecord(String[] products, String searchWord, List<List<String>> expected) {
}

class TrieNode {
    public Map<Character, TrieNode> children;
    public List<String> words;
    public int numWords;

    public TrieNode() {
        this.children = new HashMap<>();
        this.words = new ArrayList<>();
        this.numWords = 0;
    }
}

class Trie {
    public TrieNode root;

    public Trie() {
        this.root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode cur = this.root;

        for (char c : word.toCharArray()) {
            cur = cur.children.computeIfAbsent(c, k -> new TrieNode());

            if (cur.numWords < 3) {
                cur.words.add(word);
                cur.numWords++;
            }
        }
    }

    public List<String> findWordByPrefix(String prefix) {
        TrieNode cur = this.root;

        for (char c : prefix.toCharArray()) {
            if (!cur.children.containsKey(c)) {
                return List.of();
            }

            cur = cur.children.get(c);
        }

        return cur.words;
    }
}

class suggestedProducts {
    public List<List<String>> suggestedProductsSolution(String[] products, String searchWord) {
        // Sort the products arrays in place
        Arrays.sort(products);
        // System.out.println("sorted: " + Arrays.toString(products));

        Trie trie = new Trie();

        for (String word : products) {
            trie.addWord(word);
        }

        List<List<String>> ans = new ArrayList<>();
        StringBuilder sb = new StringBuilder();

        for (char c : searchWord.toCharArray()) {
            sb.append(String.valueOf(c));
            ans.add(trie.findWordByPrefix(sb.toString()));
        }

        return ans;
    }

    public static void main(String[] args) {
        suggestedProductsRecord[] records = new suggestedProductsRecord[] {
                new suggestedProductsRecord(new String[] { "mobile", "mouse", "moneypot", "monitor", "mousepad" },
                        "mouse",
                        List.of(List.of("mobile", "moneypot", "monitor"), List.of("mobile", "moneypot", "monitor"),
                                List.of("mouse", "mousepad"), List.of("mouse", "mousepad"),
                                List.of("mouse", "mousepad"))),
                new suggestedProductsRecord(new String[] { "havana" },
                        "havana",
                        List.of(List.of("havana"), List.of("havana"),
                                List.of("havana"), List.of("havana"),
                                List.of("havana"), List.of("havana"))),
                new suggestedProductsRecord(new String[] { "havana" },
                        "tatiana",
                        List.of(List.of(), List.of(), List.of(),
                                List.of(), List.of(),
                                List.of(), List.of())),
        };

        int i = 1;
        System.out.println("-".repeat(50));
        for (suggestedProductsRecord record : records) {
            System.out.println("# Test case " + i++);
            suggestedProducts.testSolution(record);
            System.out.println("-".repeat(50));
        }

    }

    private static void testSolution(suggestedProductsRecord record) {
        System.out.println("input:\tproducts: " + Arrays.toString(record.products()));
        System.out.println("\tsearchWords: " + record.searchWord());
        System.out.println("expected: " + record.expected());

        List<List<String>> res = new suggestedProducts().suggestedProductsSolution(record.products(),
                record.searchWord());

        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
