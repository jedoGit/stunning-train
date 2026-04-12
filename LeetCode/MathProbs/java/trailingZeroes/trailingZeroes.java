package LeetCode.MathProbs.java.trailingZeroes;

// Trailing zeros in a factorial come from multiplying pairs of 2 and 5. 
// Since factors of 2 are more frequent,we only need to count 
// the number of 5 s in the prime factorization of n!.

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

record trailingZeroesRecord(int n, int expected) {

}

class trailingZeroes {
    public int trailingZeroesSolution(int n) {
        int count = 0;

        while (n > 0) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }

    public static void main(String[] args) {
        trailingZeroesRecord[] records = new trailingZeroesRecord[] {
                new trailingZeroesRecord(3, 0),
                new trailingZeroesRecord(5, 1),
                new trailingZeroesRecord(0, 0)
        };

        int i = 1;

        for (trailingZeroesRecord record : records) {
            System.out.println("# Test case: " + i++);
            trailingZeroes.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(trailingZeroesRecord record) {
        System.out.println("input: n: " + record.n());
        System.out.println("expected: " + record.expected());

        int res = new trailingZeroes().trailingZeroesSolution(record.n());

        System.out.println("result: " + res);

        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
