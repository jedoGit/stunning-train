package LeetCode.BitManipulation.java.addBinary;

import java.math.BigInteger;

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

record addBinaryRecord(String a, String b, String expected) {
}

class addBinary {

    public String addBinaryString1(String a, String b) {

        BigInteger num1 = new BigInteger(a, 2);
        BigInteger num2 = new BigInteger(b, 2);

        BigInteger sum = num1.add(num2);

        return sum.toString(2);
    }

    public String addBinaryString2(String a, String b) {
        int i = a.length() - 1;
        int j = b.length() - 1;
        int carry = 0;

        StringBuilder res = new StringBuilder();

        while (i > -1 || j > -1 || carry == 1) {
            int sum = carry;

            if (i > -1) {
                sum += a.charAt(i) - '0';
            }

            if (j > -1) {
                sum += b.charAt(j) - '0';
            }

            i--;
            j--;

            res.append(sum % 2);
            carry = sum / 2;
        }

        return res.reverse().toString();
    }

    public static void main(String[] args) {

        addBinaryRecord[] records = new addBinaryRecord[] {
                new addBinaryRecord("11", "1", "100"),
                new addBinaryRecord("1010", "1011", "10101"),
                new addBinaryRecord(
                        "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
                        "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011",
                        "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000")
        };

        int i = 1;
        for (addBinaryRecord record : records) {
            System.out.println("# Test case " + i++);
            addBinary.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(addBinaryRecord record) {
        System.out.println("input:\ta: " + record.a());
        System.out.println("\tb: " + record.b());
        System.out.println("expected: " + record.expected());

        String res = new addBinary().addBinaryString2(record.a(), record.b());
        System.out.println("result: " + res);

        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
