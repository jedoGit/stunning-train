/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  let dp = Array(triangle.length + 1).fill(0);

  for (let row of triangle.reverse()) {
    for (let i of Array.from({ length: row.length }, (_, i) => i)) {
      dp[i] = row[i] + Math.min(dp[i], dp[i + 1]);
    }
  }

  return dp[0];
};

let input1 = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]];
let expected1 = 11;
let result1 = minimumTotal([...input1]);
console.log("Input: " + JSON.stringify([...input1]));
console.log("Result: " + result1);
console.log("Expected: " + expected1);
console.log("-".repeat(50));

let input2 = [[-10]];
let expected2 = -10;
let result2 = minimumTotal([...input2]);
console.log("Input: " + JSON.stringify([...input2]));
console.log("Result: " + result2);
console.log("Expected: " + expected2);
console.log("-".repeat(50));

let input3 = [[-1], [2, 3], [1, -1, -1]];
let expected3 = 0;
let result3 = minimumTotal([...input3]);
console.log("Input: " + JSON.stringify([...input3]));
console.log("Result: " + result3);
console.log("Expected: " + expected3);
console.log("-".repeat(50));
