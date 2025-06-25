package LeetCode.ArrayStrings.java;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

record randomizedSetRecord(String[] operation, int[][] val, String[] expected) {
}

public class randomizedSet {
    private List<Integer> list;
    private Map<Integer, Integer> map;

    public randomizedSet() {
        this.list = new ArrayList<>();
        this.map = new HashMap<>();
    }

    public boolean insert(int val) {
        if (this.map.containsKey(val)) {
            return false;
        }

        this.list.add(val);
        this.map.put(val, this.list.size() - 1);

        return true;
    }

    public boolean remove(int val) {
        if (!this.map.containsKey(val)) {
            return false;
        }

        int idx = this.map.get(val);

        this.list.set(idx, this.list.get(this.list.size() - 1));
        this.map.put(this.list.get(idx), idx);
        this.list.remove(this.list.size() - 1);
        this.map.remove(val);

        return true;
    }

    public int getRandom() {
        Random rand = new Random();
        return this.list.get(rand.nextInt(this.list.size()));
    }

    public static void main(String[] args) {
        randomizedSetRecord input = new randomizedSetRecord(
                new String[] { "RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert",
                        "getRandom" },
                new int[][] { {}, { 1 }, { 2 }, { 2 }, {}, { 1 }, { 2 }, {} },
                new String[] { "null", "true", "false", "true", "1", "true", "false", "2" });

        randomizedSet.testSolution(input);
    }

    private static void testSolution(randomizedSetRecord input) {
        System.out.println("Input: Function: " + Arrays.toString(input.operation()) + "\n\t"
                + " values: " + Arrays.deepToString(input.val()));

        int n = input.operation().length;
        String[] output = new String[n];
        randomizedSet soln = null;// new randomizedSet();

        for (int i = 0; i < n; i += 1) {
            switch (input.operation()[i].strip()) {
                case "RandomizedSet" -> {
                    soln = new randomizedSet();
                    output[i] = "null";
                }
                case "insert" -> {
                    output[i] = soln.insert(input.val()[i][0]) == true ? "true" : "false";
                }
                case "remove" -> {
                    output[i] = soln.remove(input.val()[i][0]) == true ? "true" : "false";
                }
                case "getRandom" -> output[i] = Integer.toString(soln.getRandom());
            }
        }
        System.out.println("Expected: " + Arrays.toString(input.expected()));
        System.out.println("Result: " + Arrays.toString(output));
    }
}
