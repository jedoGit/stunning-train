package LeetCode.TwoPointers.java;

record validPalindromeRecord(String s, boolean expected) {
}

public class validPalindrome {
    public boolean isPalindrome(String s) {
        int l = 0;
        int r = s.length() - 1;

        while (l < r) {
            // move the l pointer until it points to a letter or digit
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) {
                l += 1;
            }

            // move the r pointer until it points to a letter or digit
            while (r > l && !Character.isLetterOrDigit(s.charAt(r))) {
                r -= 1;
            }

            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) {
                return false;
            }

            l += 1;
            r -= 1;
        }

        return true;
    }

    public static void main(String[] args) {
        validPalindromeRecord input = new validPalindromeRecord("A man, a plan, a canal: Panama", true);
        validPalindrome.testSolution(input);

        input = new validPalindromeRecord("race a car", false);
        validPalindrome.testSolution(input);

        input = new validPalindromeRecord(" ", true);
        validPalindrome.testSolution(input);
    }

    private static void testSolution(validPalindromeRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Expected: " + input.expected());
        boolean val = new validPalindrome().isPalindrome(input.s());
        System.out.println("Result: " + val + ", " + (val == input.expected() ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
