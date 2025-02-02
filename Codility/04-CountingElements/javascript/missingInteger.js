// This is a demo task.

// Write a function:

// function solution(A);

// that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

// For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

// Given A = [1, 2, 3], the function should return 4.

// Given A = [−1, −3], the function should return 1.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−1,000,000..1,000,000].

// TC: O(n) , first we created a set and added all elements of the input A, second, we count all values from 1 to N+1 and check our set
// SC: O(n) , we created a set of size n

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  // Using JS Set
  const N = A.length;
  let set = new Set(A);

  // console.log(set)

  for (let i = 1; i < N + 1; i += 1) {
    if (!set.has(i)) {
      return i;
    }
  }

  return N + 1;
}
