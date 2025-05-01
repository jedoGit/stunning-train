package LeetCode.BitManipulation.java;

import java.math.BigInteger;

public class addBinary {

    public static String addBinaryString(String a, String b) {

        BigInteger num1 = new BigInteger(a, 2);
        BigInteger num2 = new BigInteger(b, 2);

        BigInteger sum = num1.add(num2);

        return sum.toString(2);
    }

    public static void main(String[] args) {

        String a = String.valueOf(
                "1010");
        String b = String.valueOf(
                "1011");
        String expected = String.valueOf("10101");

        System.out.println(a + " + " + b + " = " + addBinaryString(a, b));
        System.out.println("Result: " + (addBinaryString(a, b).equals(expected) ? "Correct!!!" : "Not Correct!!!"));

        System.out.println("=".repeat(50));

        a = String.valueOf(
                "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101");
        b = String.valueOf(
                "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011");
        expected = String.valueOf(
                "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000");

        System.out.println(a + " + " + b + " = " + addBinaryString(a, b));
        System.out.println("Result: " + (addBinaryString(a, b).equals(expected) ? "Correct!!!" : "Not Correct!!!"));

    }
}
