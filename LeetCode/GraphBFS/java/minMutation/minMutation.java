package LeetCode.GraphBFS.java.minMutation;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashSet;

import java.util.Set;

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String val) {
        this.value = val;
    }

    public String getValue() {
        return this.value;
    }
}

record minMutationRecord(String startGene, String endGene, String[] bank, int expected) {
}

record geneNumMutationPair(String gene, int steps) {
}

public class minMutation {
    public int minMutationSolution(String startGene, String endGene, String[] bank) {
        if (startGene.equals(endGene)) {
            return 0;
        }

        // Gene char choices.
        // Create a set for it so it's easy to lookup
        Set<Character> choices = Set.of('A', 'C', 'G', 'T');
        // System.out.println(choices);

        // Convert bank into a set so we have O(1) access
        Set<String> bankSet = new HashSet<>(Arrays.asList(bank));
        // System.out.println(bankSet);

        // We'll use BFS to find the minimum step of mutation needed from start to end
        // We'll start with first char of startGene and change every char of the gene
        // and check the bank if the geneString is there...
        // Our queue will hold a pair [geneString, numMutationStep]
        Deque<geneNumMutationPair> queue = new ArrayDeque<>();
        queue.addLast(new geneNumMutationPair(startGene, 0));

        // Add the startGene to the visited set
        Set<String> visited = new HashSet<>();
        visited.add(startGene);

        // Perform BFS:
        while (!queue.isEmpty()) {
            geneNumMutationPair gMutationPair = queue.pollFirst();

            // check if the gene is endGene, if so, we're done
            if (gMutationPair.gene().equals(endGene)) {
                return gMutationPair.steps();
            }

            // Here, we want to check each char in the geneString and compare it to each
            // gene char choices
            int i = 0;
            for (char s : gMutationPair.gene().toCharArray()) {
                // Loop through each keys in choices set
                for (char c : choices) {
                    // We want to create a new gene string and check if it's in the bank and if we
                    // have not seen it.
                    // For each gene s on index i, we replace it with c and create a new gene string
                    if (s != c) {
                        String newGene = gMutationPair.gene().substring(0, i)
                                + c
                                + gMutationPair.gene().substring(i + 1, gMutationPair.gene().length());
                        // System.out.println(newGene);

                        if (bankSet.contains(newGene) && !visited.contains(newGene)) {
                            // System.out.println(newGene);
                            visited.add(newGene);
                            queue.addLast(new geneNumMutationPair(newGene, gMutationPair.steps() + 1));
                        }
                    }
                }
                // increment i
                i++;
            }
        }

        // We didn't find the answer, we return -1
        return -1;
    }

    public static void main(String[] args) {
        minMutationRecord[] records = new minMutationRecord[] {
                new minMutationRecord("AACCGGTT", "AACCGGTA", new String[] { "AACCGGTA" }, 1),
                new minMutationRecord("AACCGGTT", "AAACGGTA", new String[] { "AACCGGTA", "AACCGCTA", "AAACGGTA" }, 2)
        };

        int i = 0;
        for (minMutationRecord record : records) {
            System.out.println("Test case " + ++i);
            minMutation.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(minMutationRecord record) {
        System.out.println("input:\tstartGene: " + record.startGene());
        System.out.println("\tendGene: " + record.endGene());
        System.out.println("\tbank: " + Arrays.toString(record.bank()));
        System.out.println("expected: " + record.expected());

        int res = new minMutation().minMutationSolution(record.startGene(), record.endGene(), record.bank());

        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
