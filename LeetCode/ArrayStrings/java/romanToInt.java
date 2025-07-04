package LeetCode.ArrayStrings.java;

enum romanToIntEnum {

    I(1),
    V(5),
    X(10),
    L(50),
    C(100),
    D(500),
    M(1000);

    private final int value;

    romanToIntEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}

record romanToIntRecord(String s, int expected) {
}

public class romanToInt {
    public int romanToIntSoln(String s) {
        int res = 0;

        for (int i = 0; i < s.length(); i += 1) {
            // i is less than s.length - 1, perform res -=
            // else perform res +=
            String s1 = String.valueOf(s.charAt(i));
            String s2 = i < s.length() - 1 ? String.valueOf(s.charAt(i + 1)) : "";

            if (!s2.equals("") &&
                    romanToIntEnum.valueOf(s1).getValue() < romanToIntEnum.valueOf(s2).getValue()) {

                res -= romanToIntEnum.valueOf(s1).getValue();
            } else {
                res += romanToIntEnum.valueOf(s1).getValue();
            }
        }

        return res;
    }

    public static void main(String[] args) {
        romanToIntRecord input = new romanToIntRecord("III", 3);
        romanToInt.testSolution(input);

        input = new romanToIntRecord("LVIII", 58);
        romanToInt.testSolution(input);

        input = new romanToIntRecord("MCMXCIV", 1994);
        romanToInt.testSolution(input);
    }

    private static void testSolution(romanToIntRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Expected " + input.expected());
        System.out.println("Result: " + new romanToInt().romanToIntSoln(input.s()));
        System.out.println("-".repeat(50));
    }
}
