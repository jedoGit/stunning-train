// An array A consisting of N integers is given. It contains daily prices of a stock share for a period of N consecutive days. If a single share was bought on day P and sold on day Q, where 0 ≤ P ≤ Q < N, then the profit of such transaction is equal to A[Q] - A[P], provided that A[Q] ≥ A[P]. Otherwise, the transaction brings loss of A[P] - A[Q].

// For example, consider the following array A consisting of six elements such that:

//   A[0] = 23171
//   A[1] = 21011
//   A[2] = 21123
//   A[3] = 21366
//   A[4] = 21013
//   A[5] = 21367
// If a share was bought on day 0 and sold on day 2, a loss of 2048 would occur because A[2] - A[0] = 21123 - 23171 = -2048. If a share was bought on day 4 and sold on day 5, a profit of 354 would occur because A[5] - A[4] = 21367 - 21013 = 354. Maximum possible profit was 356. It would occur if a share was bought on day 1 and sold on day 5.

// Write a function,

// function solution(A);

// that, given an array A consisting of N integers containing daily prices of a stock share for a period of N consecutive days, returns the maximum possible profit from one transaction during this period. The function should return 0 if it was impossible to gain any profit.

// For example, given array A consisting of six elements such that:

//   A[0] = 23171
//   A[1] = 21011
//   A[2] = 21123
//   A[3] = 21366
//   A[4] = 21013
//   A[5] = 21367
// the function should return 356, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..400,000];
// each element of array A is an integer within the range [0..200,000].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(n) we visit each elements of the array
// SC: O(1) in place processing

function solution(A) {
  // Implement your solution here
  // What we need to do is at every iteration,
  // 1. Keep track of the min stock price, then,
  // 2. Compute the maximum profit (current price - min price) and update the max profit

  let minBuyPrice = 2000001; // This is the max value an element can have + 1
  let maxProfit = 0;

  for (let i = 0; i < A.length; i += 1) {
    // Let's update to the new min price we saw
    minBuyPrice = Math.min(minBuyPrice, A[i]);

    // Let's compute the profit base on the most update min price and the current price
    maxProfit = Math.max(A[i] - minBuyPrice, maxProfit);
  }

  // At this point, we checked all the prices and computed the max profit

  // console.log(maxProfit)

  return maxProfit;
}
