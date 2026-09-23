// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// Find the maximum profit you can achieve. You may complete at most two transactions.

// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:

// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
// Example 2:

// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
// Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.
// Example 3:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

// Constraints:

// 1 <= prices.length <= 105
// 0 <= prices[i] <= 105

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaxProfitIIIRecord {
  constructor(prices, expected) {
    this.prices = prices;
    this.expected = expected;
  }
}

class Solution {
  /**
   * Top-down memoization over (bought, transactions left, position).
   * @param {number[]} prices
   * @return {number}
   */
  maxProfitMem(prices) {
    // This is a 3d array mem[2][3][prices.length]
    // mem[0-true/1-false][bought/sold/skip][stock positions]

    let mem = new Array(2)
      .fill()
      .map(() =>
        new Array(3).fill().map(() => new Array(prices.length).fill(-1))
      );

    // bought 0 - false, 1 - true
    let recursion = (prices, pos, t, bought) => {
      if (pos >= prices.length || t === 0) {
        return 0;
      }

      if (mem[bought][t][pos] !== -1) {
        return mem[bought][t][pos];
      }

      // 3 choices for a position-> buy/sell/skip
      let result = recursion(prices, pos + 1, t, bought); //skip
      if (bought) {
        result = Math.max(
          result,
          recursion(prices, pos + 1, t - 1, 0) + prices[pos]
        ); // Sell
      } else {
        result = Math.max(
          result,
          recursion(prices, pos + 1, t, 1) - prices[pos]
        ); // Buy
      }

      mem[bought][t][pos] = result;

      return result;
    };

    let res = recursion(prices, 0, 2, 0);

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.maxProfitMem(record.prices);
  const pass = result === record.expected;

  console.log(`Input: prices = ${JSON.stringify(record.prices)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MaxProfitIIIRecord([3, 3, 5, 0, 0, 3, 1, 4], 6),
  new MaxProfitIIIRecord([1, 2, 3, 4, 5], 4),
  new MaxProfitIIIRecord([7, 6, 4, 3, 1], 0),
  new MaxProfitIIIRecord([1], 0),
  new MaxProfitIIIRecord([2, 1, 4, 5, 2, 9, 7], 11),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
