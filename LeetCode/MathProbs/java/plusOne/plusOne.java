package LeetCode.MathProbs.java.plusOne;

import java.util.Arrays;

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}

record plusOneRecord(int[] digits, int[] expected) {
}

class plusOne {
    public int[] plusOneSolution(int[] digits) {
        for (int i = digits.length - 1; i > -1; i--) {
            if (digits[i] != 9) {
                digits[i] += 1;
                return digits;
            }

            // at this point, we know that current digit is 9 and 9 + 1 = 10,
            // so we need to add 1 to the digit to the left
            digits[i] = 0;
        }

        // We exited the for loop, this means that all digits were 9s and since we add 1
        // to the Most Significant Digit, this means we need to add 1 as the new Least
        // Significant Digit
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }

    public static void main(String[] args) {

        plusOneRecord[] records = new plusOneRecord[] {
                new plusOneRecord(new int[] { 1, 2, 3 }, new int[] { 1, 2, 4 }),
                new plusOneRecord(new int[] { 4, 3, 2, 1 }, new int[] { 4, 3, 2, 2 }),
                new plusOneRecord(new int[] { 9 }, new int[] { 1, 0 })
        };

        int i = 1;
        for (plusOneRecord record : records) {
            System.out.println("# Test case " + (i + 1));
            plusOne.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(plusOneRecord record) {
        System.out.println("input: digits: " + Arrays.toString(record.digits()));
        System.out.println("expected: " + Arrays.toString(record.expected()));

        int[] res = new plusOne().plusOneSolution(record.digits());

        System.out.println("result: " + Arrays.toString(res));
        System.out.println(plusOne.validateResult(res, record.expected()) == true ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }

    private static boolean validateResult(int[] res, int[] expected) {

        // This is similar to Arrays.equals(res, expected)

        // if (res.length != expected.length) {
        // return false;
        // }

        // for (int i = 0; i < expected.length; i++) {
        // if (res[i] != expected[i]) {
        // return false;
        // }
        // }

        // return true;
        return Arrays.equals(res, expected);
    }
}
