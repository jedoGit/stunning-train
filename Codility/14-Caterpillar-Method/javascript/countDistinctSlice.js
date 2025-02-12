// An integer M and a non-empty array A consisting of N non-negative integers are given. All integers in array A are less than or equal to M.

// A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The slice consists of the elements A[P], A[P + 1], ..., A[Q]. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

// For example, consider integer M = 6 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 5
//     A[3] = 5
//     A[4] = 2
// There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

// The goal is to calculate the number of distinct slices.

// Write a function:

// function solution(M, A);

// that, given an integer M and a non-empty array A consisting of N integers, returns the number of distinct slices.

// If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

// For example, given integer M = 6 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 5
//     A[3] = 5
//     A[4] = 2
// the function should return 9, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// M is an integer within the range [0..100,000];
// each element of array A is an integer within the range [0..M].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// Implement your solution here
//      0  1  2  3  4
// (6, [3, 4, 5, 5, 2])
//            r
//      l

// The intuition here is we are already guaranteed to have N distinct slice, (0,0), (1,1), (2,2) so on... So we'll initialize our count to N
// We need to find the rest (0,1), (0,2), (1,0), (1,2) so on...
// We'll use a set to keep track of the element we've seen.
// Using 2 pointers, we'll use a sliding window.
// We'll move the r pointer and each time, we add the element to the set.
// Also, we'll increment our count += r-l
// If we see the element in our set, we move our l pointer and remove the element pointed by l from our set

// TC: O(n)
// SC: O(n) we're keeping a set.. worst case [1,2,3,4,5]

function solution(M, A) {
  let N = A.length;
  let set = new Set();
  const ONE_BILLION = 1000000000;

  let count = N; // initialize to N.. we're guaranteed to have at least N count

  // Using sliding window technique
  let l = 0;
  let r = 0;

  // We'll stop when right pointer goes out of bound
  while (r < N) {
    if (set.has(A[r])) {
      // check if the element pointed by the r pointer is in our set
      // We shrink our window
      // Remove element pointed by l and increment l
      set.delete(A[l]);
      l += 1;
    } else {
      // The element pointed by the r pointer is NOT in our set
      // We stretch our window
      // We add element pointed by r to the set, update our count and increment r
      set.add(A[r]);
      count += r - l;
      r += 1;
    }

    // Constraint is to return 1000000000 if count is > 1000000000
    if (count > ONE_BILLION) {
      return ONE_BILLION;
    }

    // console.log(r,l,count)
  }
  return count;
}
