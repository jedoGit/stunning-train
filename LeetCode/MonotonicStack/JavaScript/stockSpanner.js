// Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

// The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

// For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
// Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
// Implement the StockSpanner class:

// StockSpanner() Initializes the object of the class.
// int next(int price) Returns the span of the stock's price given that today's price is price.

// Example 1:

// Input
// ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
// [[], [100], [80], [60], [70], [60], [75], [85]]
// Output
// [null, 1, 1, 1, 2, 1, 4, 6]

// Explanation
// StockSpanner stockSpanner = new StockSpanner();
// stockSpanner.next(100); // return 1
// stockSpanner.next(80);  // return 1
// stockSpanner.next(60);  // return 1
// stockSpanner.next(70);  // return 2
// stockSpanner.next(60);  // return 1
// stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
// stockSpanner.next(85);  // return 6

// Constraints:

// 1 <= price <= 105
// At most 104 calls will be made to next.

// TC: O(n)
// SC: O(n)

var StockSpanner = function () {
  this.stack = []; // This will hold a pair array [price, span]
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  // Let's initialize the span variable to be 1. This is the default value daily.
  let span = 1;

  // Let's check the stack if it's not empty and if the last element, check the price if it's less than the current price
  // The element in the stack is a pair array [price, span], so we'll check index 0 to check to price. Index 1 is the span value of the pair.
  while (this.stack.length > 0 && this.stack.at(-1)[0] <= price) {
    // We keep popping the top of the stack until the price is greater than the current price
    // Each time we pop, we add the value of the span we extracted from the elements to our span variable
    span += this.stack.at(-1)[1];
    this.stack.pop();
  }

  // We've popped all the elements and/or our the current price is less than what's in the stack,
  // so we push the current price and the span we computed to our stack.
  this.stack.push([price, span]);

  // We return the span we computed for today's price. It will be in the top of the stack and index 1 of that element.
  return this.stack.at(-1)[1];
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
