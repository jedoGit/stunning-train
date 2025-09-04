package LeetCode.LinkedList.java;

import java.util.Arrays;

class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
        next = null;
    }
}

record hasCycleRecord(int[] headVals, int pos, boolean expected) {
}

public class hasCycle {
    public boolean hasCycleSolution(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }

        return false;
    }

    public static void main(String[] args) {
        hasCycleRecord input = new hasCycleRecord(new int[] { 3, 2, 0, -4 }, 1, true);
        hasCycle.testSolution(input);

        input = new hasCycleRecord(new int[] { 1, 2 }, 0, true);
        hasCycle.testSolution(input);

        input = new hasCycleRecord(new int[] { 1 }, -1, false);
        hasCycle.testSolution(input);
    }

    private static void testSolution(hasCycleRecord input) {
        int arLen = input.headVals().length;
        ListNode[] lNodes = new ListNode[arLen];

        // Create the linked list
        for (int i = 0; i < arLen; i++) {
            lNodes[i] = new ListNode(input.headVals()[i]);
        }

        // Connect the Linked List
        // For the last element in the LL, connect it to the LL in the pointed by the
        // pos value
        for (int i = arLen - 1; i > -1; i--) {
            if (i == arLen - 1) {
                lNodes[i].next = input.pos() != -1 ? lNodes[input.pos()] : null;
            } else {
                lNodes[i].next = lNodes[i + 1];
            }
        }

        System.out.println("Input: head values: " + Arrays.toString(input.headVals()));
        System.out.println("\tpos: " + input.pos());
        System.out.println("Expected: " + input.expected());
        boolean res = new hasCycle().hasCycleSolution(lNodes[0]);
        System.out.println("Result: " + res);
        System.out.println(res == input.expected() ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
