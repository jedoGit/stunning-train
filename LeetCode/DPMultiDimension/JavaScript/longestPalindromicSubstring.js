/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let n = s.length;
  let maxLen = 0;
  let ansLeft = 0;

  if (n === 0) return "";

  let dp = new Array(n).fill(null).map(() => new Array(n).fill(false));

  //   console.log(dp);

  for (let i of Array.from({ length: n }, (_, i) => n - 1 - i)) {
    // console.log(i);
    for (let j of Array.from({ length: n - i }, (_, ii) => i + ii)) {
      //   console.log(j);
      if (i === j) {
        dp[i][j] = true;
      } else {
        if (j === i + 1) {
          dp[i][j] = s[i] === s[j];
        } else {
          dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
        }
      }
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        ansLeft = i;
      }
    }
    // console.log("===============");
  }

  //   console.log(dp);

  return s.substring(ansLeft, ansLeft + maxLen);
};

let input1 = "babad";
let expected1 = "bab or aba";
let result1 = longestPalindrome(input1);
console.log("Input: " + input1);
console.log("Result: " + result1);
console.log("Expected: " + expected1);
console.log("-".repeat(50));

let input2 = "cbbd";
let expected2 = "bb";
let result2 = longestPalindrome(input2);
console.log("Input: " + input2);
console.log("Result: " + result2);
console.log("Expected: " + expected2);
console.log("-".repeat(50));
