package LeetCode.TwoPointers.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

record twoSum2Record(int[] numbers, int target, int[] expected) {
}

public class twoSum2 {
    public int[] twoSum(int[] numbers, int target) {
        int l = 0;
        int r = numbers.length - 1;
        // List<Integer> res = new ArrayList<>();
        int[] res = new int[2];

        while (l < r) {
            int sum = numbers[l] + numbers[r];

            if (sum > target) {
                r -= 1;
            } else if (sum < target) {
                l += 1;
            } else {
                // res.add(l + 1);
                // res.add(r + 1);
                res[0] = l + 1;
                res[1] = r + 1;
                break;
            }
        }

        // return res.stream().mapToInt(i -> i.intValue()).toArray();
        return res;
    }

    public static void main(String[] args) {
        twoSum2Record input = new twoSum2Record(
                new int[] { 2, 7, 11, 15 },
                9,
                new int[] { 1, 2 });
        twoSum2.testSolution(input);

        input = new twoSum2Record(
                new int[] { 2, 3, 4 },
                6,
                new int[] { 1, 3 });
        twoSum2.testSolution(input);

        input = new twoSum2Record(
                new int[] { -1, 0 },
                -1,
                new int[] { 1, 2 });
        twoSum2.testSolution(input);
    }

    public static void testSolution(twoSum2Record input) {
        System.out.println("Input: numbers: " + Arrays.toString(input.numbers()));
        System.out.println("Input: target: " + input.target());
        System.out.println("Expected: " + Arrays.toString(input.expected()));
        int[] val = new twoSum2().twoSum(input.numbers(), input.target());
        System.out.println("Result: " + Arrays.toString(val) + ", "
                + (Arrays.equals(input.expected(), val) ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
