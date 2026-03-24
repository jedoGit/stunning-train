package LeetCode.HeapPriorityQueue.java.findMedianFromDataStream;

import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.PriorityQueue;

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

record findMedianFromDataStreamRecord(String[] operation, int[][] value, List<String> expected) {
}

class findMedianFromDataStream {

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
        findMedianFromDataStreamRecord[] records = new findMedianFromDataStreamRecord[] {
                new findMedianFromDataStreamRecord(
                        new String[] { "MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian" },
                        new int[][] { {}, { 1 }, { 2 }, {}, { 3 }, {} },
                        List.of("null", "null", "null", "1.50000", "null", "2.00000"))
        };

        int i = 1;
        for (findMedianFromDataStreamRecord record : records) {
            System.out.println("# Test case " + i++);
            findMedianFromDataStream.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(findMedianFromDataStreamRecord record) {
        System.out.println("input:\toperations: " + Arrays.toString(record.operation()));
        System.out.println("\tvalues: " + Arrays.deepToString(record.value()));

        System.out.println("expected: " + record.expected());

        List<String> output = new LinkedList<>();
        findMedianFromDataStream medianFinder = null;

        for (int i = 0; i < record.operation().length; i++) {
            String operation = record.operation()[i];

            switch (operation) {
                case "MedianFinder" -> {
                    medianFinder = new findMedianFromDataStream();
                    output.add("null");
                }
                case "addNum" -> {
                    medianFinder.addNum(record.value()[i][0]);
                    output.add("null");
                }
                case "findMedian" -> {
                    double median = medianFinder.findMedian();
                    String formattedValue = String.format("%.5f", median);
                    output.add(formattedValue);
                }
            }
        }

        System.out.println("result: " + output);
        System.out.println(output.equals(record.expected()) ? testResult.PASS.getValue() : testResult.FAIL.getValue());
    }
}
