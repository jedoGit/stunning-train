// 1610. Maximum Number of Visible Points
// https://leetcode.com/problems/maximum-number-of-visible-points/

package LeetCode.SlidingWindow.java;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

record maxNumberOfVisiblePointsRecord(List<List<Integer>> points, int angle, List<Integer> location, int expected) {
}

public class maxNumberOfVisiblePoints {
    public int visiblePoints(List<List<Integer>> points, int angle, List<Integer> location) {
        List<Double> candidateAngles = points.stream()
                .filter(p -> !(p.get(0).equals(location.get(0)) && p.get(1).equals(location.get(1))))
                .map(p -> {
                    return (Math.atan2(p.get(1) - location.get(1), p.get(0) - location.get(0)) * 180.0) / Math.PI;
                })
                .sorted()
                .collect(Collectors.toCollection(LinkedList::new));

        int onCenterCount = points.size() - candidateAngles.size();

        List<Double> transformedAngles = candidateAngles.stream()
                .filter(a -> a < 0.0)
                .map(a -> a + 360.0)
                .collect(Collectors.toCollection(() -> new LinkedList<>()));
        // .collect(Collectors.toCollection(LinkedList::new));

        candidateAngles.addAll(transformedAngles);

        int r = 0;
        int l = 0;
        int res = 0;

        while (r < candidateAngles.size()) {
            while (candidateAngles.get(r) - candidateAngles.get(l) > Double.valueOf(angle)) {
                l++;
            }
            res = Math.max(res, r - l + 1);
            r++;
        }

        return res + onCenterCount;
    }

    public static void main(String[] args) {
        maxNumberOfVisiblePointsRecord input = new maxNumberOfVisiblePointsRecord(
                List.of(List.of(2, 1), List.of(2, 2), List.of(3, 3)),
                90,
                List.of(1, 1),
                3);
        maxNumberOfVisiblePoints.testSolution(input);

        input = new maxNumberOfVisiblePointsRecord(
                List.of(List.of(2, 1), List.of(2, 2), List.of(3, 4), List.of(1, 1)),
                90,
                List.of(1, 1),
                4);
        maxNumberOfVisiblePoints.testSolution(input);

        input = new maxNumberOfVisiblePointsRecord(
                List.of(List.of(1, 0), List.of(2, 1)),
                13,
                List.of(1, 1),
                1);
        maxNumberOfVisiblePoints.testSolution(input);

    }

    private static void testSolution(maxNumberOfVisiblePointsRecord input) {
        System.out.println("Input: points: " + input.points());
        System.out.println("Input: angle: " + input.angle());
        System.out.println("Input location: " + input.location());
        System.out.println("Expected: " + input.expected());
        int val = new maxNumberOfVisiblePoints().visiblePoints(input.points(), input.angle(), input.location());
        System.out.println("Result: " + val);
        System.out.println((val == input.expected() ? "PASS" : "FAIL"));
        System.out.println("-".repeat(50));
    }
}