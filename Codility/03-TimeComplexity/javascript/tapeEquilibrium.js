// A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

// Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P - 1] and A[P], A[P + 1], ..., A[N - 1].

// The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P - 1]) - (A[P] + A[P + 1] + ... + A[N - 1])|

// In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

// For example, consider array A such that:

//   A[0] = 3
//   A[1] = 1
//   A[2] = 2
//   A[3] = 4
//   A[4] = 3
// We can split this tape in four places:

// P = 1, difference = |3 - 10| = 7
// P = 2, difference = |4 - 9| = 5
// P = 3, difference = |6 - 7| = 1
// P = 4, difference = |10 - 3| = 7
// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

// For example, given:

//   A[0] = 3
//   A[1] = 1
//   A[2] = 2
//   A[3] = 4
//   A[4] = 3
// the function should return 1, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [2..100,000];
// each element of array A is an integer within the range [-1,000..1,000].

// TC: O(n), we perform 2 for loops that access all of the elements of A.
// SC: O(1), in place processing

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here
  // [3,1,2,4,3]    - Elements of A, N = 5
  // [] [3,1,2,4,3] - Initial values of right and left side
  // [3]  [1,2,4,3] - i = 0
  // [3,1]  [2,4,3] - i = 1
  // [3,1,2]  [4,3] - i = 2
  // [3,1,2,4]  [3] - i = 3
  let N = A.length;

  if (N < 2) {
    return -1;
  }

  // First, we need to sum-up all the elements and assign to the rightside
  let rightSide = 0;

  for (let i = 0; i < N; i += 1) {
    rightSide += A[i];
  }

  let leftSide = 0;
  let minDiff = Number.POSITIVE_INFINITY;
  let curDiff = 0;

  // We need to stop at index N - 2
  for (let i = 0; i < N - 1; i += 1) {
    leftSide += A[i]; // Add the current element to the left side
    rightSide -= A[i]; // Subtract the currente element from the right side

    // Perform Abs(left-right)
    curDiff = Math.abs(leftSide - rightSide);

    // console.log(curDiff, minDiff)
    // Update the minDiff
    minDiff = Math.min(minDiff, curDiff);

    // Reset curDiff after updating the minDiff
    curDiff = 0;
  }

  return minDiff;
}
