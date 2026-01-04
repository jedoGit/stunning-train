package LeetCode.GraphBFS.java.calcEquation;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

record calcEquationRecord(List<List<String>> equations, double[] values, List<List<String>> queries,
        double[] expected) {
}

record Pair(String eqnStr, double value) {
}

class calcEquation {

    private Map<String, List<Pair>> graph = new HashMap<>();

    public double[] calcEquationSolution(List<List<String>> equations, double[] values, List<List<String>> queries) {
        // Build the graph
        // The graph will be an object of objects
        // After visualizing the requirements, we can deduce that
        // For the direction a->b, we assign the value as-is
        // For the direction b->a, we assign the value as 1/value

        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);

            List<Pair> aList = this.graph.getOrDefault(a, new ArrayList<>());
            aList.add(new Pair(b, values[i]));
            // Put the list back to the graph
            this.graph.put(a, aList);

            List<Pair> bList = this.graph.getOrDefault(b, new ArrayList<>());
            bList.add(new Pair(a, 1 / values[i]));
            // Put the list back to the graph
            this.graph.put(b, bList);
        }

        double[] resArr = new double[queries.size()];

        int i = 0;
        for (List<String> query : queries) {
            resArr[i] = this.BFS(query.get(0), query.get(1));
            i++;
        }

        return resArr;
    }

    private double BFS(String src, String tgt) {
        // Let's build our bfs
        // From the requirement, if the equation does not exist, we return -1
        // From our visualization of the graph, if the src and dest is itself, we return
        // 1
        // From the visualization, moving from node to node, we multiply the values of
        // that direction

        if (!this.graph.containsKey(src) || !this.graph.containsKey(tgt)) {
            return -1.0;
        }

        Deque<Pair> queue = new ArrayDeque<>();
        Set<String> visited = new HashSet<>();

        queue.addLast(new Pair(src, 1));
        visited.add(src);

        while (!queue.isEmpty()) {
            Pair pairQueue = queue.pollFirst();
            String n = pairQueue.eqnStr();
            double w = pairQueue.value();

            if (n.equals(tgt)) {
                return w;
            }

            for (Pair pairList : this.graph.get(n)) {
                String nei = pairList.eqnStr();
                double weight = pairList.value();

                if (!visited.contains(nei)) {
                    queue.addLast(new Pair(nei, w * weight));
                    visited.add(nei);
                }
            }
        }

        return -1.0;
    }

    public static void main(String[] args) {
        calcEquationRecord[] records = new calcEquationRecord[] {
                new calcEquationRecord(List.of(List.of("a", "b"), List.of("b", "c")),
                        new double[] { 2.0, 3.0 },
                        List.of(List.of("a", "c"), List.of("b", "a"), List.of("a", "e"), List.of("a", "a"),
                                List.of("x", "x")),
                        new double[] { 6.00000, 0.50000, -1.00000, 1.00000, -1.00000 }),
                new calcEquationRecord(List.of(List.of("a", "b"), List.of("b", "c"), List.of("bc", "cd")),
                        new double[] { 1.5, 2.5, 5.0 },
                        List.of(List.of("a", "c"), List.of("c", "b"), List.of("bc", "cd"), List.of("cd", "bc")),
                        new double[] { 3.75000, 0.40000, 5.00000, 0.20000 }),
                new calcEquationRecord(List.of(List.of("a", "b")),
                        new double[] { 0.5 },
                        List.of(List.of("a", "b"), List.of("b", "a"), List.of("a", "c"), List.of("x", "y")),
                        new double[] { 0.50000, 2.00000, -1.00000, -1.00000 }),
        };

        int i = 1;
        for (calcEquationRecord record : records) {
            System.out.println("Test case " + i++);
            calcEquation.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(calcEquationRecord record) {
        System.out.println("Input: equations: " + record.equations().toString());
        System.out.println("values: " + Arrays.toString(record.values()));
        System.out.println("queries: " + record.queries().toString());

        String[] formattedExpected = calcEquation.formatDoubleArrToStringArr(record.expected());

        System.out.println("expected: " + Arrays.toString(formattedExpected));

        double[] resultArr = new calcEquation().calcEquationSolution(record.equations(), record.values(),
                record.queries());

        String[] formattedResult = calcEquation.formatDoubleArrToStringArr(resultArr);

        System.out.println("result: " + Arrays.toString(formattedResult));
        System.out.println(Arrays.deepEquals(formattedExpected, formattedResult)
                ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }

    private static String[] formatDoubleArrToStringArr(double[] valArr) {
        String[] formatted = new String[valArr.length];
        int i = 0;
        for (double val : valArr) {
            formatted[i] = String.format("%.5f", val);
            i++;
        }
        return formatted;
    }

}
