package LeetCode.BitManipulation.java.reverseBits;

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

record reverseBitsRecord(int n, int expected) {
}

class reverseBits {

    public int reverseBitsSolution(int n) {
        int mask = 1;
        int ans = 0;
        for (int i = 1; i <= 32; i++) {
            if ((mask & n) != 0) {
                ans |= 1 << 32 - i;
            }
            mask <<= 1;
        }
        return ans;

        // int res = 0;
        // for (int i = 0; i < 32; i++) {
        // int bit = (n >> i) & 1;
        // res = res | (bit << (31 - i));
        // }

        // return res >>> 0;
    }

    public static void main(String[] args) {
        reverseBitsRecord[] records = new reverseBitsRecord[] {
                new reverseBitsRecord(43261596, 964176192),
                new reverseBitsRecord(2147483644, 1073741822)
        };

        int i = 1;
        for (reverseBitsRecord record : records) {
            System.out.println("# Test case " + i++);
            reverseBits.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(reverseBitsRecord record) {
        System.out.println("input: n: " + record.n());
        System.out.println("expected: " + record.expected());

        int res = new reverseBits().reverseBitsSolution(record.n());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }

}
