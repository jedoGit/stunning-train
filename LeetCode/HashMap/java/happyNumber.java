package LeetCode.HashMap.java;

import java.util.HashSet;
import java.util.Set;

record happyNumberRecord(int n, boolean expected) {

}

public class happyNumber {
    public boolean isHappy(int n) {
        Set<Integer> visited = new HashSet<>();
        int n_ = n;

        while (!visited.contains(n_)) {
            visited.add(n_);

            n_ = computeN(n_);

            if (n_ == 1) {
                return true;
            }
        }

        return false;
    }

    private int computeN(int n) {
        double res = 0;

        while (n > 0) {
            int temp = n % 10;
            res += Math.pow(temp, 2);
            n = (n / 10);
        }

        return (int) res;
    }

    public static void main(String[] args) {
        happyNumberRecord input = new happyNumberRecord(19, true);
        happyNumber.testSOlution(input);

        input = new happyNumberRecord(2, false);
        happyNumber.testSOlution(input);
    }

    private static void testSOlution(happyNumberRecord input) {
        System.out.println("Input: n: " + input.n());
        System.out.println("Expected: " + input.expected());
        boolean res = new happyNumber().isHappy(input.n());
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
