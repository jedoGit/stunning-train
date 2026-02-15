package LeetCode.LinkedList.java.mergeSortList;

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

record mergeSortListRecord(int[] head, int[] expected) {
}

class mergeSortList {
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode mid = this.findMid(head);
        ListNode r = mid.next;

        mid.next = null;

        ListNode l = this.sortList(head);
        r = this.sortList(r);

        return this.mergeList(l, r);
    }

    private ListNode mergeList(ListNode l, ListNode r) {
        ListNode dummy = new ListNode();
        ListNode tmp = dummy;

        while (l != null && r != null) {
            if (l.val < r.val) {
                tmp.next = l;
                l = l.next;
            } else {
                tmp.next = r;
                r = r.next;
            }

            tmp = tmp.next;
        }

        // if either l or r is not null, return either 1.
        // if both l and r are null, then set tmp.next to null
        tmp.next = (l != null) ? l : (r != null) ? r : null;

        // if (l != null) {
        // tmp.next = l;
        // } else if (r != null) {
        // tmp.next = r;
        // }

        return dummy.next;
    }

    private ListNode findMid(ListNode root) {
        ListNode slow = root;
        ListNode fast = root.next;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }

    public static void main(String[] args) {
        mergeSortListRecord[] records = new mergeSortListRecord[] {
                new mergeSortListRecord(new int[] { 4, 2, 1, 3 }, new int[] { 1, 2, 3, 4 }),
                new mergeSortListRecord(new int[] { -1, 5, 3, 4, 0 }, new int[] { -1, 0, 3, 4, 5 }),
                new mergeSortListRecord(new int[] {}, new int[] {})
        };

        int i = 1;
        for (mergeSortListRecord record : records) {
            System.out.println("# Test case " + i++);
            mergeSortList.testSolution(record);
            System.out.println("-".repeat(50));
        }
    }

    private static void testSolution(mergeSortListRecord record) {
        ListNode l1Head = mergeSortList.createLinkedList(record.head());
        ListNode expectedHead = mergeSortList.createLinkedList(record.expected());

        System.out.println("input: head: " + mergeSortList.linkedListValueToString(l1Head));
        System.out.println("expected: " + mergeSortList.linkedListValueToString(expectedHead));

        ListNode resHead = new mergeSortList().sortList(l1Head);

        System.out.println("result: " + mergeSortList.linkedListValueToString(resHead));
        System.out.println(mergeSortList.validateResult(resHead, expectedHead) ? testResult.PASS.getValue()
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
