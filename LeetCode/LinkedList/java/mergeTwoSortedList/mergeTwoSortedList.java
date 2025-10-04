package LeetCode.LinkedList.java.mergeTwoSortedList;

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

record mergeTwoSortedListRecord(int[] headVals1, int[] headVals2, int[] headValsExpected) {
}

class mergeTwoSortedList {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        if (list1 != null) {
            tail.next = list1;
        } else if (list2 != null) {
            tail.next = list2;
        }

        return dummy.next;
    }

    public static void main(String[] args) {
        mergeTwoSortedListRecord input = new mergeTwoSortedListRecord(
                new int[] { 1, 2, 4 },
                new int[] { 1, 3, 4 },
                new int[] { 1, 1, 2, 3, 4, 4 });
        mergeTwoSortedList.testSolution(input);

        input = new mergeTwoSortedListRecord(
                new int[] {},
                new int[] {},
                new int[] {});
        mergeTwoSortedList.testSolution(input);

        input = new mergeTwoSortedListRecord(
                new int[] {},
                new int[] { 0 },
                new int[] { 0 });
        mergeTwoSortedList.testSolution(input);
    }

    private static void testSolution(mergeTwoSortedListRecord input) {
        ListNode l1 = createLinkedList(input.headVals1());
        ListNode l2 = createLinkedList(input.headVals2());
        ListNode expected = createLinkedList(input.headValsExpected());

        System.out.println("Input: head1 values: " + linkedListValueToString(l1));
        System.out.println("\thead2 values: " + linkedListValueToString(l2));
        System.out.println("Expected: " + linkedListValueToString(expected));
        ListNode res = new mergeTwoSortedList().mergeTwoLists(l1, l2);
        System.out.println("Result: " + linkedListValueToString(res));
        System.out.println(validateResult(res, expected) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
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

    private static boolean validateResult(ListNode res, ListNode expected) {
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
}
