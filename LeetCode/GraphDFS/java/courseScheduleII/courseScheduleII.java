package LeetCode.GraphDFS.java.courseScheduleII;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

enum testResult {
    PASS("\u001B[32mPASS\u001B[0m"),
    FAIL("\u001B[31mFAIL\u001B[0m");

    private final String value;

    testResult(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

record courseScheduleIIRecord(int numCourses, int[][] prerequisites, int[] expected) {
}

class courseScheduleII {
    private Map<Integer, List<Integer>> prereq = new HashMap<>();
    private List<Integer> output = new ArrayList<>();
    private Set<Integer> visited = new HashSet<>();
    private Set<Integer> cycle = new HashSet<>();

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // Create an adjacency list
        // Create a k/v pair where k is the course number and the
        // value is an empty array list
        for (int c = 0; c < numCourses; c++) {
            this.prereq.put(c, new ArrayList<>());
        }

        // System.out.println(this.prereq);

        // Map the courses to the prereqs
        // prereqsuisites returns an array of array: [[crs, pre],...,[crs, pre]]
        for (int[] coursePair : prerequisites) {
            List<Integer> tmpList = this.prereq.get(coursePair[0]);
            tmpList.add(coursePair[1]);
            this.prereq.put(coursePair[0], tmpList);
        }

        for (int c = 0; c < numCourses; c++) {
            if (!this.DFS(c)) {
                return new int[] {}; // We detected a cycle, therefore we can't continue, return an empty array
            }
        }

        // Convert List<Integer> to int[]
        return this.output.stream().mapToInt(Integer::intValue).toArray();
    }

    // Helper function to dfs the adjacency list of each course. Returns false if
    // there's a cycle, otherwise returns true add to visited set
    private boolean DFS(int crs) {
        if (this.cycle.contains(crs)) {
            return false;
        }

        if (this.visited.contains(crs)) {
            return true;
        }

        this.cycle.add(crs);

        // prereq[crs] returns an array
        for (Integer pre : this.prereq.get(crs)) {
            if (!this.DFS(pre)) {
                return false; // there is a cycle and we can't continue
            }
        }

        this.cycle.remove(crs);
        this.visited.add(crs);
        this.output.add(crs);

        return true;
    }

    public static void main(String[] args) {
        courseScheduleIIRecord[] records = new courseScheduleIIRecord[] {
                new courseScheduleIIRecord(2, new int[][] { { 1, 0 } }, new int[] { 0, 1 }),
                new courseScheduleIIRecord(4, new int[][] { { 1, 0 }, { 2, 0 }, { 3, 1 }, { 3, 2 } },
                        new int[] { 0, 2, 1, 3 }),
                new courseScheduleIIRecord(1, new int[][] {}, new int[] { 0 })
        };

        int i = 0;

        for (courseScheduleIIRecord record : records) {
            System.out.println("Test case " + ++i);
            courseScheduleII.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(courseScheduleIIRecord record) {
        System.out.println("Input: numCourses: " + record.numCourses());
        System.out.println("prerequisites: " + Arrays.deepToString(record.prerequisites()));
        System.out.println("expected: " + Arrays.toString(record.expected()));

        int[] resArr = new courseScheduleII().findOrder(record.numCourses(), record.prerequisites());

        System.out.println("result: " + Arrays.toString(resArr));

        Set<Integer> resSet = Arrays.stream(resArr).boxed().collect(Collectors.toSet());
        Set<Integer> expectedSet = Arrays.stream(record.expected()).boxed().collect(Collectors.toSet());

        boolean validatedResult = resSet.equals(expectedSet);

        System.out.println(validatedResult == true ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
