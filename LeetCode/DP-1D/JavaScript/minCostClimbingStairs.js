// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

// You can either start from the step with index 0, or the step with index 1.

// Return the minimum cost to reach the top of the floor.

// Example 1:

// Input: cost = [10,15,20]
// Output: 15
// Explanation: You will start at index 1.
// - Pay 15 and climb two steps to reach the top.
// The total cost is 15.
// Example 2:

// Input: cost = [1,100,1,1,1,100,1,1,100,1]
// Output: 6
// Explanation: You will start at index 0.
// - Pay 1 and climb two steps to reach index 2.
// - Pay 1 and climb two steps to reach index 4.
// - Pay 1 and climb two steps to reach index 6.
// - Pay 1 and climb one step to reach index 7.
// - Pay 1 and climb two steps to reach index 9.
// - Pay 1 and climb one step to reach the top.
// The total cost is 6.

// Constraints:

// 2 <= cost.length <= 1000
// 0 <= cost[i] <= 999

// TC: O(n), because we're doing bottoms-up DP, we eliminated some repetitions. By just doing bruteforce DFS, it would be O(2^n). Need a decision tree to visualize
// SC: O(n), because we're doing bottoms-up DP, we eliminated some repetitions. By just doing bruteforce DFS, it would be O(2^n). Need a decision tree to visualize

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  // Append a 0 cost value on the end of the cost array. This represents the top floor
  cost.push(0);

  const m = cost.length;

  // From here, we now have a cost array with size m=n+1. Since, we can do 1 or 2 steps, we'll compute the min
  // cost from the m-3 index and update the value on that index. Hence: cost[m-3] = min( cost[m-3] + cost[m-2], cost[m-3] + cost[m-1] )
  // To help visualize, need to draw a decision tree. From index zero, you can hop 1 or two steps. Each step will incur a cost.

  let i = m - 3;

  while (i > -1) {
    cost[i] += Math.min(cost[i + 1], cost[i + 2]);
    i--;
  }

  return Math.min(cost[0], cost[1]);
};
