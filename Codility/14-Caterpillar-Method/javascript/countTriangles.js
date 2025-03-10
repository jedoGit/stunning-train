// An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if it is possible to build a triangle with sides of lengths A[P], A[Q] and A[R]. In other words, triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

// A[P] + A[Q] > A[R],
// A[Q] + A[R] > A[P],
// A[R] + A[P] > A[Q].
// For example, consider array A such that:

//   A[0] = 10    A[1] = 2    A[2] = 5
//   A[3] = 1     A[4] = 8    A[5] = 12
// There are four triangular triplets that can be constructed from elements of this array, namely (0, 2, 4), (0, 2, 5), (0, 4, 5), and (2, 4, 5).

// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns the number of triangular triplets in this array.

// For example, given array A such that:

//   A[0] = 10    A[1] = 2    A[2] = 5
//   A[3] = 1     A[4] = 8    A[5] = 12
// the function should return 4, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..1,000];
// each element of array A is an integer within the range [1..1,000,000,000].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// Starting with A = [10,2,5,1,8,12]
// After sorting the elements of A, we have A = [1,2,5,8,10,12]
// From the sorted array, we are guaranteed to have A[p] < A[q] < A[r].
// We need to to find a triplet such that A[p] + A[q] > A[r]
// By using 2 pointers, l and r, we can start by having and index i start pointing at A[0] and moving A[r] and A[l] to
// find a triplet such that A[i] + A[l] > A[r]
//  0 1 2 3  4  5
// [1,2,5,8,10,12]
//  i l
//      r
// Since this is a sorted array, we might need to move l to the right first until we hit this condition A[i] + A[l] > A[r]
// We move l and it now points to 5 and it will satisfy the condition A[i] + A[l] > A[r]. Everytime we move l, we count the difference between l and r: count = r - l
// If this condition is satisfied, we move r until the condition is not met then we'll move l.
//  0 1 2 3  4  5
// [1,2,5,8,10,12]
//  i        l
//              r
// We keep doing this for every i.
//  0 1 2 3  4  5
// [1,2,5,8,10,12]
//    i      l
//              r
//  0 1 2 3  4  5  6
// [1,2,5,8,10,12] null
//      i   l
//                 r

// TC: O(nlogn) due to sorting + O(n^2) for the caterpillar method
// SC: O(nlogn) due to sorting

function solution(A) {
  const N = A.length;

  // we need to sort ths input first
  A.sort((a, b) => a - b);
  let count = 0;

  // we set i constant and move the l and r pointer
  for (let i = 0; i < N - 2; i++) {
    // start with the l and r pointers 1 and 2 index from i.
    // this way, we have a triplet, i, l, r
    let left = i + 1;
    let right = i + 2;

    // we compute a[i] + a[l] > a[r]
    // we move r pointer if >
    // we move l pointer if <= and increment the count
    while (left < N - 1) {
      if (right < N && A[i] + A[left] > A[right]) {
        right++;
      } else {
        left++;
        count += right - left;
      }
    }
  }

  return count;
}
