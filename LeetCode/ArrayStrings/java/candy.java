package LeetCode.ArrayStrings.java;

import java.util.Arrays;

record candySolutionRecord(int[] ratings, int expected) {
}

public class candy {
    public int candySolution(int[] ratings) {
        // We need to set an candies array to capture how many candies were given per
        // student and initialize with 1
        // index 0,1,2,3,4,5
        // candies = [1,1,1,1,1,1]
        int n = ratings.length;
        int[] candies = new int[n];
        Arrays.fill(candies, 1);

        // For the first pass, we need to loop from left to right and compare if the
        // left rating is less than the current rating
        // If so, the value of the current candy is the left candy plus 1
        for (int i = 1; i < n; i += 1) {
            if (ratings[i - 1] < ratings[i]) {
                candies[i] = candies[i - 1] + 1;
            }
        }

        // The second pass, we need to loop from right to left and compare if the right
        // rating is less than the current rating
        // If so, we take the max of the current candy and the right candy plus 1 and
        // assign to the current candy.
        for (int i = n - 2; i > -1; i -= 1) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }

        // Finally we need to sum all values of the candies candiesay and return it
        int retVal = Arrays.stream(candies).sum();

        return retVal;
    }

    public static void main(String[] args) {
        candySolutionRecord input = new candySolutionRecord(new int[] { 1, 0, 2 }, 5);
        candy.testSolution(input);
        input = new candySolutionRecord(new int[] { 1, 2, 2 }, 4);
        candy.testSolution(input);
    }

    private static void testSolution(candySolutionRecord input) {
        System.out.println("Input: " + Arrays.toString(input.ratings()));
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + new candy().candySolution(input.ratings()));
        System.out.println("-".repeat(50));
    }
}
