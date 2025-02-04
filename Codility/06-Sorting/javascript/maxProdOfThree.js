// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here
}
// A non-empty array A consisting of N integers is given. The product of triplet (P, Q, R) equates to A[P] * A[Q] * A[R] (0 ≤ P < Q < R < N).

// For example, array A such that:

//   A[0] = -3
//   A[1] = 1
//   A[2] = 2
//   A[3] = -2
//   A[4] = 5
//   A[5] = 6
// contains the following example triplets:

// (0, 1, 2), product is -3 * 1 * 2 = -6
// (1, 2, 4), product is 1 * 2 * 5 = 10
// (2, 4, 5), product is 2 * 5 * 6 = 60
// Your goal is to find the maximal product of any triplet.

// Write a function:

// function solution(A);

// that, given a non-empty array A, returns the value of the maximal product of any triplet.

// For example, given array A such that:

//   A[0] = -3
//   A[1] = 1
//   A[2] = 2
//   A[3] = -2
//   A[4] = 5
//   A[5] = 6
// the function should return 60, as the product of triplet (2, 4, 5) is maximal.

// TC:O(nlogn) due to sorting
// SC:O(nlogn) due to sorting

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [3..100,000];
// each element of array A is an integer within the range [-1,000..1,000].
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  const N = A.length;

  if (N < 3) return 0;

  // Sort the input array
  A.sort((a, b) => a - b);

  // The maximum triplet can be computed as follows:
  // max( A[0]*A[1]*A[N-1], A[N-3]*A[N-2]*A[N-1] )
  // We'll have a situation where:
  // [ -100, -50, 0, 1] should be -100 * -50 * 1
  // [-2, -1, -1, 0, 2, 3] shoule be -2 * -1 * 3
  // [ 0, 1, 2, 3] should be 1 * 2 * 3
  // [-5, -4, -3, -2, -1] should be -3 * -2 * -1
  // This is an example
  // Original Array: [-3, 1, -2, -4, -5, -6, -1000]
  //                      0    1   2   3  n-3 n-2 n-1
  // Sorted Array:   [ -1000, -6, -5, -4,  -3, -2, 1 ]

  res = Math.max(A[0] * A[1] * A[N - 1], A[N - 3] * A[N - 2] * A[N - 1]);

  console.log(A);

  return res;
}
