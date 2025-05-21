/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
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
};

let input1 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
let expected1 = 2;
let result1 = uniquePathsWithObstacles([...input1]);
console.log("Input: " + JSON.stringify([...input1]));
console.log("Result: " + result1);
console.log("Expected: " + expected1);
console.log("-".repeat(50));

let input2 = [
  [0, 1],
  [0, 0],
];
let expected2 = 1;
let result2 = uniquePathsWithObstacles([...input2]);
console.log("Input: " + JSON.stringify([...input2]));
console.log("Result: " + result2);
console.log("Expected: " + expected2);
console.log("-".repeat(50));
