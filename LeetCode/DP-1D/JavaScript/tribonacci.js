// The Tribonacci sequence Tn is defined as follows:

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.

// Example 1:

// Input: n = 4
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
// Example 2:

// Input: n = 25
// Output: 1389537

// Constraints:

// 0 <= n <= 37
// The answer is guaranteed to fit within a 32-bit integer, ie. answer <= 2^31 - 1.

// TC: O(n), we basically do DP n times
// SC: O(1), in place processing

/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  let t = [0, 1, 1];

  if (n < 3) {
    return t[n];
  }

  // We use array deconstruction
  // In javascript, the RHS is always executed first then assigned to the LHS
  // For each iteration perform this:
  // [ t0,  t1, t2 ] = [ t1, t2, sum(t0, t1, t2) ]
  for (let i = 3; i < n + 1; i++) {
    [t[0], t[1], t[2]] = [t[1], t[2], t[0] + t[1] + t[2]];
  }

  return t[2];
};
