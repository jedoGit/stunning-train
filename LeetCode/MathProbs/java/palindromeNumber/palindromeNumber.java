package LeetCode.MathProbs.java.palindromeNumber;

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

record palindromeNumberRecord(int x, boolean expected) {
}

class palindromeNumber {
    public boolean isPalindrome1(int x) {
        if (x < 0) {
            return false;
        }

        String xString = String.valueOf(x);

        int l = 0;
        int r = xString.length() - 1;

        while (l < r) {
            if (xString.charAt(l) != xString.charAt(r)) {
                return false;
            }

            l++;
            r--;
        }

        return true;
    }

    public boolean isPalindrome2(int x) {
        if (x < 0) {
            return false;
        }

        int rev = 0;
        int xcopy = x;

        while (x > 0) {
            rev = (rev * 10) + (x % 10);
            x = x / 10;
        }
        return xcopy == rev;
    }

    public static void main(String[] args) {
        palindromeNumberRecord[] records = new palindromeNumberRecord[] {
                new palindromeNumberRecord(121, true),
                new palindromeNumberRecord(-121, false),
                new palindromeNumberRecord(10, false)
        };

        int i = 1;
        for (palindromeNumberRecord record : records) {
            System.out.println("# Test case " + i++);
            palindromeNumber.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(palindromeNumberRecord record) {
        System.out.println("input: " + record.x());
        System.out.println("expected: " + record.expected());

        boolean res = new palindromeNumber().isPalindrome2(record.x());
        System.out.println("result: " + res);

        System.out.println(record.expected() == res ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
