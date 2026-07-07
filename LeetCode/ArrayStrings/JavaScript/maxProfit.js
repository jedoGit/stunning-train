// You are given an array prices where prices[i] is the price of a given stock on the ith day.

// You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

// Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 5
// Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
// Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
// Example 2:

// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transactions are done and the max profit = 0.

// Constraints:

// 1 <= prices.length <= 105
// 0 <= prices[i] <= 104

// TC: O(n) looping through all the prices
// SC: O(1) In place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaxProfitRecord {
  constructor(prices, expected) {
    this.prices = prices;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} prices
   * @return {number}
   */
  maxProfit(prices) {
    // Initialize the buy price to price at day 0
    // We want to buy when the price is the lowest.
    // Remember we cannot go back in time to buy and sell.
    // At day 0, you have 0 profit
    let buyPrice = prices[0];
    let profit = 0;

    // Looping through the daily prices
    for (let p of prices) {
      // Check if today's price is lower than yesterdays price
      // If so, update your buy price
      if (p < buyPrice) {
        buyPrice = p;
      }

      // Calculate your max profit
      profit = Math.max(p - buyPrice, profit);
    }

    return profit;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.maxProfit([...record.prices]);
  const status = result === record.expected ? Result.PASS : Result.FAIL;

  console.log(`Input: prices = ${JSON.stringify(record.prices)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(status);
}

const records = [
  new MaxProfitRecord([7, 1, 5, 3, 6, 4], 5),
  new MaxProfitRecord([7, 6, 4, 3, 1], 0),
  new MaxProfitRecord([1, 2], 1),
  new MaxProfitRecord([2, 4, 1], 2),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
