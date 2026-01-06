package LeetCode.GraphDFS.java.courseSchedule;

import java.util.ArrayList;
import java.util.Arrays;
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
        return value;
    }
}

record courseScheduleRecord(int numCourses, int[][] prerequisites, boolean expected) {
}

class courseSchedule {
    private Map<Integer, List<Integer>> premap = new HashMap<>();
    private Set<Integer> visited = new HashSet<>();

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Create an adjacency list of courses and prereqs
        // Create a k/v pair where k is the course number and the
        // value is an empty array
        for (int c = 0; c < numCourses; c++) {
            this.premap.put(c, new ArrayList<>());
        }

        // prerequisites is an array of arrays [[c,p],...,[c,p]]
        // we want: premap{1:[2,3]...}
        for (int[] prereq : prerequisites) {
            // Get the list currently pointed by the key prereq[0]
            List<Integer> tmpList = this.premap.get(prereq[0]);
            // append prereq[1] to the list
            tmpList.add(prereq[1]);
            // replace the list pointed by prereq[0] with the new list
            this.premap.put(prereq[0], tmpList);
        }

        // Let's DFS all course
        for (int c = 0; c < numCourses; c++) {
            // Let's check if we've visited this course before so, let's not continue
            if (!this.DFS(c)) {
                return false;
            }
        }

        return true;
    }

    // Helper function, DFS all courses in the premap. Returns false if course is in
    // the visited set, true otherwise. Add course to visited set.

    private boolean DFS(int crs) {
        if (this.visited.contains(crs)) {
            return false;
        }

        if (this.premap.get(crs).isEmpty()) {
            // premap[crs] returns an array. We check if the size of the array is 0. If
            // zero, there's nothing to DFS.
            return true;
        }

        this.visited.add(crs);

        // DFS the courses
        for (Integer prereq : this.premap.get(crs)) {
            if (!this.DFS(prereq)) {
                // We've visited this prerequisite and let's not visit it again... just return
                // false
                return false;
            }
        }

        // Let's remove course from visited set and empty the adjacency list for this
        // course
        this.visited.remove(crs);
        List<Integer> tmpList = this.premap.get(crs);
        tmpList.clear();

        return true;
    }

    public static void main(String[] args) {
        courseScheduleRecord[] records = new courseScheduleRecord[] {
                new courseScheduleRecord(2, new int[][] { { 1, 0 } }, true),
                new courseScheduleRecord(2, new int[][] { { 1, 0 }, { 0, 1 } }, false),
        };

        int i = 1;
        for (courseScheduleRecord record : records) {
            System.out.println("Test case " + i++);
            courseSchedule.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(courseScheduleRecord record) {
        System.out.println("Input: numCourses: " + record.numCourses());
        System.out.println("prerequisites: " + Arrays.deepToString(record.prerequisites()));
        System.out.println("Expected: " + record.expected());
        boolean res = new courseSchedule().canFinish(record.numCourses(), record.prerequisites());
        System.out.println("Result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
