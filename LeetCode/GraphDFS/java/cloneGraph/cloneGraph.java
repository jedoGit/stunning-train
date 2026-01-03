package LeetCode.GraphDFS.java.cloneGraph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;

    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }

    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }

    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}

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

record cloneGraphRecord(List<List<Integer>> edges, List<List<Integer>> expected) {
}

class cloneGraph {

    private Map<Node, Node> oldToNew = new HashMap<>();

    public Node cloneGraphSolution(Node node) {
        if (node == null) {
            return null;
        }

        return this.DFS(node);
    }

    private Node DFS(Node node) {
        // Check if the node is in our old to new node hashmap, if so, return the old to
        // new mapping
        if (this.oldToNew.containsKey(node)) {
            return this.oldToNew.get(node);
        }

        // The node is not in our hashmap, so we save a copy of the node to the hashmap
        Node copy = new Node(node.val);
        this.oldToNew.put(node, copy);

        // Copy and update the adjacency list of the old node to the neighbor
        for (Node nei : node.neighbors) {
            copy.neighbors.add(this.DFS(nei));
        }

        return copy;
    }

    public static void main(String[] args) {
        cloneGraphRecord[] records = new cloneGraphRecord[] {
                new cloneGraphRecord(List.of(List.of(2, 4), List.of(1, 3), List.of(2, 4), List.of(1, 3)),
                        List.of(List.of(2, 4), List.of(1, 3), List.of(2, 4), List.of(1, 3))),
                new cloneGraphRecord(List.of(List.of()), List.of(List.of())),
                new cloneGraphRecord(List.of(), List.of()) };

        int i = 1;
        for (cloneGraphRecord record : records) {
            System.out.println("Test case " + i++);
            cloneGraph.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(cloneGraphRecord record) {
        List<Node> input_graph = cloneGraph.createGraph(record.edges());
        List<Node> expected_graph = cloneGraph.createGraph(record.expected());
        System.out.println("Input: edges: ");
        cloneGraph.printGraph(input_graph);
        System.out.println("Expected: ");
        cloneGraph.printGraph(expected_graph);

        List<Node> res_graph = new ArrayList<>();
        for (Node node : input_graph) {
            Node tmpNode = new cloneGraph().cloneGraphSolution(node);
            res_graph.add(tmpNode);
        }

        System.out.println("Result: ");
        cloneGraph.printGraph(res_graph);
        System.out.println(cloneGraph.validateResult(res_graph, record.expected())
                ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }

    private static List<Node> createGraph(List<List<Integer>> edges) {
        List<Node> nodeArr = new ArrayList<>();

        // Create the node with the value
        for (int i = 0; i < edges.size(); i++) {
            nodeArr.add(new Node(i + 1));
        }

        // Add the neighbor list for each nodes
        for (int i = 0; i < nodeArr.size(); i++) {
            // Access the neighbor list of each elements of the node_array
            List<Node> neiList = nodeArr.get(i).neighbors;
            // Get the List of neighbors from the edges list input
            List<Integer> edgeList = edges.get(i);
            // Let's append the neighbor list based on the edge neighbor list. Don't forget
            // that the node_array is 0 based index.
            for (Integer edgeNei : edgeList) {
                neiList.add(nodeArr.get(edgeNei - 1));
            }
        }
        return nodeArr;
    }

    private static void printGraph(List<Node> graph) {
        if (graph.isEmpty()) {
            System.out.println("[]");
            return;
        }

        for (Node node : graph) {
            List<Integer> tmpNei = new ArrayList<>();
            List<Node> neighbors = node.neighbors;

            for (Node nei : neighbors) {
                tmpNei.add(nei.val);
            }
            System.out.println("\t[node " + node.val + "] => val: " + node.val + ", neighbors: " + tmpNei.toString());
        }
    }

    private static boolean validateResult(List<Node> res, List<List<Integer>> expected) {
        if (res.isEmpty() && expected.isEmpty()) {
            return true;
        }

        for (int i = 0; i < res.size(); i++) {
            List<Integer> resNei = new ArrayList<>();
            for (Node node : res.get(i).neighbors) {
                resNei.add(node.val);
            }
            if (!resNei.equals(expected.get(i)) || res.get(i).val != i + 1) {
                return false;
            }
        }
        return true;
    }
}
