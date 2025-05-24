package LeetCode.DPMultiDimension.java;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

record interleavingStringsDTO(String s1, String s2, String s3) {

}

public class interleavingStrings {
    private record Pair<T,U>(T i, U j) {
    }

    public boolean isInterleave(String s1, String s2, String s3) {

        int s1_len = s1.length();
        int s2_len = s2.length();
        int s3_len = s3.length();

        if (s1_len + s2_len != s3_len) {
            return false;
        }

        boolean[][] dp = new boolean[s1_len + 1][s2_len + 1];

        for (int row = 0; row < s1_len + 1; row += 1) {
            Arrays.fill(dp[row], false);
        }

        dp[s1_len][s2_len] = true;

        // for (int i = 0; i < s1_len + 1; i += 1) {
        // for (int j = 0; j < s2_len + 1; j += 1) {
        // System.out.print(dp[i][j] + ",");
        // }
        // System.out.println();
        // }

        // System.out.println("-".repeat(50));

        for (int i = s1_len; i > -1; i -= 1) {
            for (int j = s2_len; j > -1; j -= 1) {
                // System.out.print(dp[i][j] + ",");
                if (i < s1_len && s1.charAt(i) == s3.charAt(i + j) && dp[i + 1][j]) {
                    dp[i][j] = true;
                }
                if (j < s2_len && s2.charAt(j) == s3.charAt(i + j) && dp[i][j + 1]) {
                    dp[i][j] = true;
                }
            }
            // System.out.println();
        }

        return dp[0][0];
    }

    public boolean isInterleaveMemoize(String s1, String s2, String s3) {
        int s1_len = s1.length();
        int s2_len = s2.length();
        int s3_len = s3.length();

        if (s1_len + s2_len != s3_len) {
            return false;
        }

        Map<Pair<Integer, Integer>, Boolean> dp = new HashMap<>();

        // System.out.println("dp: " + dp.toString());

        return dfs(0, 0, s1_len, s2_len, s3_len, dp, s1, s2, s3);
    }

    private boolean dfs(int i, int j, int s1_len, int s2_len, int s3_len, Map<Pair<Integer, Integer>, Boolean> dp, String s1, String s2,
            String s3) {
        if (i == s1_len & j == s2_len) {
            return true;
        }

        Pair<Integer, Integer> key_ij = new Pair<>(i, j);
        if (dp.containsKey(key_ij)) {
            return dp.get(key_ij);
        }

        if (i < s1_len && s1.charAt(i) == s3.charAt(i + j) && dfs(i + 1, j, s1_len, s2_len, s3_len, dp, s1, s2, s3)) {
            return true;
        }

        if (j < s2_len && s2.charAt(j) == s3.charAt(i + j) && dfs(i, j + 1, s1_len, s2_len, s3_len, dp, s1, s2, s3)) {
            return true;
        }

        dp.put(new Pair<>(i, j), false);

        return false;
    }

    public static void main(String[] args) {

        interleavingStrings soln = new interleavingStrings();

        interleavingStringsDTO input1 = new interleavingStringsDTO("aabcc", "dbbca", "aadbbcbcac");
        boolean expected1 = true;
        boolean result1 = soln.isInterleaveMemoize(input1.s1(), input1.s2(), input1.s3());
        System.out.println("Input: " + input1);
        System.out.println("Result: " + result1);
        System.out.println("Expected: " + expected1);
        System.out.println("-".repeat(50));

        interleavingStringsDTO input2 = new interleavingStringsDTO("aabcc", "dbbca", "aadbbbaccc");
        boolean expected2 = false;
        boolean result2 = soln.isInterleaveMemoize(input2.s1(), input2.s2(), input2.s3());
        System.out.println("Input: " + input2);
        System.out.println("Result: " + result2);
        System.out.println("Expected: " + expected2);
        System.out.println("-".repeat(50));

        interleavingStringsDTO input3 = new interleavingStringsDTO("", "", "");
        boolean expected3 = true;
        boolean result3 = soln.isInterleaveMemoize(input3.s1(), input3.s2(), input3.s3());
        System.out.println("Input: " + input3);
        System.out.println("Result: " + result3);
        System.out.println("Expected: " + expected3);
        System.out.println("-".repeat(50));

        interleavingStringsDTO input4 = new interleavingStringsDTO("a", "", "a");
        boolean expected4 = true;
        boolean result4 = soln.isInterleaveMemoize(input4.s1(), input4.s2(), input4.s3());
        System.out.println("Input: " + input4);
        System.out.println("Result: " + result4);
        System.out.println("Expected: " + expected4);
        System.out.println("-".repeat(50));

        interleavingStringsDTO input5 = new interleavingStringsDTO(
                "bbbbbabbbbabaababaaaabbababbaaabbabbaaabaaaaababbbababbbbbabbbbababbabaabababbbaabababababbbaaababaa",
                "babaaaabbababbbabbbbaabaabbaabbbbaabaaabaababaaaabaaabbaaabaaaabaabaabbbbbbbbbbbabaaabbababbabbabaab",
                "babbbabbbaaabbababbbbababaabbabaabaaabbbbabbbaaabbbaaaaabbbbaabbaaabababbaaaaaabababbababaababbababbbababbbbaaaabaabbabbaaaaabbabbaaaabbbaabaaabaababaababbaaabbbbbabbbbaabbabaabbbbabaaabbababbabbabbab");
        boolean expected5 = false;
        boolean result5 = soln.isInterleaveMemoize(input5.s1(), input5.s2(), input5.s3());
        System.out.println("Input: " + input5);
        System.out.println("Result: " + result5);
        System.out.println("Expected: " + expected5);
        System.out.println("-".repeat(50));

    }
}
