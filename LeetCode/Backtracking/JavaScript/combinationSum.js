// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

// Example 1:

// Input: candidates = [2,3,6,7], target = 7
// Output: [[2,2,3],[7]]
// Explanation:
// 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
// 7 is a candidate, and 7 = 7.
// These are the only two combinations.
// Example 2:

// Input: candidates = [2,3,5], target = 8
// Output: [[2,2,2,2],[2,3,3],[3,5]]
// Example 3:

// Input: candidates = [2], target = 1
// Output: []

// Constraints:

// 1 <= candidates.length <= 30
// 2 <= candidates[i] <= 40
// All elements of candidates are distinct.
// 1 <= target <= 40

// TC:
// SC:

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class CombinationSumRecord {
  constructor(candidates, target, expected) {
    this.candidates = candidates;
    this.target = target;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[]} candidates
   * @param {number} target
   * @return {number[][]}
   */
  combinationSum(candidates, target) {
    // For example, candidates = [2,3,6,7], target = 7
    //                            2                         3                            6                             7
    //                      2   3   6   7               3   6   7                      6   7                           7
    //                2   3   6   7                 3   6   7
    //          2   3   6   7
    // so, [[2,2,3],[7]]
    // 2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
    // 7 is a candidate, and 7 = 7.
    // These are the only two combinations.
    //

    let res = [];

    // helper function to dfs and backtrack through a path and check if sum of the path is equal to target.
    // If equal, add to res array.
    // If greater than, return, pop current comb and backtrack.
    // If less than continue and push next index.
    function backtrack(start, curSum, path) {
      // test if curSum is equal to target
      if (curSum === target) {
        res.push([...path]);
        return;
      }

      if (curSum > target) {
        return;
      }

      // if curSum < target, continue below

      for (let i = start; i < candidates.length; i++) {
        curSum += candidates[i];
        path.push(candidates[i]);

        // We don't want to reuse a number, so after we're done with current level, we go to the next index i
        backtrack(i, curSum, path);

        curSum -= candidates[i];
        path.pop();
      }

      return;
    }

    // Call backtrack with empty comb array as input input
    backtrack(0, 0, []);

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.combinationSum([...record.candidates], record.target);
  const pass = JSON.stringify(result) === JSON.stringify(record.expected);

  console.log(
    `Input: candidates = ${JSON.stringify(record.candidates)}, target = ${record.target}`
  );
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new CombinationSumRecord([2, 3, 6, 7], 7, [[2, 2, 3], [7]]),
  new CombinationSumRecord([2, 3, 5], 8, [
    [2, 2, 2, 2],
    [2, 3, 3],
    [3, 5],
  ]),
  new CombinationSumRecord([2], 1, []),
  new CombinationSumRecord([2, 3, 5], 5, [[2, 3], [5]]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
