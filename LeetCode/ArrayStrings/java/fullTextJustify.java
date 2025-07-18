package LeetCode.ArrayStrings.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

record fullTextJustifyRecord(String[] words, int maxWidth, List<String> expected) {
}

public class fullTextJustify {
    public List<String> fullJustify(String[] words, int maxWidth) {

        List<String> res = new ArrayList<>();
        List<StringBuilder> line = new ArrayList<>();
        int length = 0;
        int i = 0;

        while (i < words.length) {
            if (length + line.size() + words[i].length() > maxWidth) {
                int extra_space = maxWidth - length;
                int spaces = (extra_space / Math.max(1, line.size() - 1));
                int remainder = extra_space % Math.max(1, line.size() - 1);

                for (int j = 0; j < Math.max(1, line.size() - 1); j += 1) {

                    line.get(j).append(" ".repeat(spaces));

                    if (remainder > 0) {
                        line.get(j).append(" ");
                        remainder -= 1;
                    }
                }

                res.add(String.join("", line));
                line.clear();
                length = 0;
            }

            line.add(new StringBuilder().append(words[i]));

            length += words[i].length();
            i += 1;
        }

        String last_line = String.join(" ", line);
        int trail_space = maxWidth - last_line.length();
        res.add(last_line + " ".repeat(trail_space));

        return res;
    }

    public static void main(String[] args) {
        fullTextJustifyRecord input = new fullTextJustifyRecord(
                new String[] { "This", "is", "an", "example", "of", "text", "justification." },
                16,
                List.of("This    is    an", "example  of text", "justification.  "));

        fullTextJustify.testSolution(input);

        input = new fullTextJustifyRecord(
                new String[] { "What", "must", "be", "acknowledgment", "shall", "be" },
                16,
                List.of("What   must   be", "acknowledgment  ", "shall be        "));

        fullTextJustify.testSolution(input);

        input = new fullTextJustifyRecord(
                new String[] { "Science", "is", "what", "we", "understand", "well", "enough", "to", "explain", "to",
                        "a", "computer.", "Art", "is", "everything", "else", "we",
                        "do" },
                20,
                List.of("Science  is  what we", "understand      well", "enough to explain to", "a  computer.  Art is",
                        "everything  else  we", "do                  "));

        fullTextJustify.testSolution(input);
    }

    private static void testSolution(fullTextJustifyRecord input) {
        System.out.println("Input: words: " + Arrays.toString(input.words()));
        System.out.println("Input: maxWidth: " + input.maxWidth());
        System.out.println("Expected: \t" + input.expected().toString());
        List<String> val = new fullTextJustify().fullJustify(input.words(), input.maxWidth());
        System.out.println("Result: \t" + val +
                "\nStatus: " + (val.equals(input.expected()) ? "Correct" : "Wrong"));
        System.out.println("-".repeat(50));
    }
}
