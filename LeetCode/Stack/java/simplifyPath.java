package LeetCode.Stack.java;

import java.util.Stack;

record simplifyPathRecord(String path, String expected) {
}

public class simplifyPath {
    public String simplifyPathSolution(String path) {
        Stack<String> stack = new Stack<>();
        StringBuilder sb = new StringBuilder("");

        for (char c : (path + "/").toCharArray()) {

            if (c == '/') {
                if (sb.toString().equals("..")) {

                    if (!stack.isEmpty()) {
                        stack.pop();
                    }
                } else if (!sb.toString().equals("")
                        && !sb.toString().equals(".")) {

                    stack.push(sb.toString());
                }
                sb = new StringBuilder("");
            } else {
                sb.append(String.valueOf(c));
            }
        }

        return "/" + String.join("/", stack);
    }

    public static void main(String[] args) {
        simplifyPathRecord input = new simplifyPathRecord("/home/", "/home");
        simplifyPath.testSolution(input);

        input = new simplifyPathRecord("/home//foo/", "/home/foo");
        simplifyPath.testSolution(input);

        input = new simplifyPathRecord("/home/user/Documents/../Pictures", "/home/user/Pictures");
        simplifyPath.testSolution(input);

        input = new simplifyPathRecord("/../", "/");
        simplifyPath.testSolution(input);

        input = new simplifyPathRecord("/.../a/../b/c/../d/./", "/.../b/d");
        simplifyPath.testSolution(input);
    }

    private static void testSolution(simplifyPathRecord input) {
        System.out.println("Input: path: " + input.path());
        System.out.println("Expected: " + input.expected());
        String res = new simplifyPath().simplifyPathSolution(input.path());
        System.out.println("Result: " + res);
        System.out.println(res.equals(input.expected()) ? "PASS" : "FAIL");
        System.out.println("-".repeat(50));
    }
}
