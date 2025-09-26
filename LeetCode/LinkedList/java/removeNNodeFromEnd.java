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

record removeNNodeFromEndRecord(int[] headVals, int n, int[] expectedVals) {
}

class removeNNodeFromEnd {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode left = dummy;
        ListNode right = head;

        while (right != null && n > 0) {
            right = right.next;
            n -= 1;
        }

        while (right != null) {
            left = left.next;
            right = right.next;
        }

        left.next = left.next.next;

        return dummy.next;
    }

    public static void main(String[] args) {
        removeNNodeFromEndRecord input = new removeNNodeFromEndRecord(
                new int[] { 1, 2, 3, 4, 5 },
                2,
                new int[] { 1, 2, 3, 5 });
        removeNNodeFromEnd.testSolution(input);

        input = new removeNNodeFromEndRecord(
                new int[] { 1 },
                1,
                new int[] {});
        removeNNodeFromEnd.testSolution(input);

        input = new removeNNodeFromEndRecord(
                new int[] { 1, 2 },
                1,
                new int[] { 1 });
        removeNNodeFromEnd.testSolution(input);
    }

    private static void testSolution(removeNNodeFromEndRecord input) {
        ListNode l1 = createLinkedList(input.headVals());
        ListNode expected = createLinkedList(input.expectedVals());

        System.out.println("Input: head vals: " + linkedListValueToString(l1));
        System.out.println("\tn: " + input.n());
        System.out.println("Expected vals: " + linkedListValueToString(expected));

        ListNode res = new removeNNodeFromEnd().removeNthFromEnd(l1, input.n());
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
