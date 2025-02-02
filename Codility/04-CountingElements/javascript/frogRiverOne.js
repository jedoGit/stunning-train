// A small frog wants to get to the other side of a river. The frog is initially located on one bank of the river (position 0) and wants to get to the opposite bank (position X+1). Leaves fall from a tree onto the surface of the river.

// You are given an array A consisting of N integers representing the falling leaves. A[K] represents the position where one leaf falls at time K, measured in seconds.

// The goal is to find the earliest time when the frog can jump to the other side of the river. The frog can cross only when leaves appear at every position across the river from 1 to X (that is, we want to find the earliest moment when all the positions from 1 to X are covered by leaves). You may assume that the speed of the current in the river is negligibly small, i.e. the leaves do not change their positions once they fall in the river.

// For example, you are given integer X = 5 and array A such that:

//   A[0] = 1
//   A[1] = 3
//   A[2] = 1
//   A[3] = 4
//   A[4] = 2
//   A[5] = 3
//   A[6] = 5
//   A[7] = 4
// In second 6, a leaf falls into position 5. This is the earliest time when leaves appear in every position across the river.

// Write a function:

// function solution(X, A);

// that, given a non-empty array A consisting of N integers and integer X, returns the earliest time when the frog can jump to the other side of the river.

// If the frog is never able to jump to the other side of the river, the function should return -1.

// For example, given X = 5 and array A such that:

//   A[0] = 1
//   A[1] = 3
//   A[2] = 1
//   A[3] = 4
//   A[4] = 2
//   A[5] = 3
//   A[6] = 5
//   A[7] = 4
// the function should return 6, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and X are integers within the range [1..100,000];
// each element of array A is an integer within the range [1..X].

// TC: O(n), process n elements
// SC: O(n), create a set of of up to size n

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(X, A) {
  // Implement your solution here

  // {1: false, 2: false, 3: false, 4: false} Initial map values, X = 5, count = 0
  // {1: true} A[0] count = 1, set false to true, increment count
  // {3: true} A[1] count = 2, set false to true, increment count
  // {1: true} A[2] count = 2, do nothing, value is already true
  // {4: true} A[3] count = 3, set false to true, increment count
  // {2: true} A[4] count = 4, set false to true, increment count
  // {3: true} A[5] count = 4, do nothing, value is already true
  // {5: true} A[6] count = 5, set false to true, increment count

  let set = new Set();
  let count = 0;
  const N = A.length;

  // Visit each elements of A, if it exists and it's false, set it to true
  for (let i = 0; i < N; i += 1) {
    // Check if element A[i] is already in our map and it's false, if false, set to true and increment count
    if (!set.has(A[i])) {
      set.add(A[i]);
      // console.log(set)
      count += 1;
    }

    // console.log(set)

    // At each iteration, check if count is now equal to X
    if (count === X) {
      return i;
    }
  }

  return -1;
}
