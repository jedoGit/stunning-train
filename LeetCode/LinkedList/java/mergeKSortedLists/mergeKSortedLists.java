package LeetCode.LinkedList.java.mergeKSortedLists;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//   Definition for singly-linked list.
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

record mergeKListsRecord(int[][] lists, int[] expected) {
}

public class mergeKSortedLists {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length < 1) {
            return null;
        }

        List<ListNode> nodeList = new ArrayList<>(Arrays.asList(lists));

        while (nodeList.size() > 1) {
            ListNode l1 = nodeList.removeFirst();
            ListNode l2 = nodeList.removeFirst();

            ListNode newHead = this.mergeKLists(l1, l2);

            nodeList.addLast(newHead);
        }

        return nodeList.get(0);
    }

    private ListNode mergeKLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode();
        ListNode tmp = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                tmp.next = l1;
                l1 = l1.next;
            } else {
                tmp.next = l2;
                l2 = l2.next;
            }
            tmp = tmp.next;
        }

        tmp.next = l1 != null ? l1 : l2;

        return dummy.next;
    }

    public static void main(String[] args) {
        mergeKListsRecord[] records = new mergeKListsRecord[] {
                new mergeKListsRecord(new int[][] { { 1, 4, 5 }, { 1, 3, 4 }, { 2, 6 } },
                        new int[] { 1, 1, 2, 3, 4, 4, 5, 6 }),
                new mergeKListsRecord(new int[][] {}, new int[] {}),
                new mergeKListsRecord(new int[][] { {} }, new int[] {}),
        };

        int i = 1;
        for (mergeKListsRecord record : records) {
            System.out.println("# Test case " + i++);
            mergeKSortedLists.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(mergeKListsRecord record) {
        // Create the list of LL for the inpue
        ListNode[] inputLLArr = new ListNode[record.lists().length];

        for (int i = 0; i < record.lists().length; i++) {
            inputLLArr[i] = mergeKSortedLists.createLinkedList(record.lists()[i]);
        }

        // Print the LL
        System.out.print("input: lists: [");
        int i = 0;
        for (ListNode n : inputLLArr) {
            String endVal = ", ";
            if (i == inputLLArr.length - 1) {
                endVal = "";
            }
            System.out.print(mergeKSortedLists.linkedListValueToString(n) + endVal);
            i++;
        }
        System.out.println("]");

        ListNode expectedLL = mergeKSortedLists.createLinkedList(record.expected());
        System.out.println("expected: " + mergeKSortedLists.linkedListValueToString(expectedLL));

        // Call the mergeKLists()
        ListNode resultLL = new mergeKSortedLists().mergeKLists(inputLLArr);

        System.out.println("result: " + mergeKSortedLists.linkedListValueToString(resultLL));
        System.out.println(mergeKSortedLists.validateResult(resultLL, expectedLL) ? testResult.PASS.getValue()
                : testResult.FAIL.getValue());
    }

    private static boolean validateResult(ListNode resHead, ListNode expectedHead) {
        ListNode cur1 = resHead;
        ListNode cur2 = expectedHead;

        while (cur1 != null && cur2 != null) {
            if (cur1.val != cur2.val) {
                return false;
            }
            cur1 = cur1.next;
            cur2 = cur2.next;
        }

        // If we've exited the while loop, it means one or both of the node is None.
        // We need to check that both are None, which means both LL are the same
        return cur1 == null && cur2 == null;
    }

    private static String linkedListValueToString(ListNode node) {
        if (node == null) {
            return "[ ]";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[ ");

        while (node != null) {
            sb.append(String.valueOf(node.val));
            sb.append(", ");
            node = node.next;
        }

        // Let's remove the last comma added
        if (sb.length() > 0) {
            sb.setLength(sb.length() - 2);
        }

        sb.append(" ]");

        return sb.toString();
    }

    private static ListNode createLinkedList(int[] head) {
        int headLen = head.length;

        if (headLen < 1) {
            return null;
        }

        ListNode[] nodeList = new ListNode[headLen];

        for (int i = 0; i < headLen; i++) {
            nodeList[i] = new ListNode(head[i]);

            // If this is not the first or last node, connect the node[i-1].next to node[i]
            if (i > 0) {
                nodeList[i - 1].next = nodeList[i];
            }

            // If this is the last node, connect to null
            if (i == headLen - 1) {
                nodeList[i].next = null;
            }
        }

        return nodeList[0];
    }
}
