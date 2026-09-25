// You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

// Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

// Note:

// You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
// The transaction fee is only charged once for each stock purchase and sale.

// Example 1:

// Input: prices = [1,3,2,8,4,9], fee = 2
// Output: 8
// Explanation: The maximum profit can be achieved by:
// - Buying at prices[0] = 1
// - Selling at prices[3] = 8
// - Buying at prices[4] = 4
// - Selling at prices[5] = 9
// The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
// Example 2:

// Input: prices = [1,3,7,5,10,3], fee = 3
// Output: 6

// Constraints:

// 1 <= prices.length <= 5 * 104
// 1 <= prices[i] < 5 * 104
// 0 <= fee < 5 * 104

// TC: O(n) we loop through the array once
// SC: O(1) in place processing

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MaxProfitWithFeeRecord {
  constructor(prices, fee, expected) {
    this.prices = prices;
    this.fee = fee;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} prices
   * @param {number} fee
   * @return {number}
   */
  maxProfit(prices, fee) {
    // Let's initialize our variables:
    // Cash is the var we use for the max profit if we don't have cash on day 0
    // Hold is the var we use for the max profit if we have cash on day 0, like we bought at day zero. It will be
    // negative initially because technically, we're at a negative in terms of profit.
    let cash = 0;
    let hold = -prices[0];

    // We loop through starting at day 1
    // For each iteration, we save the value of our cash
    // Then we find the max values for our cash and hold variables
    // For cash, we find the max of our current cash and profit ( buy price (hold) - prices[i] - fee)
    // For hold, we find the max of our current buy price (hold) and new buy price (prevCash - price[i])
    for (let i = 1; i < prices.length; i++) {
      let prevCash = cash;
      // We sell if prices[i] - buy price - fee is greater than the last time we sold
      cash = Math.max(cash, hold + prices[i] - fee);
      // We buy if our last profit - current price is greater than the last time we bought.
      // Basically, we want the current prices to be very low to maximize our current profit.
      hold = Math.max(hold, prevCash - prices[i]);
    }

    // This holds our profit
    return cash;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.maxProfit([...record.prices], record.fee);
  const pass = result === record.expected;

  console.log(`Input: prices = ${JSON.stringify(record.prices)}, fee = ${record.fee}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MaxProfitWithFeeRecord([1, 3, 2, 8, 4, 9], 2, 8),
  new MaxProfitWithFeeRecord([1, 3, 7, 5, 10, 3], 3, 6),
  new MaxProfitWithFeeRecord([1, 2, 3, 4, 5], 0, 4),
  new MaxProfitWithFeeRecord([5, 4, 3, 2, 1], 1, 0),
  new MaxProfitWithFeeRecord([1, 5], 1, 3),
  new MaxProfitWithFeeRecord([7], 0, 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
