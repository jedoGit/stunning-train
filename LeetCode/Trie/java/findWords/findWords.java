package LeetCode.Trie.java.findWords;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
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

record FindWordsInputRecord(char[][] board, String[] words, String[] expected) {
}

class TrieNode {
    TrieNode[] links = new TrieNode[26];
    String word = null;
}

class findWords {
    public List<String> findWordsSolution(char[][] board, String[] words) {

        final int m = board.length;
        final int n = board[0].length;
        Set<String> res = new HashSet<>();
        TrieNode root = buildTrie(words);

        for (int i = 0; i < m; i += 1) {
            for (int j = 0; j < n; j += 1) {
                dfs(i, j, root, board, res);
            }
        }

        return res.stream().toList();
    }

    private void dfs(int i, int j, TrieNode root, char[][] board, Set<String> res) {
        // Check if i and j are out of bounds
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
            return;
        }

        // Check if the value in the board is either null or if is a "#"
        char ch = board[i][j];

        if (ch == '#' || root.links[ch - 'a'] == null) {
            return;
        }

        // Now, let's traverse through our trie links and check of the word is not null
        root = root.links[ch - 'a'];

        if (root.word != null) {
            res.add(root.word);
        }

        // Let's mark this section of the board with "#" so we don't have to visit it
        board[i][j] = '#';

        // Perform DFS on 4 directions of the board
        dfs(i, j - 1, root, board, res);
        dfs(i, j + 1, root, board, res);
        dfs(i - 1, j, root, board, res);
        dfs(i + 1, j, root, board, res);

        // After DFS, revert the value of the board back to the original value
        board[i][j] = ch;
    }

    private TrieNode buildTrie(String[] words) {
        TrieNode root = new TrieNode();

        for (String w : words) {
            TrieNode cur = root;

            for (char ch : w.toCharArray()) {
                if (cur.links[ch - 'a'] == null) {
                    cur.links[ch - 'a'] = new TrieNode();
                }
                cur = cur.links[ch - 'a'];
            }
            cur.word = w;
        }
        return root;
    }

    public static void main(String[] args) {

        FindWordsInputRecord[] records = new FindWordsInputRecord[] {
                new FindWordsInputRecord(
                        new char[][] { { 'o', 'a', 'a', 'n' }, { 'e', 't', 'a', 'e' }, { 'i', 'h', 'k', 'r' },
                                { 'i', 'f', 'l', 'v' } },
                        new String[] { "oath", "pea", "eat", "rain" },
                        new String[] { "oath", "eat" }),
                new FindWordsInputRecord(
                        new char[][] { { 'a', 'b' }, { 'c', 'd' } },
                        new String[] { "abcb" },
                        new String[] {}),
        };

        int i = 1;

        for (FindWordsInputRecord record : records) {
            System.out.println("# Test case " + i++);
            findWords.testSolution(record);
            System.out.println("-".repeat(50));
        }

    }

    private static void testSolution(FindWordsInputRecord record) {
        System.out.println(
                "Input: board: " + Arrays.deepToString(record.board()) + ",\n\twords: "
                        + Arrays.toString(record.words()));
        System.out.println("Expected: " + Arrays.toString(record.expected()));
        List<String> res = new findWords().findWordsSolution(record.board(), record.words());
        System.out.println("Result: " + res);
        System.out.println(Arrays.equals(res.toArray(), record.expected()) ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }
}