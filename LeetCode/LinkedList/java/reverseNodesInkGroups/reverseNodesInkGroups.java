package LeetCode.LinkedList.java.reverseNodesInkGroups;

import java.util.ArrayList;
import java.util.List;

// Definition for singly-linked list.
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

record reverseNodesInkGroupsRecord(int[] headVals, int k, int[] expectedVals) {
}

class reverseNodesInkGroups {
    public ListNode reverseKGroup(ListNode head, int k) {

        ListNode dummy = new ListNode(0, head);
        ListNode groupPrev = dummy;

        while (true) {
            ListNode kth = this.getKth(groupPrev, k);

            if (kth == null) {
                break;
            }

            ListNode groupNext = kth.next;

            ListNode prev = kth.next;
            ListNode cur = groupPrev.next;
            ListNode tmp = null;

            while (cur != groupNext) {
                tmp = cur.next;
                cur.next = prev;
                prev = cur;
                cur = tmp;
            }

            tmp = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmp;
        }

        return dummy.next;

    }

    private ListNode getKth(ListNode cur, int k) {
        while (cur != null && k > 0) {
            cur = cur.next;
            k -= 1;
        }
        return cur;
    }

    public static void main(String[] args) {
        reverseNodesInkGroupsRecord input = new reverseNodesInkGroupsRecord(
                new int[] { 1, 2, 3, 4, 5 },
                2,
                new int[] { 2, 1, 4, 3, 5 });
        reverseNodesInkGroups.testSolution(input);

        input = new reverseNodesInkGroupsRecord(
                new int[] { 1, 2, 3, 4, 5 },
                3,
                new int[] { 3, 2, 1, 4, 5 });
        reverseNodesInkGroups.testSolution(input);
    }

    private static void testSolution(reverseNodesInkGroupsRecord input) {
        ListNode l1 = createLinkedList(input.headVals());
        ListNode expected = createLinkedList(input.expectedVals());

        System.out.println("Input: head vals: " + linkedListValueToString(l1));
        System.out.println("\tk: " + input.k());
        System.out.println("Expected vals: " + linkedListValueToString(expected));

        ListNode res = new reverseNodesInkGroups().reverseKGroup(l1, input.k());
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
