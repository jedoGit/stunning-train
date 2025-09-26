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

record addNumbersRecord(int[] headVals1, int[] headVals2, int[] headValsExpected) {
}

class addNumbers {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;

        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            final int v1 = l1 != null ? l1.val : 0;
            final int v2 = l2 != null ? l2.val : 0;

            int val = v1 + v2 + carry;

            carry = (int) Math.floor(val / 10);
            val = val % 10;

            // Create a new node and point cur.next to the new node..
            // Initially, cur points to dummy node, hence, dummy.next = new node
            cur.next = new ListNode(val);
            // Set the cur pointer to the new node
            cur = cur.next;

            // Here, move the l1 and l2 pointers to the next nodes
            l1 = l1 != null ? l1.next : null;
            l2 = l2 != null ? l2.next : null;
        }

        // Here, we set dummy as our first node for the return node.
        // So, dummy.next is the correct head of the returned LL.
        return dummy.next;
    }

    public static void main(String[] args) {
        addNumbersRecord input = new addNumbersRecord(
                new int[] { 2, 4, 3 },
                new int[] { 5, 6, 4 },
                new int[] { 7, 0, 8 });
        addNumbers.testSolution(input);

        input = new addNumbersRecord(
                new int[] { 0 },
                new int[] { 0 },
                new int[] { 0 });
        addNumbers.testSolution(input);

        input = new addNumbersRecord(
                new int[] { 9, 9, 9, 9, 9, 9, 9 },
                new int[] { 9, 9, 9, 9 },
                new int[] { 8, 9, 9, 9, 0, 0, 0, 1 });
        addNumbers.testSolution(input);
    }

    private static void testSolution(addNumbersRecord input) {
        ListNode l1 = createLinkedList(input.headVals1());
        ListNode l2 = createLinkedList(input.headVals2());
        ListNode expected = createLinkedList(input.headValsExpected());

        System.out.println("Input: head1 values: " + linkedListValueToString(l1));
        System.out.println("\thead2 values: " + linkedListValueToString(l2));
        System.out.println("Expected: " + linkedListValueToString(expected));
        ListNode res = new addNumbers().addTwoNumbers(l1, l2);
        System.out.println("Result: " + linkedListValueToString(res));
        System.out.println(validateResult(res, expected) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
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