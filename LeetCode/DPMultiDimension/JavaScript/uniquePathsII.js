const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class UniquePathsWithObstaclesRecord {
  constructor(obstacleGrid, expected) {
    this.obstacleGrid = obstacleGrid;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {number[][]} obstacleGrid
   * @return {number}
   */
  uniquePathsWithObstacles(obstacleGrid) {
    let M = obstacleGrid.length;
    let N = obstacleGrid[0].length;

    let dp = new Array(N).fill(0);

    dp[N - 1] = 1;

    // Bottoms up DP
    for (let r of Array.from({ length: M }, (_, i) => i).reverse()) {
      for (let c of Array.from({ length: N }, (_, i) => i).reverse()) {
        if (obstacleGrid[r][c] === 1) {
          dp[c] = 0;
        } else if (c + 1 < N) {
          // Check if we're out of bounds
          dp[c] = dp[c] + dp[c + 1];
        }
      }
    }

    return dp[0];
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.uniquePathsWithObstacles(
    record.obstacleGrid.map((row) => [...row])
  );
  const pass = result === record.expected;

  console.log(`Input: obstacleGrid = ${JSON.stringify(record.obstacleGrid)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new UniquePathsWithObstaclesRecord(
    [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    2
  ),
  new UniquePathsWithObstaclesRecord(
    [
      [0, 1],
      [0, 0],
    ],
    1
  ),
  new UniquePathsWithObstaclesRecord([[0]], 1),
  new UniquePathsWithObstaclesRecord([[1]], 0),
  new UniquePathsWithObstaclesRecord(
    [
      [0, 0],
      [0, 1],
    ],
    0
  ),
  new UniquePathsWithObstaclesRecord(
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    6
  ),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
