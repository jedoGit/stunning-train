package LeetCode.DP1D.java;

import java.util.Arrays;
import java.util.List;

record InputVals(String s, List<String> wordDict) {
}

public class wordBreak {
    public boolean solveWordBreak(String s, List<String> wordDict) {
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

    public static void main(String[] args) {

        InputVals input = new InputVals("leetcode", List.of("leet", "code"));
        Boolean expected = Boolean.valueOf(true);
        Boolean result = new wordBreak().solveWordBreak(input.s(), input.wordDict());

        System.out.println("Input: " + input.toString());
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);

        System.out.println("-".repeat(50));

        input = new InputVals("applepenapple", List.of("apple", "pen"));
        expected = Boolean.valueOf(true);
        result = new wordBreak().solveWordBreak(input.s(), input.wordDict());

        System.out.println("Input: " + input.toString());
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);

        System.out.println("-".repeat(50));

        input = new InputVals("catsandog", List.of("cats", "dog", "sand", "and", "cat"));
        expected = Boolean.valueOf(false);
        result = new wordBreak().solveWordBreak(input.s(), input.wordDict());

        System.out.println("Input: " + input.toString());
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);

    }
}