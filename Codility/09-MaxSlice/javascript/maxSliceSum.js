// A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The sum of a slice (P, Q) is the total of A[P] + A[P+1] + ... + A[Q].

// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns the maximum sum of any slice of A.

// For example, given array A such that:

// A[0] = 3  A[1] = 2  A[2] = -6
// A[3] = 4  A[4] = 0
// the function should return 5 because:

// (3, 4) is a slice of A that has sum 4,
// (2, 2) is a slice of A that has sum −6,
// (0, 1) is a slice of A that has sum 5,
// no other slice of A has sum greater than (0, 1).
// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..1,000,000];
// each element of array A is an integer within the range [−1,000,000..1,000,000];
// the result will be an integer within the range [−2,147,483,648..2,147,483,647].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(n)
// SC: O(1)

function solution(A) {
  // Implement your solution here

  // [3,2,-6,4,0] = 5
  // [3,2,-6,4,5] = 9
  // [3,2,-6,4,5,6] = 15

  let curMaxTotal = 0;
  let maxSumFromSlice = -2147483648 - 1; // This the min range of the results - 1

  for (let i = 0; i < A.length; i += 1) {
    // Check the max ending with the current iteration and update. We use the value and not the index
    curMaxTotal = Math.max(curMaxTotal + A[i], A[i]);

    // Check the max slice with the current iteration and update.
    maxSumFromSlice = Math.max(maxSumFromSlice, curMaxTotal);
  }

  return maxSumFromSlice;
}

// TC: O(n)
// SC: O(1)

function solution(A) {
  // Implement your solution here
  let totalSum = 0;
  let maxSumFromSlice = A[0]; // Initially, max slice is first element

  for (let i = 0; i < A.length; i += 1) {
    // Accumulate the sum of A
    totalSum += A[i];

    // Update the max Slice
    maxSumFromSlice = Math.max(maxSumFromSlice, totalSum);

    // Reset the accumulator if it's current value is less than 0
    if (totalSum < 0) {
      totalSum = 0;
    }
  }

  return maxSumFromSlice;
}
