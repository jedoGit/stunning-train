package LeetCode.LinkedList.java;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

record copyListRandomPointerRecord(List<intStrPairRecord> headVals, List<intStrPairRecord> expectedHeadVals) {
}

record intStrPairRecord(int val, String randomStr) {
}

class copyListRandomPointer {
    public Node copyRandomList(Node head) {
        Map<Node, Node> oldToCopy = new HashMap<>();

        Node cur = head;

        while (cur != null) {
            oldToCopy.put(cur, new Node(cur.val));
            cur = cur.next;
        }

        cur = head;

        while (cur != null) {
            Node copy = oldToCopy.get(cur);

            copy.next = oldToCopy.get(cur.next);
            copy.random = oldToCopy.get(cur.random);

            cur = cur.next;
        }

        return oldToCopy.get(head);
    }

    public static void main(String[] args) {
        copyListRandomPointerRecord input = new copyListRandomPointerRecord(
                List.of(new intStrPairRecord(7, "null"),
                        new intStrPairRecord(13, "0"),
                        new intStrPairRecord(11, "4"),
                        new intStrPairRecord(10, "2"),
                        new intStrPairRecord(1, "0")),
                List.of(new intStrPairRecord(7, "null"),
                        new intStrPairRecord(13, "0"),
                        new intStrPairRecord(11, "4"),
                        new intStrPairRecord(10, "2"),
                        new intStrPairRecord(1, "0")));
        copyListRandomPointer.testSolution(input);

        input = new copyListRandomPointerRecord(
                List.of(new intStrPairRecord(1, "1"),
                        new intStrPairRecord(2, "1")),
                List.of(new intStrPairRecord(1, "1"),
                        new intStrPairRecord(2, "1")));
        copyListRandomPointer.testSolution(input);

        input = new copyListRandomPointerRecord(
                List.of(new intStrPairRecord(3, "null"),
                        new intStrPairRecord(3, "0"),
                        new intStrPairRecord(3, "null")),
                List.of(new intStrPairRecord(3, "null"),
                        new intStrPairRecord(3, "0"),
                        new intStrPairRecord(3, "null")));
        copyListRandomPointer.testSolution(input);
    }

    private static void testSolution(copyListRandomPointerRecord input) {
        Node l1 = copyListRandomPointer.createLinkedList(input.headVals());
        Node expected = copyListRandomPointer.createLinkedList(input.expectedHeadVals());

        System.out.println(
                "Input head1 array [val, index]: " + copyListRandomPointer.intStrPairToString(input.headVals()));
        System.out.println("Input LL [val, random.val]: " + copyListRandomPointer.linkedListValueToString(l1));
        System.out.println(
                "Expected array [val, index]: " + copyListRandomPointer.intStrPairToString(input.expectedHeadVals()));
        System.out.println("Expected LL [val, random.val]: " + copyListRandomPointer.linkedListValueToString(expected));

        Node res = new copyListRandomPointer().copyRandomList(l1);

        System.out.println("Result LL [val, random.val]: " + copyListRandomPointer.linkedListValueToString(res));
        System.out.println(copyListRandomPointer.validateResult(res, expected) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }

    private static boolean validateResult(Node res, Node expected) {
        if (res == null && expected == null) {
            return true;
        }

        while (res != null && expected != null) {
            String resRandomVal = res.random == null ? "null" : Integer.toString(res.random.val);
            String expectedRandomVal = expected.random == null ? "null" : Integer.toString(expected.random.val);

            if (res.val != expected.val) {
                return false;
            }

            if (!resRandomVal.equals(expectedRandomVal)) {
                return false;
            }

            res = res.next;
            expected = expected.next;
        }

        return true;
    }

    private static String intStrPairToString(List<intStrPairRecord> headVals) {
        StringBuilder sb = new StringBuilder();

        sb.append("[ ");

        for (intStrPairRecord i : headVals) {
            sb.append("[ ");
            sb.append(Integer.toString(i.val()) + ", ");
            sb.append(i.randomStr());
            sb.append(" ], ");
        }

        // Let's remove the last comma added
        if (sb.length() > 0) {
            sb.setLength(sb.length() - 2);
        }

        sb.append(" ]");

        return sb.toString();
    }

    private static String linkedListValueToString(Node ll) {
        StringBuilder sb = new StringBuilder();

        sb.append("[ ");

        while (ll != null) {
            sb.append("[ ");
            sb.append(Integer.toString(ll.val) + ", ");
            sb.append(ll.random == null ? "null" : Integer.toString(ll.random.val));
            // sb.append(ll.random == null ? "null" : String.valueOf(ll.random));
            sb.append(" ], ");

            ll = ll.next;
        }

        // Let's remove the last comma added
        if (sb.length() > 0) {
            sb.setLength(sb.length() - 2);
        }

        sb.append(" ]");

        return sb.toString();
    }

    private static Node createLinkedList(List<intStrPairRecord> headVals) {
        int listLen = headVals.size();

        Node[] lNodeArr = new Node[listLen];

        for (int i = 0; i < listLen; i++) {
            lNodeArr[i] = new Node(headVals.get(i).val());

            if (i > 0) {
                lNodeArr[i - 1].next = lNodeArr[i];
            }

            if (i == listLen - 1) {
                lNodeArr[i].next = null;
            }
        }

        for (int i = 0; i < listLen; i++) {
            lNodeArr[i].random = headVals.get(i).randomStr().equals("null") ? null
                    : lNodeArr[Integer.valueOf(headVals.get(i).randomStr())];
        }

        return lNodeArr[0];
    }
}
