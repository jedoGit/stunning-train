package LeetCode.DPMultiDimension.java;

import java.util.ArrayList;
import java.util.List;

class uniquePaths {
    public int solveUniquePaths(int m, int n) {
        // List initialize with zeros
        List<List<Integer>> dp = new ArrayList<>(m * n);

        for (int i = 0; i < m; i++) {
            dp.add(new ArrayList<>());
            for (int j = 0; j < n; j++) {
                dp.get(i).add(0);
            }
        }

        // init the rightmost col and bottom row with 1
        for (int i = 0; i < m; i++) {
            dp.get(i).set(n - 1, 1);
        }
        for (int i = 0; i < n; i++) {
            dp.get(m - 1).set(i, 1);
        }

        for (int i = m - 2; i > -1; i--) {
            for (int j = n - 2; j > -1; j--) {
                dp.get(i).set(j, dp.get(i + 1).get(j) + dp.get(i).get(j + 1));
            }
        }

        // for ( List<Integer> ar : dp ) {
        // System.out.println(ar);
        // }

        return dp.get(0).get(0);

    }

    public static void main(String[] args) {
        System.out.println("Unique Paths");
    }
}