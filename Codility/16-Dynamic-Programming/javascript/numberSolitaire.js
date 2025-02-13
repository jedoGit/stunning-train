// A game for one player is played on a board consisting of N consecutive squares, numbered from 0 to N − 1. There is a number written on each square. A non-empty array A of N integers contains the numbers written on the squares. Moreover, some squares can be marked during the game.

// At the beginning of the game, there is a pebble on square number 0 and this is the only square on the board which is marked. The goal of the game is to move the pebble to square number N − 1.

// During each turn we throw a six-sided die, with numbers from 1 to 6 on its faces, and consider the number K, which shows on the upper face after the die comes to rest. Then we move the pebble standing on square number I to square number I + K, providing that square number I + K exists. If square number I + K does not exist, we throw the die again until we obtain a valid move. Finally, we mark square number I + K.

// After the game finishes (when the pebble is standing on square number N − 1), we calculate the result. The result of the game is the sum of the numbers written on all marked squares.

// For example, given the following array:

//     A[0] = 1
//     A[1] = -2
//     A[2] = 0
//     A[3] = 9
//     A[4] = -1
//     A[5] = -2
// one possible game could be as follows:

// the pebble is on square number 0, which is marked;
// we throw 3; the pebble moves from square number 0 to square number 3; we mark square number 3;
// we throw 5; the pebble does not move, since there is no square number 8 on the board;
// we throw 2; the pebble moves to square number 5; we mark this square and the game ends.
// The marked squares are 0, 3 and 5, so the result of the game is 1 + 9 + (−2) = 8. This is the maximal possible result that can be achieved on this board.

// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the maximal result that can be achieved on the board represented by array A.

// For example, given the array

//     A[0] = 1
//     A[1] = -2
//     A[2] = 0
//     A[3] = 9
//     A[4] = -1
//     A[5] = -2
// the function should return 8, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [2..100,000];
// each element of array A is an integer within the range [−10,000..10,000].

//==============================================================================
// A = [1, -2, 0, 9, -1, -2]

// dp[0] = A[0]

// throw a die and the number in the face of die, that's the number of steps you'll move from your current location

// N = A.length-1

//    i       0      1       2       3       4       5
// {1...6}   dp[0]  dp[0+1] dp[0+2] dp[0+3] dp[0+4] dp[0+5]
//                          dp[1+1] dp[1+2] dp[1+3] dp[1+4]
//                                  dp[2+1] dp[2+2] dp[2+3]
//                                          dp[3+1] dp[3+2]
//                                                  dp[4+1]

//           dp[0]=A[0]   dp[1]=dp[0]+A[1]   dp[2]=dp[0]+A[2]   dp[3]=dp[0]+A[3]   dp[4]=dp[0]+A[4]   dp[5]=dp[0]+A[5]   dp[6]=dp[0]+A[6]   dp[7]=dp[1]+A[7]
//                                                 dp[1]+A[2]         dp[1]+A[3]         dp[1]+A[4]         dp[1]+A[5]         dp[1]+A[6]         dp[2]+A[7]
//                                                                    dp[2]+A[3]         dp[2]+A[4]         dp[2]+A[5]         dp[2]+A[6]         dp[3]+A[7]
//                                                                                       dp[3]+A[4]         dp[3]+A[5]         dp[3]+A[6]         dp[4]+A[7]
//                                                                                                          dp[4]+A[5]         dp[4]+A[6]         dp[5]+A[7]
//                                                                                                                             dp[5]+A[6]         dp[6]+A[7]

//           dp[0]=A[0]

//           dp[i]=dp[i-{1...i}]+A[i]
//           dp[1]=max(dp[0]+A[1])
//           dp[2]=max(dp[0]+A[2], dp[1]+A[2])
//           dp[3]=max(dp[0]+A[3], dp[1]+A[3], dp[2]+A[3])
//           dp[4]=max(dp[0]+A[4], dp[1]+A[4], dp[2]+A[4], dp[3]+A[4])
//           dp[5]=max(dp[0]+A[5], dp[1]+A[5], dp[2]+A[5], dp[3]+A[5], dp[4]+A[5])
//           dp[6]=max(dp[0]+A[6], dp[1]+A[6], dp[2]+A[6], dp[3]+A[6], dp[4]+A[6], dp[5]+A[6])

//           dp[i]=dp[i-{1...6}]+A[i]
//           dp[7]=max(dp[1]+A[7], dp[2]+A[7], dp[3]+A[7], dp[4]+A[7], dp[5]+A[7], dp[6]+A[7])
//           dp[8]=max(dp[2]+A[8], dp[3]+A[8], dp[4]+A[8], dp[5]+A[8], dp[6]+A[8], dp[7]+A[8])

// Overall max value is dp[n-1]

//==============================================================================

// TC: O(n) * O(6) => O(n) because we calculate the max for N iterations. O(6) because at each iteration, we loop through the previous dp elements and add them and find the max val.
//     At worst, TC is O(n)
// SC: O(n) we created a dp array of size N

function solution(A) {
  const N = A.length;
  const dieMaxVal = 6;
  let dp = [];

  // Initialize dp[0] to A[0]
  dp[0] = A[0];

  // construct the dp table
  for (let i = 1; i < N; i += 1) {
    let curMax = Number.MIN_SAFE_INTEGER;

    // Refer to the dp analysis table we created above
    // For N <= 6, we can use dp[0] to dp[5]
    // We can see that for N > 6, we can only consider the last 6 dp values previously computed.
    // For example, A[7] => we can only use dp[1] to dp[6]
    //              A[8] => dp[2] to dp[7]
    if (i <= dieMaxVal) {
      for (let j = 1; j <= i; j += 1) {
        curMax = Math.max(dp[i - j] + A[i], curMax);
      }
    } else {
      // This is the case when i is > 6, which is the max value of a die
      // Essentially, we just need to count from 6 to 1 and subtract it from i
      // We know that the avaiable squares is greater than 6.
      let count = dieMaxVal;
      while (count > 0) {
        curMax = Math.max(dp[i - count] + A[i], curMax);
        count -= 1;
      }
    }
    // For each iteration of i, save the current maximum
    dp[i] = curMax;
  }

  // This is a top-down DP approach... the best value is in the last element of dp array
  return dp[N - 1];
}
