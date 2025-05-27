package LeetCode.DPMultiDimension.java;

import java.util.Arrays;

final record MinDistanceDTO(String word1, String word2) {

}

public class editDistance {

    public int minDistance(String word1, String word2) {
        int n = word1.length();
        int m = word2.length();

        int[][] dp = new int[n + 1][m + 1];
        for (int i = 0; i < dp.length; i += 1) {
            Arrays.fill(dp[i], Integer.MAX_VALUE);
        }

        // Fill the right most column and bottom row with our base cases
        // If W1 is empty and W2 is not, it will take W2.length of operations to convert
        // W1 to W2
        // If W1 is not empty and W2 is empty, it will take W1.length of operations to
        // convert W1 to W2
        // Fill the rightmost column
        for (int i = 0; i < n + 1; i += 1) {
            dp[i][m] = n - i;
        }

        // Fill the bottom row
        for (int j = 0; j < m + 1; j += 1) {
            dp[n][j] = m - j;
        }

        // If W1 == W2, there's no operation, just take the value from the lower
        // diagonal [i+1][j+1]
        // If W1 != W2, first, we'll find the min from the 3 operations and add 1:
        // Delete: [i+1][j], a delete is equivalent to moving the i pointer of W1 in
        // terms of operations required
        // Insert: [i][j+1], an insert is equivalent to moving the j pointer of W2 in
        // terms of operations required
        // Replace: [i+1][j+1], a replace is equivalent to doing a delete and insert

        // We'll do bottoms up approach of 2D DP.
        for (int i = n - 1; i > -1; i -= 1) {
            for (int j = m - 1; j > -1; j -= 1) {
                if (word1.charAt(i) == word2.charAt(j)) {
                    dp[i][j] = dp[i + 1][j + 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i + 1][j], Math.min(dp[i][j + 1], dp[i + 1][j + 1]));
                }
            }
        }

        return dp[0][0];
    }

    public static void main(String[] args) {
        editDistance soln = new editDistance();

        MinDistanceDTO input1 = new MinDistanceDTO("horse", "ros");
        int expected1 = 3;
        int result1 = soln.minDistance(input1.word1(), input1.word2());
        System.out.println("Input: word1: " + input1.word1() + ", word2: " + input1.word2());
        System.out.println("Expected: " + expected1);
        System.out.println("Result: " + result1);
        System.out.println("-".repeat(50));

        MinDistanceDTO input2 = new MinDistanceDTO("intention", "execution");
        int expected2 = 5;
        int result2 = soln.minDistance(input2.word1(), input2.word2());
        System.out.println("Input: word1: " + input2.word1() + ", word2: " + input2.word2());
        System.out.println("Expected: " + expected2);
        System.out.println("Result: " + result2);
        System.out.println("-".repeat(50));

    }
}
