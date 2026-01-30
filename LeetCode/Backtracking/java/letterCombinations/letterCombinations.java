package LeetCode.Backtracking.java.letterCombinations;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

record letterCombinationsRecord(String digits, List<String> expected) {
}

public class letterCombinations {
    public final Map<Character, String> digitToChar = Map.ofEntries(
            Map.entry('2', "abc"), Map.entry('3', "def"), Map.entry('4', "ghi"), Map.entry('5', "jkl"),
            Map.entry('6', "mno"), Map.entry('7', "pqrs"), Map.entry('8', "tuv"), Map.entry('9', "wxyz"));

    public List<String> res = new ArrayList<>();

    public List<String> letterCombinationsSolution(String digits) {
        if (digits.isBlank()) {
            return res;
        }

        this.backTrack(0, "", digits);
        return this.res;

    }

    private void backTrack(int i, String curStr, String digits) {
        if (i == digits.length()) {
            this.res.add(curStr);
            return;
        }

        String digitChar = this.digitToChar.get(digits.charAt(i));

        for (char c : digitChar.toCharArray()) {
            this.backTrack(i + 1, curStr + String.valueOf(c), digits);
        }
    }

    public static void main(String[] args) {
        letterCombinationsRecord[] records = new letterCombinationsRecord[] {
                new letterCombinationsRecord("23", List.of("ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf")),
                new letterCombinationsRecord("2", List.of("a", "b", "c"))
        };

        int i = 1;
        System.out.println("-".repeat(50));
        for (letterCombinationsRecord record : records) {
            System.out.println("# Test case " + i++);
            letterCombinations.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(letterCombinationsRecord record) {
        System.out.println("input: digits: " + record.digits());
        System.out.println("expected: " + record.expected());
        List<String> res = new letterCombinations().letterCombinationsSolution(record.digits());
        System.out.println("result: " + res);
        System.out.println(res.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
