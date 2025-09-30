package LeetCode.LinkedList.java;

import java.util.ArrayList;
import java.util.List;

class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }
}

record partitionListRecord(int[] headVals, int x, int[] expectedVals) {
}

class partitionList {
    public ListNode partition(ListNode head, int x) {
        ListNode left = new ListNode();
        ListNode right = new ListNode();

        ListNode cur = head;
        ListNode curLeft = left;
        ListNode curRight = right;

        while (cur != null) {
            if (cur.val < x) {
                curLeft.next = cur;
                curLeft = curLeft.next;
            } else {
                curRight.next = cur;
                curRight = curRight.next;
            }

            cur = cur.next;
        }

        curLeft.next = right.next;

        curRight.next = null;

        return left.next;
    }

    public static void main(String[] args) {
        partitionListRecord input = new partitionListRecord(
                new int[] { 1, 4, 3, 2, 5, 2 },
                3,
                new int[] { 1, 2, 2, 4, 3, 5 });
        partitionList.testSolution(input);

        input = new partitionListRecord(
                new int[] { 2, 1 },
                2,
                new int[] { 1, 2 });
        partitionList.testSolution(input);
    }

    private static void testSolution(partitionListRecord input) {
        ListNode l1 = createLinkedList(input.headVals());
        ListNode expected = createLinkedList(input.expectedVals());

        System.out.println("Input: head vals: " + linkedListValueToString(l1));
        System.out.println("\tx: " + input.x());
        System.out.println("Expected vals: " + linkedListValueToString(expected));

        ListNode res = new partitionList().partition(l1, input.x());

        System.out.println("Result: " + linkedListValueToString(res));
        System.out.println(validateResults(res, expected) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static boolean validateResults(ListNode res, ListNode expected) {
        if (res == null && expected == null) {
            return true;
        }

        List<Integer> res_list = new ArrayList<>();
        List<Integer> expected_list = new ArrayList<>();

        while (res != null) {
            res_list.add(res.val);
            res = res.next;
        }

        while (expected != null) {
            expected_list.add(expected.val);
            expected = expected.next;
        }

        return res_list.equals(expected_list);
    }

    private static String linkedListValueToString(ListNode ll) {
        if (ll == null) {
            return "[ ]";
        }

        StringBuilder sb = new StringBuilder();

        sb.append("[ ");

        while (ll != null) {
            sb.append(ll.val);
            sb.append(", ");

            ll = ll.next;
        }

        // Let's remove the last comma added
        if (sb.length() > 0) {
            sb.setLength(sb.length() - 2);
        }

        sb.append(" ]");

        return sb.toString();
    }

    private static ListNode createLinkedList(int[] headVals) {
        if (headVals.length < 1) {
            return null;
        }

        int arLen = headVals.length;

        ListNode[] lNodes1 = new ListNode[arLen];

        // Create the linked list and connect them
        for (int i = 0; i < arLen; i++) {
            lNodes1[i] = new ListNode(headVals[i]);

            // If this is not the first or last node, connect the node[i-1].next to node[i]
            if (i > 0) {
                lNodes1[i - 1].next = lNodes1[i];
            }

            // If this is the last node, connect to null
            if (i == arLen - 1) {
                lNodes1[i].next = null;
            }
        }

        // Return the head of the LL
        return lNodes1[0];
    }
}
