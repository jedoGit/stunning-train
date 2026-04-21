package LeetCode.MathProbs.java.powerXn;

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

record powerXnRecord(double x, int n, double expected) {
}

class powerXn {
    public double myPow(double x, int n) {
        if (n < 0) {
            n = -n;
            x = 1 / x;
        }

        double pow = 1;

        while (n != 0) {
            if ((n & 1) != 0) {
                pow *= x;
            }
            x *= x;
            n >>>= 1; // Unsigned rightshift
        }

        return pow;
    }

    public static void main(String[] args) {
        powerXnRecord[] records = new powerXnRecord[] {
                new powerXnRecord(2.00000, 10, 1024.00000),
                new powerXnRecord(2.10000, 3, 9.26100),
                new powerXnRecord(2.000000, -2, 0.25000)
        };

        int i = 1;
        for (powerXnRecord record : records) {
            System.out.println("# Test case " + i++);
            powerXn.testResult(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testResult(powerXnRecord record) {
        String formattedX = String.format("%.5f", record.x());
        System.out.println("input:\tx: " + formattedX);

        System.out.println("\tn: " + record.n());
        String formattedExpected = String.format("%.5f", record.expected());
        System.out.println("expected: " + formattedExpected);

        double res = new powerXn().myPow(record.x(), record.n());
        String formattedRes = String.format("%.5f", res);

        System.out.println("result: " + formattedRes);

        System.out.println(
                formattedRes.equals(formattedExpected) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
