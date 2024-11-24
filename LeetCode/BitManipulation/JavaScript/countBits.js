// Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

// Example 1:

// Input: n = 2
// Output: [0,1,1]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// Example 2:

// Input: n = 5
// Output: [0,1,1,2,1,2]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101

// Constraints:

// 0 <= n <= 105

// Follow up:

// It is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n) and possibly in a single pass?
// Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?

// TC: O(n) we're creating an array of size n+1 and we need to fill values to that array
// SC: O(n) we're creating an array of size n+1 and we need to fill values to that array

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  // Intuition: This is a DP problem. Example for n = 8
  // n    Binary   1D DP array
  // 0    0000     dp[0]               = 0
  // 1    0001     dp[1] = 1 + dp[n-1] = 1 + 0
  // 2    0010     dp[2] = 1 + dp[n-2] = 1 + 0
  // 3    0011     dp[3] = 1 + dp[n-2] = 1 + 1
  // 4    0100     dp[4] = 1 + dp[n-4] = 1 + 0
  // 5    0101     dp[5] = 1 + dp[n-4] = 1 + 1
  // 6    0110     dp[6] = 1 + dp[n-4] = 1 + 1
  // 7    0111     dp[7] = 1 + dp[n-4] = 1 + 2
  // 8    1000     dp[8] = 1 + dp[n-8] = 1 + 0

  // Every iteration, there is an offset we need to check. The offset is updated when offset*2 === n? offset=n
  // The offset will be all the values 2^n, n = [0,1,2,3...] => offset = [1,2,4,8,16,32...]
  // dp[n] = 1 + dp[n - offset];

  let dp = new Array(n + 1).fill(0);
  let offset = 1;

  for (let i = 1; i < n + 1; i++) {
    if (offset * 2 === i) {
      offset = i;
    }
    dp[i] = 1 + dp[i - offset];
  }
  return dp;
};

// TC: O(nlogn) We loop through 0 through n, but at each value of n, we loop through the number of positions where the MSB is located for that n.
// SC: O(n) because we need to return an array of the count of 1's for each number from 0 to n.

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  // This is using bit manipulation instead of DP. DP will produce an O(n) for TC and SC
  let res = new Array(n + 1).fill(0);

  for (let i = 0; i < n + 1; i++) {
    let temp = i;
    let exit = false;

    // We want to check (n>>1 & 0x1). This will tell us how many ones are in the value n.
    // We want to bit shift right by 1 bit, then bitwise AND by 1 to check the LSB if it's 1.
    // In JS, we can use (n/2) | 0 to bit shift right by 1 bit.

    while (!exit) {
      // console.log(i, temp, temp & 1)
      if (temp & (1 === 1)) {
        res[i] += 1;
      }

      if (temp === 0) {
        exit = true;
        break;
      }

      temp = (temp / 2) | 0;
    }
  }

  // console.log(res)
  return res;
};
