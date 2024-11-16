// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

// Only numbers 1 through 9 are used.
// Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

// Example 1:

// Input: k = 3, n = 7
// Output: [[1,2,4]]
// Explanation:
// 1 + 2 + 4 = 7
// There are no other valid combinations.
// Example 2:

// Input: k = 3, n = 9
// Output: [[1,2,6],[1,3,5],[2,3,4]]
// Explanation:
// 1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// There are no other valid combinations.
// Example 3:

// Input: k = 4, n = 1
// Output: []
// Explanation: There are no valid combinations.
// Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

// Constraints:

// 2 <= k <= 9
// 1 <= n <= 60

// TC: O(9!/(k!(9-k)!)), this is the worst case
// SC: O(n)

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  let res = [];

  function backtrack(index, curVals, findVal) {
    // Our base case:
    // 1. If the value we want to find is negative. It needs to be zero.
    // 2. If the size of curVals array is greater than k. We need to find k values only
    if (findVal < 0 || curVals.length > k) return;

    // At each recursion, we check if findVal is zero and the size of the curVals array is k,
    // which means we found the combination of values that will sum up to the value n.
    if (findVal === 0 && curVals.length === k) {
      res.push([...curVals]);
    }

    // We continue with the DFS until we find all the combinations
    // Each time we DFS, we decrement findVal by i and increment index by 1
    // Also, we push i to curVals to include it to the next recursion.
    // After the recursion, we pop the value i to backtrack
    for (let i = index; i <= 9; i++) {
      curVals.push(i);
      backtrack(i + 1, curVals, findVal - i);
      curVals.pop();
    }
  }

  // Our initial input to the backtrack recursion is 1 for the index, an empty array and the value we want to find
  backtrack(1, [], n);

  // We return res after backtracking completes
  return res;
};
