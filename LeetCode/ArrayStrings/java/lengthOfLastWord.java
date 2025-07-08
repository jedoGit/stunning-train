package LeetCode.ArrayStrings.java;

record lengthOfLastWordRecord(String s, int expected) {
}

public class lengthOfLastWord {
    public int lengthOfLastWordSolution(String s) {
        int n = s.length();
        int r = n - 1;

        while (r > -1 && String.valueOf(s.charAt(r)).equals(" ")) {
            r -= 1;
        }

        int count = 0;

        while (r > -1 && !String.valueOf(s.charAt(r)).equals(" ")) {
            r -= 1;
            count += 1;
        }

        return count;

    }

    public static void main(String[] args) {
        lengthOfLastWordRecord input = new lengthOfLastWordRecord("Hello World", 5);
        lengthOfLastWord.testSolution(input);

        input = new lengthOfLastWordRecord("   fly me   to   the moon  ", 4);
        lengthOfLastWord.testSolution(input);

        input = new lengthOfLastWordRecord("luffy is still joyboy", 6);
        lengthOfLastWord.testSolution(input);
    }

    private static void testSolution(lengthOfLastWordRecord input) {
        System.out.println("Input: " + input.s());
        System.out.println("Expected: " + input.expected());
        System.out.println("Result: " + new lengthOfLastWord().lengthOfLastWordSolution(input.s()));
        System.out.println("-".repeat(50));
    }
}
