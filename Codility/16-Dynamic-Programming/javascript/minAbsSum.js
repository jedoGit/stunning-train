// For a given array A of N integers and a sequence S of N integers from the set {−1, 1}, we define val(A, S) as follows:

// val(A, S) = |sum{ A[i]*S[i] for i = 0..N−1 }|

// (Assume that the sum of zero elements equals zero.)

// For a given array A, we are looking for such a sequence S that minimizes val(A,S).

// Write a function:

// class Solution { public int solution(int[] A); }

// that, given an array A of N integers, compute the minimum value of val(A,S) from all possible values of A for all possible sequences S of N integers from the set {−1, 1}.

// For example, given array:

//   A[0] =  1
//   A[1] =  5
//   A[2] =  2
//   A[3] = -2
// your function should return 0, since for S = [−1, 1, −1, 1], val(A, S) = 0, which is the minimum possible value.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..20,000];
// each element of array A is an integer within the range [−100..100].

// Using DP Top-Down approach... But this did not work. IDK why

// [1, 5, 2, -2];

// [-1, 5, -2, -2];
// dp[0] = 0
// dp[1] = min(sum of dp[0] and A[1] and S)
// [-dp[0], -1] 1
// [-dp[0], 1] 1
// [dp[0], -1] 1
// [dp[0], 1] 1

// dp[2]=
// [dp[1], -5] 4
// [dp[1],5] 6
// [-dp[1], -5] 6
// [-dp[1], 5] 4

// dp[3]
// [dp[2], A[3]] * [-1,1,-1,1]

function minAbsSum_A(A) {
  // Using top-down DP
  // Compute the minimun absolute sum for each step of the dynamic programming and save to the array dp
  // For each iteration, use the previous value of dp and current element of A together with the set S, to find the min abs value
  // At the end of the loop, which is when he hit the end of the array A, our min absolution sum is the last element of the array dp

  if (A === undefined) return 0;
  if (A.length === 0) return 0;

  let dp = [];

  dp[0] = A[0];

  // Fill the values for our dp elements
  //   console.log(dp[0]);
  for (let i = 1; i < A.length; i += 1) {
    dp[i] = Math.min(
      Math.abs(-1 * dp[i - 1] + -1 * A[i]),
      Math.abs(-1 * dp[i - 1] + A[i]),
      Math.abs(dp[i - 1] + -1 * A[i]),
      Math.abs(dp[i - 1] + A[i])
    );
    // console.log(dp[i]);
  }

  return dp[dp.length - 1];
}

// Using DP Bottom-Up, This works also IDK why

function minAbsSum_B(A) {
  // Implement your solution here
  if (A.length === 0) return 0;
  if (A.length === 1) return A[0];

  // Compute the sum and the max element value
  let sum = 0;
  let max = A[0];
  for (let i = 0; i < A.length; i += 1) {
    A[i] = Math.abs(A[i]);
    sum += A[i];
    max = Math.max(A[i], max);
  }

  // console.log("sum: ", sum)
  // console.log("max: ", max)

  // Count the number of occurence of each elements in A
  let count = new Array(max + 1);
  for (let n of A) {
    // console.log(n)
    if (!count[n]) {
      count[n] = 0;
    }

    count[n] += 1;
  }

  // console.log("count: ", count)

  // Create and initialize the dp array
  let dp = new Array(sum + 1).fill(-1);

  // console.log("dp init val: ", dp)

  dp[0] = 0;

  // Fill the dp array
  for (let i = 0; i <= max; i += 1) {
    if (count[i] > 0) {
      for (let val = 0; val <= sum; val += 1) {
        // console.log("dp[val] before: ",i, val, dp[val])
        if (dp[val] >= 0) {
          dp[val] = count[i];
        } else if (val >= i && dp[val - i] > 0) {
          dp[val] = dp[val - i] - 1;
        }
        // console.log("dp[val] after: ",i, val, dp[val])
      }
    }
  }

  //   console.log("dp: ", dp);

  // Peform bottoms up DP
  let res = sum;
  for (let i = 0; i <= sum / 2; i += 1) {
    if (dp[i] >= 0) {
      res = Math.min(res, sum - 2 * i);
    }
  }

  return res;
}

// Using Backtracking, This works, but timed out in Codility, only 54% total score, Failed on all the performance test

//                                       123
//     0                        1                  -1
//     1                    2      -2           2      -2
//     2                  3  -3   3  -3       3  -3   3  -3
//                        6   0   2  -4       4  -2   0  -6
//                        6   0   2   4       4   2   0   6
//                                     1,5,2,-2
//                                1                                                      -1
//                      5                 -5                                    5                 -5
//                 2        -2        2        -2                          2        -2        2        -2
//            -2      2  -2     2  2    -2  2      -2                 -2      2  -2     2  2    -2  2      -2
//             6     10   2     6  0    -4 -4      -8                  4      8   0     4 -2    -6 -6      -10
//             6     10   2     6  0     4  4       8                  4      8   0     4  2     6  6       10

function minAbsSum_C(A) {
  if (A.length === 0) return 0;
  if (A.length === 1) return A[0];

  let min = Number.MAX_SAFE_INTEGER;
  res = [];

  function backtrack(i, cur) {
    // console.log("i: ", i, cur);
    // base case
    if (i === A.length - 1 || cur.length === A.length) {
      let absSum = Math.abs(cur.reduce((acc, val) => acc + val));
      min = Math.min(min, absSum);
      return;
    }
    // Let's 1*A[i+1]
    cur.push(A[i + 1]);
    // console.log(cur);
    backtrack(i + 1, cur);
    // Let's pop 1*A[i+1]
    cur.pop();
    // Let's try -1*A[i+1]
    cur.push(-1 * A[i + 1]);
    // console.log(cur);
    backtrack(i + 1, cur);
    // Let's pop -1*A[i+1]
    cur.pop();

    return;
  }

  backtrack(0, [A[0]]);

  return min;
}

// These are my test cases

console.log("[1, 2, 3, 4]: " + minAbsSum_A([1, 2, 3, 4]));
console.log("[1, 2, 3, 4]: " + minAbsSum_B([1, 2, 3, 4]));
console.log("[1, 2, 3, 4]: " + minAbsSum_C([1, 2, 3, 4]));
// console.log("[1, 5, 2, -2]: " + minAbsSum_A([1, 5, 2, -2]));
// console.log("[1, 5, 2, -2]: " + minAbsSum_B([1, 5, 2, -2]));
// console.log("[1, 5, 2, -2]: " + minAbsSum_C([1, 5, 2, -2]));
// console.log("[76, 50, 28, -18]: " + minAbsSum_A([76, 50, 28, -18]));
// console.log("[76, 50, 28, -18]: " + minAbsSum_B([76, 50, 28, -18]));
// console.log("[76, 50, 28, -18]: " + minAbsSum_C([76, 50, 28, -18]));
// console.log(
//   "[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]: " +
//     minAbsSum_A([
//       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//     ])
// );
// console.log(
//   "[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]: " +
//     minAbsSum_B([
//       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//     ])
// );
// console.log(
//   "[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]: " +
//     minAbsSum_C([
//       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//     ])
// );
