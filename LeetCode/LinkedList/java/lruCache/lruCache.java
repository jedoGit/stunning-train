package LeetCode.LinkedList.java.lruCache;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class NodeDLL {
    // Doubly Linked List
    int key;
    int val;
    NodeDLL prev;
    NodeDLL next;

    public NodeDLL(int key, int val) {
        this.key = key;
        this.val = val;
        prev = null;
        next = null;
    }
}

record lruCacheRecord(String[] operation, int[][] val, String[] expected) {
}

class lruCache {
    int cap;
    Map<Integer, NodeDLL> cache;
    NodeDLL oldest;
    NodeDLL latest;

    public lruCache(int capacity) {
        this.cap = capacity;
        this.cache = new HashMap<>();
        this.oldest = new NodeDLL(0, 0);
        this.latest = new NodeDLL(0, 0);
        // Connect oldest and prev nodes. These nodes are doubly LL
        this.oldest.next = this.latest;
        this.latest.prev = this.oldest;
    }

    public int get(int key) {
        if (cache.containsKey(key)) {
            remove(cache.get(key)); // remove from current position in LL
            insert(cache.get(key)); // insert to new position in LL

            return cache.get(key).val;
        }
        return -1;
    }

    private void remove(NodeDLL node) {
        // Remove node from current position in LL
        NodeDLL prev = node.prev;
        NodeDLL next = node.next;
        prev.next = next;

        next.prev = prev;
    }

    private void insert(NodeDLL node) {
        // Insert node to new position in latest LL. Insert to one node before the
        // current last node in latest LL.
        NodeDLL prev = this.latest.prev;
        NodeDLL next = this.latest;

        // Insert the new node between the last node in the latest LL and the prev node
        prev.next = node;
        next.prev = node;
        node.next = next;
        node.prev = prev;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(this.cache.get(key));
        }

        this.cache.put(key, new NodeDLL(key, value));
        insert(this.cache.get(key));

        if (this.cache.size() > this.cap) {
            NodeDLL lru = this.oldest.next;
            remove(lru);
            this.cache.remove(lru.key);
        }
    }

    public static void main(String[] args) {
        lruCacheRecord input = new lruCacheRecord(
                new String[] { "LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get" },
                new int[][] { { 2 }, { 1, 1 }, { 2, 2 }, { 1 }, { 3, 3 }, { 2 }, { 4, 4 }, { 1 }, { 3 }, { 4 } },
                new String[] { "null", "null", "null", "1", "null", "-1", "null", "-1", "3", "4" });

        lruCache.testSolution(input);
    }

    private static void testSolution(lruCacheRecord input) {
        System.out.println("Input: Function: " + Arrays.toString(input.operation()) + "\n\t"
                + " values: " + Arrays.deepToString(input.val()));

        int n = input.operation().length;
        String[] output = new String[n];
        lruCache soln = null;

        for (int i = 0; i < n; i += 1) {
            switch (input.operation()[i].strip()) {
                case "LRUCache" -> {
                    soln = new lruCache(input.val()[i][0]);
                    output[i] = "null";
                }
                case "get" -> output[i] = String.valueOf(soln.get(input.val()[i][0]));
                case "put" -> {
                    soln.put(input.val()[i][0], input.val()[i][1]);
                    output[i] = "null";
                }
            }
        }
        System.out.println("Expected: " + Arrays.toString(input.expected()));
        System.out.println("Result: " + Arrays.toString(output));
        System.out.println(lruCache.validateResult(output, input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static boolean validateResult(String[] output, String[] expected) {
        if (output.length != expected.length) {
            return false;
        }

        for (int i = 0; i < expected.length; i++) {
            if (!output[i].equals(expected[i])) {
                return false;
            }
        }
        return true;
    }
}
