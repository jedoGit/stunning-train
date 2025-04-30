package LeetCode.HeapPriorityQueue.java;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

public class kSmallestPairs {
    public List<List<Integer>> getkSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<List<Integer>> res = new ArrayList<>();

        if (nums1.length == 0 || nums2.length == 0 || k == 0) {
            return res;
        }

        PriorityQueue<List<Integer>> hmin = new PriorityQueue<>((a, b) -> a.get(0) - b.get(0));
        Set<List<Integer>> visited = new HashSet<>();

        hmin.add(List.of(nums1[0] + nums2[0], 0, 0));
        visited.add(List.of(0, 0));

        while (k > 0 && !hmin.isEmpty()) {
            List<Integer> val = hmin.poll();

            int i = val.get(1);
            int j = val.get(2);

            res.add(List.of(nums1[i], nums2[j]));

            if (i + 1 < nums1.length && !visited.contains(List.of(i + 1, j))) {
                hmin.add(List.of(nums1[i + 1] + nums2[j], i + 1, j));
                visited.add(List.of(i + 1, j));
            }

            if (j + 1 < nums2.length && !visited.contains(List.of(i, j + 1))) {
                hmin.add(List.of(nums1[i] + nums2[j + 1], i, j + 1));
                visited.add(List.of(i, j + 1));
            }

            k -= 1;
        }

        return res;

    }

    public static void main(String[] args) {
        int[] nums1 = new int[] { 1, 7, 11 };
        int[] nums2 = new int[] { 2, 4, 6 };
        int k = 3;

        System.out.println(new kSmallestPairs().getkSmallestPairs(nums1, nums2, k));
    }
}
