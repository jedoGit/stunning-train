
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

public class maxNumberOfVisiblePoints {
    public static int visiblePoints(List<List<Integer>> points, int angle, List<Integer> location) {
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
                .collect(Collectors.toCollection(LinkedList::new));

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
        List<List<Integer>> points = new LinkedList<>();
        points.add(List.of(2, 1));
        points.add(List.of(2, 2));
        points.add(List.of(3, 4));
        points.add(List.of(1, 1));

        int angle = 90;

        List<Integer> location = List.of(1, 1);
        int expected = 4;

        int result = maxNumberOfVisiblePoints.visiblePoints(points, angle, location);

        System.out.println("Points: " + points + " Angle: " + angle + " Location: " + location);
        System.out.println("Max number of visible points: " + result);
        System.out.println("Expected: " + expected + (result == expected ? " Correct!" : " Incorrect!"));

        points.clear();
        points.add(List.of(1, 0));
        points.add(List.of(2, 1));

        angle = 13;

        location = List.of(1, 1);

        expected = 1;

        result = maxNumberOfVisiblePoints.visiblePoints(points, angle, location);

        System.out.println("Points: " + points + " Angle: " + angle + " Location: " + location);
        System.out.println("Max number of visible points: " + result);
        System.out.println("Expected: " + expected + (result == expected ? " Correct!" : " Incorrect!"));

    }
}