// Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

// You may return the answer in any order.

// Example 1:

// Input: n = 4, k = 2
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
// Explanation: There are 4 choose 2 = 6 total combinations.
// Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
// Example 2:

// Input: n = 1, k = 1
// Output: [[1]]
// Explanation: There is 1 choose 1 = 1 total combination.

// Constraints:

// 1 <= n <= 20
// 1 <= k <= n

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  // For example, n = 4, k = 2
  //                            1                         2                            3
  //                         2  3  4                    3   4                          4
  // so, [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]. No reuse: [1,2] and [2,1] is the same combination
  //
  // For combination, order does not matter. [1,2] is the same as [2,1]. So, we only add one of them in our result.
  //

  let res = [];
  let comb = [];

  function backtrack(start) {
    // Check if the combination we have has the correct length k we're looking for
    if (comb.length === k) {
      res.push([...comb]);
      return;
    }

    // Build the combinations from the set of number n starting from number start.
    for (let i = start; i <= n; i += 1) {
      comb.push(i);
      backtrack(i + 1);
      comb.pop();
    }
  }

  // Call the backtrack function starting from number 1.
  backtrack(1);

  return res;
};
