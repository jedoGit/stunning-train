package LeetCode.ArrayStrings.java;

record zigzagConversionRecord(String s, int numRows, String expected) {

}

public class zigzagConversion {
    public String convert(String s, int numRows) {
        if (numRows == 1) {
            return s;
        }

        StringBuilder res = new StringBuilder();

        for (int r = 0; r < numRows; r += 1) {
            int increment = 2 * (numRows - 1);

            for (int i = r; i < s.length(); i += increment) {
                res.append(String.valueOf(s.charAt(i)));
                if (r > 0 && r < numRows - 1 && i + increment - 2 * r < s.length()) {
                    res.append(String.valueOf(s.charAt(i + increment - 2 * r)));
                }
            }
        }

        return res.toString();
    }

    public static void main(String[] args) {
        zigzagConversionRecord input = new zigzagConversionRecord("PAYPALISHIRING", 3, "PAHNAPLSIIGYIR");
        zigzagConversion.testSolution(input);

        input = new zigzagConversionRecord("PAYPALISHIRING", 4, "PINALSIGYAHRPI");
        zigzagConversion.testSolution(input);

        input = new zigzagConversionRecord("A", 1, "A");
        zigzagConversion.testSolution(input);
    }

    private static void testSolution(zigzagConversionRecord input) {
        System.out.println("Input: s: " + input.s());
        System.out.println("Input: numRows: " + input.numRows());
        System.out.println("Expected: " + input.expected());
        String val = new zigzagConversion().convert(input.s(), input.numRows());
        System.out.println("Result: " + val + ", " + (val.equals(input.expected()) ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
