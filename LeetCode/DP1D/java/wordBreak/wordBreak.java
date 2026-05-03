package LeetCode.DP1D.java.wordBreak;

import java.util.Arrays;
import java.util.List;

record WordBreakRecord(String s, List<String> wordDict, boolean expected) {
}

enum Result {
    PASS("\u001B[92mPASS\u001B[00m"),
    FAIL("\u001B[91mFAIL\u001B[00m");

    private final String label;

    Result(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}

public class wordBreak {
    public static class Solution {
        public boolean wordBreak(String s, List<String> wordDict) {
            int len_s = s.length();
            Boolean[] dp = new Boolean[len_s + 1];
            Arrays.fill(dp, false);

            dp[len_s] = true;

            for (int i = len_s - 1; i > -1; i--) {
                for (String w : wordDict) {
                    if ((i + w.length()) <= len_s && (s.substring(i, i + w.length())).equals(w)) {
                        dp[i] = dp[i + w.length()];
                    }
                    if (dp[i] == true) {
                        break;
                    }
                }
            }

            return dp[0];
        }
    }

    public static void main(String[] args) {
        WordBreakRecord[] records = new WordBreakRecord[] {
                new WordBreakRecord("leetcode", Arrays.asList("leet", "code"), true),
                new WordBreakRecord("applepenapple", Arrays.asList("apple", "pen"), true),
                new WordBreakRecord("catsandog", Arrays.asList("cats", "dog", "sand", "and", "cat"), false),
        };

        for (int i = 0; i < records.length; i++) {
            testSolution(records[i], i + 1);
        }
    }

    private static void testSolution(WordBreakRecord record, int caseNumber) {
        System.out.println("# Test case " + caseNumber);
        System.out.println("Input s: " + record.s());
        System.out.println("Word Dict: " + record.wordDict());
        System.out.println("Expected: " + record.expected());

        boolean result = new Solution().wordBreak(record.s(), record.wordDict());
        System.out.println("Result: " + result);
        System.out.println(result == record.expected() ? Result.PASS.label() : Result.FAIL.label());

        System.out.println("-".repeat(50));
    }
}
