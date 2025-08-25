package LeetCode.HashMap.java;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

record longestConsecutiveSequenceRecord(int[] nums, int expected) {
}

public class longestConsecutiveSequence {
    public int longestConsecutive(int[] nums) {
        int select = 2;
        if (select == 1) {
            System.out.println("longestConsecutive1()");
            return longestConsecutive1(nums);
        } else {
            System.out.println("longestConsecutive2()");
            return longestConsecutive2(nums);
        }
    }

    public int longestConsecutive1(int[] nums) {
        int longest = 0;
        Set<Integer> numSet = new HashSet<>(Arrays.stream(nums).boxed().toList());

        for (int n : numSet) {
            if (!numSet.contains(n - 1)) {
                int length = 0;
                while (numSet.contains(n + length)) {
                    length++;
                }
                longest = Math.max(length, longest);
            }
        }
        return longest;
    }

    private int longestConsecutive2(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }

        int longest = 0;
        Set<Integer> numSet = new HashSet<>(Arrays.stream(nums).boxed().toList());

        for (int n : numSet) {
            if (numSet.contains(n - 1)) {
                continue;
            }

            int curNum = n;
            int curMax = 1;

            while (numSet.contains(curNum + 1)) {
                curNum++;
                curMax++;
            }

            longest = Math.max(longest, curMax);
        }
        return longest;
    }

    public static void main(String[] args) {
        longestConsecutiveSequenceRecord input = new longestConsecutiveSequenceRecord(
                new int[] { 100, 4, 200, 1, 3, 2 }, 4);
        longestConsecutiveSequence.testSolution(input);

        input = new longestConsecutiveSequenceRecord(new int[] { 0, 3, 7, 2, 5, 8, 4, 6, 0, 1 }, 9);
        longestConsecutiveSequence.testSolution(input);

        input = new longestConsecutiveSequenceRecord(new int[] { 1, 0, 1, 2 }, 3);
        longestConsecutiveSequence.testSolution(input);
    }

    private static void testSolution(longestConsecutiveSequenceRecord input) {
        System.out.println("Input: n: " + Arrays.toString(input.nums()));
        System.out.println("Expected: " + input.expected());
        int res = new longestConsecutiveSequence().longestConsecutive(input.nums());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
