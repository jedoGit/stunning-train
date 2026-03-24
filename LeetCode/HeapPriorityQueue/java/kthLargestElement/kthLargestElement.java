package LeetCode.HeapPriorityQueue.java.kthLargestElement;

import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

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

record kthLargestElementRecord(int[] nums, int k, int expected) {
}

class kthLargestElement {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> hMin = new PriorityQueue<>();

        // List<Integer> list = new ArrayList<>();

        // for( int i = 0 ; i < nums.length ; i++ ){
        // list.add(nums[i]);
        // }

        List<Integer> list = Arrays.stream(nums)
                .boxed()
                .collect(Collectors.toList());

        list.subList(0, k).stream()
                .forEach(n -> hMin.add(n));

        list.subList(k, nums.length).stream()
                .forEach(n -> {
                    if (n > hMin.peek()) {
                        hMin.poll();
                        hMin.add(n);
                    }
                });

        // System.out.println(hMin);

        return hMin.peek();
    }

    public static void main(String[] args) {

        kthLargestElementRecord[] records = new kthLargestElementRecord[] {
                new kthLargestElementRecord(new int[] { 3, 2, 3, 1, 2, 4, 5, 5, 6 }, 4, 4),
                new kthLargestElementRecord(new int[] { 3, 2, 1, 5, 6, 4 }, 2, 5)
        };

        int i = 1;
        for (kthLargestElementRecord record : records) {
            System.out.println("# Test case " + i++);
            kthLargestElement.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(kthLargestElementRecord record) {
        System.out.println("input:\tnums: " + Arrays.toString(record.nums()));
        System.out.println("\tk: " + record.k());
        System.out.println("expected: " + record.expected());

        int res = new kthLargestElement().findKthLargest(record.nums(), record.k());
        System.out.println("result: " + res);
        System.out.println(res == record.expected() ? testResult.PASS.getValue() : testResult.FAIL.getValue());

    }
}