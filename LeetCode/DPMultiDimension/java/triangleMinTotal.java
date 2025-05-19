package LeetCode.DPMultiDimension.Java;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

record InputRecord(List<List<Integer>> triangle) {

    @Override
    public String toString() {
        return "Triangle: " + triangle.toString();
    }
}

public class triangleMinTotal {
    public int minimumTotal(List<List<Integer>> triangle) {
        Integer[] dp = new Integer[triangle.size() + 1];
        Arrays.fill(dp, 0);

        // System.out.println(Arrays.toString(dp));

        List<List<Integer>> inputRows = triangle.stream().collect(Collectors.toList());
        Collections.reverse(inputRows);

        // System.out.println(inputRows.toString());

        for (List<Integer> row : inputRows) {
            // System.out.println(row.toString());
            for (int i = 0; i < row.size(); i += 1) {
                // System.out.println(i + " " + row.get(i));
                dp[i] = row.get(i) + Math.min(dp[i], dp[i + 1]);
            }
        }

        return dp[0];
    }

    public static void main(String[] args) {
        triangleMinTotal soln = new triangleMinTotal();

        InputRecord input1 = new InputRecord(List.of(List.of(2), List.of(3, 4), List.of(6, 5, 7), List.of(4, 1, 8, 3)));
        int expected1 = 11;
        int result1 = soln.minimumTotal(input1.triangle());

        System.out.println("Input: " + input1.toString());
        System.out.println("Result: " + result1);
        System.out.println("Expected: " + expected1);
        System.out.println("-".repeat(50));

        InputRecord input2 = new InputRecord(List.of(List.of(-10)));
        int expected2 = -10;
        int result2 = soln.minimumTotal(input2.triangle());

        System.out.println("Input: " + input2.toString());
        System.out.println("Result: " + result2);
        System.out.println("Expected: " + expected2);
        System.out.println("-".repeat(50));

        InputRecord input3 = new InputRecord(List.of(List.of(-1), List.of(2, 3), List.of(1, -1, -1)));
        int expected3 = 0;
        int result3 = soln.minimumTotal(input3.triangle());

        System.out.println("Input: " + input3.toString());
        System.out.println("Result: " + result3);
        System.out.println("Expected: " + expected3);
        System.out.println("-".repeat(50));

    }
}
