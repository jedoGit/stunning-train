package LeetCode.BitManipulation.java;

public class reverseBits {

    public static int reverse(int n) {
        int mask = 1;
        int ans = 0;
        for (int i = 1; i <= 32; i++) {
            if ((mask & n) != 0) {
                ans += 1 << 32 - i;
            }
            mask <<= 1;
        }
        return ans;
    }

    public static void main(String[] args) {
        String binInput = new String("00000010100101000001111010011100");
        Integer numInput = Integer.parseUnsignedInt(binInput, 2);
        Integer expected = 964176192;
        String expBin = String.valueOf("00111001011110000010100101000000");

        System.out.println("Input: " + numInput + " (" + binInput + ")");
        Integer revNumInput = reverse(numInput);
        String strRevNumInput = String.format("%32s", Integer.toBinaryString(revNumInput)).replace(" ", "0");
        System.out.printf("Result: %d (%s)%n", revNumInput, strRevNumInput);
        System.out.println("Expected: " + expected + " (" + expBin + ")"
                + (expBin.equals(strRevNumInput) ? " Correct!" : " Incorrect"));
    }

}
