package LeetCode.ArrayStrings.java;

enum IntToRomanEnum {

    // ["I",1],["IV",4],["V",5],["IX",9],["X",10],["XL",40],["L",50],["XC",90],["C",100],["CD",400],["D",500],["CM",900],["M",1000],
    I(1),
    IV(4),
    V(5),
    IX(9),
    X(10),
    XL(40),
    L(50),
    XC(90),
    C(100),
    CD(400),
    D(500),
    CM(900),
    M(1000);

    private final int value;

    IntToRomanEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}

record intToRomanRecord(int num, String expected) {
}

public class intToRoman {
    public String intToRomanSolution(int num) {
        StringBuilder res = new StringBuilder("");

        IntToRomanEnum[] enumVals = IntToRomanEnum.values();
        // System.out.println(Arrays.toString(enumVals));

        for (int i = enumVals.length - 1; i > -1; i -= 1) {

            IntToRomanEnum enumEntry = enumVals[i];
            // System.out.println(enumEntry);

            final String sym = enumEntry.name();
            final int val = enumEntry.getValue();

            if (num / val > 0) {
                int count = (int) (num / val);
                res.append(sym.repeat(count));
                num = num % val;
            }

        }

        return res.toString();
    }

    public static void main(String[] args) {
        intToRomanRecord input = new intToRomanRecord(3749, "MMMDCCXLIX");
        intToRoman.testSolution(input);

        input = new intToRomanRecord(58, "LVIII");
        intToRoman.testSolution(input);

        input = new intToRomanRecord(1994, "MCMXCIV");
        intToRoman.testSolution(input);
    }

    private static void testSolution(intToRomanRecord input) {
        System.out.println("Input: num: " + input.num());
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + new intToRoman().intToRomanSolution(input.num()));
        System.out.println("-".repeat(50));
    }

}
