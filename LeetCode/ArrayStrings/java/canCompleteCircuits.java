package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record canCompleteCircuitsRecord(int[] gas, int[] cost, int expected) {
}

class canCompleteCircuits {
    public int canCompleteCircuitSolution(int[] gas, int[] cost) {
        // Get the sum of the elements and compare if gasSum if less than costSum. If
        // so, return -1

        int gasSum = Arrays.stream(gas).sum();
        int costSum = Arrays.stream(cost).sum();

        if (gasSum < costSum) {
            return -1;
        }

        int total = 0;
        int res = 0;

        // Loop through gas and cost and compute the difference and add to total
        // Do this until total becomes positive
        for (int i = 0; i < gas.length; i++) {
            total += (gas[i] - cost[i]);

            // If total is negative, reset total to zero and update the result variable
            if (total < 0) {
                total = 0;
                res = i + 1;
            }
        }

        return res;
    }

    public static void main(String[] args) {
        canCompleteCircuitsRecord input = new canCompleteCircuitsRecord(
                new int[] { 1, 2, 3, 4, 5 },
                new int[] { 3, 4, 5, 1, 2 },
                3);

        canCompleteCircuits.testSolution(input);

        input = new canCompleteCircuitsRecord(
                new int[] { 2, 3, 4 },
                new int[] { 3, 4, 3 },
                -1);
        canCompleteCircuits.testSolution(input);
    }

    private static void testSolution(canCompleteCircuitsRecord input) {
        System.err.println("Input: gas " + Arrays.toString(input.gas())
                + "\n\tcost: " + Arrays.toString(input.cost()));

        System.out.println("Expected: " + input.expected());
        System.out
                .println("Result: " + new canCompleteCircuits().canCompleteCircuitSolution(input.gas(), input.cost()));
        System.out.println("-".repeat(50));
    }
}