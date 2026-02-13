package LeetCode.Backtracking.java.restoreIPAddress;

import java.util.ArrayList;
import java.util.List;

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

record ipAddressRecord(String s, List<String> expected) {
}

class restoreIPAddress {
    private List<String> res = new ArrayList<>();

    public List<String> restoreIpAddresses(String s) {
        // If the size of s has more than 12 digits, it means it's not possible to
        // create a valid ip address.
        if (s.length() > 12) {
            return this.res;
        }

        this.backtrack(0, 0, "", s);

        return this.res;

    }

    private void backtrack(int i, int numDots, String curIp, String s) {
        int sLen = s.length();

        if (numDots == 4 && i == sLen) {
            // Let's push the string curIpAddr to our results array. Exclude the last dot
            // added
            this.res.add(curIp.substring(0, curIp.length() - 1));
            return;
        }

        if (numDots > 4) {
            return;
        }

        // We start from the index passed to the function. The check for the next 3
        // digit. In the case that we have less than 3 digits left, we stop at the end
        // of array.
        for (int j = i; j < Math.min(i + 3, sLen); j++) {
            // Here we only consider the chars in s one at a time. Check it if the integer
            // value is between 0 to 255.
            // Also, check if the leading digit should not be 0.
            if (Integer.valueOf(s.substring(i, j + 1)) < 256 && (i == j || s.charAt(i) != '0')) {
                // We recurse and pass the next index, increment the numDots, append the new
                // slice of Ip digit we added and don't forget to add the dot.
                this.backtrack(j + 1, numDots + 1, curIp + s.substring(i, j + 1) + ".", s);
            }
        }
    }

    public static void main(String[] args) {
        ipAddressRecord[] records = new ipAddressRecord[] {
                new ipAddressRecord("25525511135", List.of("255.255.11.135", "255.255.111.35")),
                new ipAddressRecord("0000", List.of("0.0.0.0")),
                new ipAddressRecord("101023", List.of("1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3")),
        };

        int i = 1;
        for (ipAddressRecord record : records) {
            System.out.println("# Test case " + i++);
            restoreIPAddress.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(ipAddressRecord record) {
        System.out.println("input: s: " + record.s());
        System.out.println("expected: " + record.expected());

        List<String> res = new restoreIPAddress().restoreIpAddresses(record.s());

        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
