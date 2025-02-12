// Let A be a non-empty array consisting of N integers.

// The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

// For example, the following array A:

//   A[0] =  1
//   A[1] =  4
//   A[2] = -3
// has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).

//  The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2.

//  The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5.

//  The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (-3)| = 2.

//  The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8.

//  The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (-3)| = 1.

//  The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(-3) + (-3)| = 6.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

// For example, given the following array A:

//   A[0] =  1
//   A[1] =  4
//   A[2] = -3
// the function should return 1, as explained above.

// Given array A:

//   A[0] = -8
//   A[1] =  4
//   A[2] =  5
//   A[3] =-10
//   A[4] =  3
// the function should return |(-8) + 5| = 3.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [-1,000,000,000..1,000,000,000].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// function solution(A) {
//     // Implement your solution here
//     // [-8,4,5,-10,3]
//     // [-10,-8,3,4,5]

//     //
// }

function solution(A) {
  const N = A.length;

  A.sort((a, b) => a - b);

  let left = 0;
  let right = N - 1;

  let min = Number.MAX_SAFE_INTEGER;

  while (left <= right) {
    const currentSum = A[left] + A[right];
    const currentAbs = Math.abs(currentSum);

    if (currentAbs < min) {
      min = currentAbs;
    }

    if (currentSum > 0) {
      right--;
    } else {
      left++;
    }
  }

  return min;
}

// function solution(A) {
//   const N = A.length;

//   A.sort((a, b) => Math.abs(a) - Math.abs(b));

//   let min = Math.abs(A[0] + A[0]);
//   for (let i = 0; i < N - 1; i++) {
//     const current = Math.abs(A[i] + A[i + 1]);

//     if (current < min) {
//       min = current;
//     }
//   }

//   return min;
// }
