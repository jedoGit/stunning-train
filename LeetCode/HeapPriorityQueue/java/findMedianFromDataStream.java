package LeetCode.HeapPriorityQueue.java;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.PriorityQueue;

record Actions(String action, List<Integer> input) {
}

public class findMedianFromDataStream {

    private PriorityQueue<Integer> maxH;
    private PriorityQueue<Integer> minH;

    public findMedianFromDataStream() {
        this.maxH = new PriorityQueue<>(Comparator.reverseOrder());
        this.minH = new PriorityQueue<>();
    }

    public void addNum(int num) {
        minH.offer(Integer.valueOf(num));

        Integer minVal = minH.poll();
        maxH.offer(minVal);

        if (minH.size() < maxH.size()) {
            Integer maxVal = maxH.poll();
            minH.offer(maxVal);
        }
    }

    public double findMedian() {
        if (minH.size() > maxH.size()) {
            return minH.peek();
        } else {
            double mean = (minH.peek() + maxH.peek()) / 2.0;
            return mean;
        }
    }

    public static void main(String[] args) {

        List<Actions> actions = new LinkedList<>();
        actions.add(new Actions("MedianFinder", List.of()));
        actions.add(new Actions("addNum", List.of(1)));
        actions.add(new Actions("addNum", List.of(2)));
        actions.add(new Actions("findMedian", List.of()));
        actions.add(new Actions("addNum", List.of(3)));
        actions.add(new Actions("findMedian", List.of()));

        List<Double> output = new LinkedList<>();

        findMedianFromDataStream medianFinder = new findMedianFromDataStream();

        for (int i = 0; i < actions.size(); i++) {
            switch (actions.get(i).action()) {
                case "MedianFinder" -> {
                    output.add(null);
                }
                case "addNum" -> {
                    medianFinder.addNum(actions.get(i).input().get(0));
                    output.add(null);
                }
                case "findMedian" -> {
                    output.add(Double.valueOf(medianFinder.findMedian()));
                }
            }
        }

        actions.forEach(a -> {
            System.out.printf("[" + a.action() + "]");
        });
        System.out.println();
        actions.forEach(a -> {
            System.out.print(a.input());
        });
        System.out.println();
        output.forEach(out -> System.out.print("[" + out + "]"));

    }
}
