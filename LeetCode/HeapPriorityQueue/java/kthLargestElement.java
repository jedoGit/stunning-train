package LeetCode.HeapPriorityQueue.java;

import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

import java.util.stream.Collectors;

class kthLargestElement {
    public static int findKthLargest(int[] nums, int k) {
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

        int[] input1 = new int[] { 3, 2, 3, 1, 2, 4, 5, 5, 6 };
        int k1 = 4;
        int res1 = findKthLargest(input1, k1);

        System.out.println("Input: " + Arrays.toString(input1) + ", k: " + k1 + " result " + res1);

        int[] input2 = new int[] { 3, 2, 1, 5, 6, 4 };
        int k2 = 2;
        int res2 = findKthLargest(input2, k2);

        System.out.println("Input: " + Arrays.toString(input2) + ", k: " + k2 + " result: " + res2);
    }
}