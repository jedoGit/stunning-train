/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  let s1_len = s1.length;
  let s2_len = s2.length;
  let s3_len = s3.length;

  if (s1_len + s2_len !== s3_len) return false;

  let dp = new Array(s1_len + 1)
    .fill()
    .map(() => new Array(s2_len + 1).fill(false));

  dp[s1_len][s2_len] = true;

  //   console.log(dp);

  for (let i of Array.from({ length: s1_len + 1 }, (_, i) => s1_len - i)) {
    // console.log(i);
    for (let j of Array.from({ length: s2_len + 1 }, (_, j) => s2_len - j)) {
      //   console.log(j);
      if (i < s1_len && s1[i] === s3[i + j] && dp[i + 1][j]) {
        dp[i][j] = true;
      }
      if (j < s2_len && s2[j] === s3[i + j] && dp[i][j + 1]) {
        dp[i][j] = true;
      }
    }
    // console.log("-----------");
  }

  return dp[0][0];
};

let input1 = { s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac" };
let expected1 = "True";
let result1 = isInterleave(input1["s1"], input1["s2"], input1["s3"]);
console.log(
  "Input: " +
    Object.keys(input1)[0] +
    ": " +
    input1["s1"] +
    ", " +
    Object.keys(input1)[1] +
    ": " +
    input1["s2"] +
    ", " +
    Object.keys(input1)[2] +
    ": " +
    input1["s3"]
);
console.log("Result: " + result1);
console.log("Expected: " + expected1);
console.log("-".repeat(50));

let input2 = { s1: "aabcc", s2: "dbbca", s3: "aadbbbaccc" };
let expected2 = "False";
let result2 = isInterleave(input2["s1"], input2["s2"], input2["s3"]);
console.log(
  "Input: " +
    Object.keys(input2)[0] +
    ": " +
    input2["s1"] +
    ", " +
    Object.keys(input2)[1] +
    ": " +
    input2["s2"] +
    ", " +
    Object.keys(input2)[2] +
    ": " +
    input2["s3"]
);
console.log("Result: " + result2);
console.log("Expected: " + expected2);
console.log("-".repeat(50));

let input3 = { s1: "", s2: "", s3: "" };
let expected3 = "True";
let result3 = isInterleave(input3["s1"], input3["s2"], input3["s3"]);
console.log(
  "Input: " +
    Object.keys(input3)[0] +
    ": " +
    input3["s1"] +
    ", " +
    Object.keys(input3)[1] +
    ": " +
    input3["s2"] +
    ", " +
    Object.keys(input3)[2] +
    ": " +
    input3["s3"]
);
console.log("Result: " + result3);
console.log("Expected: " + expected3);
console.log("-".repeat(50));
