// You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

// Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:

// Input: k = 2, prices = [2,4,1]
// Output: 2
// Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
// Example 2:

// Input: k = 2, prices = [3,2,6,5,0,3]
// Output: 7
// Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

// Constraints:

// 1 <= k <= 100
// 1 <= prices.length <= 1000
// 0 <= prices[i] <= 1000

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaxProfitIVRecord {
  constructor(k, prices, expected) {
    this.k = k;
    this.prices = prices;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number} k
   * @param {number[]} prices
   * @return {number}
   */
  maxProfit(k, prices) {
    if (!prices) return 0;

    let N = prices.length;
    let dp = Array(N).fill(0);

    // if (k > N) {
    //   return Array.from({ length: N }, (_, i) => i + 1) // generate array of values of i starting at 1 to N-1
    //     .map((i) => prices[i] - prices[i - 1]) // Map i to prices[i] - prices[i-1]
    //     .filter((p) => p > 0) // filter these prices values that are positive only
    //     .reduce((a, b) => a + b, 0); // sum all the prices
    // }

    for (let t = 0; t < k; t += 1) {
      let pos = -1 * prices[0];
      let profit = 0;
      for (let i = 1; i < N; i += 1) {
        pos = Math.max(pos, dp[i] - prices[i]);
        profit = Math.max(profit, pos + prices[i]);
        dp[i] = profit;
      }
    }

    return dp[N - 1];
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.maxProfit(record.k, [...record.prices]);
  const pass = result === record.expected;

  console.log(`Input: k = ${record.k}, prices = ${JSON.stringify(record.prices)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MaxProfitIVRecord(2, [2, 4, 1], 2),
  new MaxProfitIVRecord(2, [3, 2, 6, 5, 0, 3], 7),
  new MaxProfitIVRecord(1, [3, 2, 6, 5, 0, 3], 4),
  new MaxProfitIVRecord(2, [1, 2, 3, 4, 5], 4),
  new MaxProfitIVRecord(2, [7, 6, 4, 3, 1], 0),
  new MaxProfitIVRecord(5, [3, 2, 6, 5, 0, 3], 7),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
