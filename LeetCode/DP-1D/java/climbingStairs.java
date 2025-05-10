
public class climbingStairs {
    public int computeClimbStairs(int n) {
        if (n <= 3)
            return n;

        int prev1 = 3;
        int prev2 = 2;
        int cur = 0;

        for (int i = 3; i < n; i++) {
            cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }

        return cur;
    }

    public static void main(String[] args) {
        int input = 2;
        int expected = 2;
        int result = new climbingStairs().computeClimbStairs(input);

        System.out.println("-".repeat(50));
        System.out.println("Input: " + input);
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);

        input = 3;
        expected = 3;
        result = new climbingStairs().computeClimbStairs(input);

        System.out.println("-".repeat(50));
        System.out.println("Input: " + input);
        System.out.println("Result: " + result);
        System.out.println("Expected: " + expected);
    }
}