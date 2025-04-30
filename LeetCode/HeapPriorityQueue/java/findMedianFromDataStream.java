package LeetCode.HeapPriorityQueue.java;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.PriorityQueue;

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
        List<String> actions = new ArrayList<>(
                List.of("MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"));
        List<List<Integer>> input = new ArrayList<>(List.of(List.of(), List.of(1), List.of(2), List.of(), List.of(3),
                List.of()));
        List<Double> output = new LinkedList<>();
        // double val = 0;

        // findMedianFromDataStream medianFinder = new findMedianFromDataStream();
        // output.add(null);
        // medianFinder.addNum(1);
        // output.add(null);
        // medianFinder.addNum(2);
        // output.add(null);
        // val = medianFinder.findMedian();
        // output.add(Double.valueOf(val));
        // medianFinder.addNum(3);
        // output.add(null);
        // val = medianFinder.findMedian();
        // output.add(Double.valueOf(val));

        findMedianFromDataStream medianFinder = new findMedianFromDataStream();

        for (int i = 0; i < actions.size(); i++) {
            switch (actions.get(i)) {
                case "MedianFinder" -> {
                    output.add(null);
                }
                case "addNum" -> {
                    medianFinder.addNum(input.get(i).get(0));
                    output.add(null);
                }
                case "findMedian" -> {
                    output.add(Double.valueOf(medianFinder.findMedian()));
                }
            }
        }

        System.out.println(actions.toString());
        System.out.println(input.toString());
        System.out.println(output.toString());

    }
}
