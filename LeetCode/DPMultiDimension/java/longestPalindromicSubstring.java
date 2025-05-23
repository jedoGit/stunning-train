package LeetCode.DPMultiDimension.java;

import java.util.stream.IntStream;

public class longestPalindromicSubstring {
    public String longestPalindrome(String s) {
        int n = s.length();
        int maxLen = 0;
        int ansLeft = 0;

        if (n == 0) {
            return "";
        }

        int[][] dp = new int[n][n];

        for (int i : IntStream.range(0, n).map(i -> n - 1 - i).toArray()) {
            // System.out.println(i);
            for (int j : IntStream.range(i, n).toArray()) {
                // System.out.println(j);
                if (i == j) {
                    dp[i][j] = 1;
                } else {
                    if (j == i + 1) {
                        dp[i][j] = (s.charAt(i) == s.charAt(j) ? 1 : 0);
                    } else {
                        dp[i][j] = (s.charAt(i) == s.charAt(j) ? 1 : 0) & dp[i + 1][j - 1];
                    }
                }

                if (dp[i][j] == 1 && (j - i + 1) > maxLen) {
                    maxLen = j - i + 1;
                    ansLeft = i;
                }
            }
            // System.out.println("----------------");
        }

        // for (int i = 0; i < n; i++) {
        // for (int j = 0; j < n; j++) {
        // System.out.print(dp[i][j]);
        // }
        // System.out.println();
        // }

        return s.substring(ansLeft, ansLeft + maxLen);
    }

    public static void main(String[] args) {
        longestPalindromicSubstring soln = new longestPalindromicSubstring();

        String input1 = "babad";
        String expected1 = "aba";
        String result1 = soln.longestPalindrome(input1);
        System.out.println("Input: " + input1);
        System.out.println("Expected: " + expected1);
        System.out.println("Result: " + result1);
        System.out.println("-".repeat(50));

        String input2 = "cbbd";
        String expected2 = "bb";
        String result2 = soln.longestPalindrome(input2);
        System.out.println("Input: " + input2);
        System.out.println("Expected: " + expected2);
        System.out.println("Result: " + result2);
        System.out.println("-".repeat(50));
    }
}
