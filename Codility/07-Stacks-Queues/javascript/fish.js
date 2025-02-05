// You are given two non-empty arrays A and B consisting of N integers. Arrays A and B represent N voracious fish in a river, ordered downstream along the flow of the river.

// The fish are numbered from 0 to N - 1. If P and Q are two fish  and P < Q, then fish P is initially upstream of fish Q. Initially, each fish has a unique position.

// Fish number P is represented by A[P] and B[P]. Array A contains the sizes of the fish. All its elements are unique. Array B contains the directions of the fish. It contains only 0s and/or 1s, where:

// 0 represents a fish flowing upstream,
// 1 represents a fish flowing downstream.
// If two fish move in opposite directions and there are no other (living) fish between them, they will eventually meet each other. Then only one fish can stay alive - the larger fish eats the smaller one. More precisely, we say that two fish P and Q meet each other when P < Q, B[P] = 1 and B[Q] = 0, and there are no living fish between them. After they meet:

// If A[P] > A[Q] then P eats Q, and P will still be flowing downstream,
// If A[Q] > A[P] then Q eats P, and Q will still be flowing upstream.
// We assume that all the fish are flowing at the same speed. That is, fish moving in the same direction never meet. The goal is to calculate the number of fish that will stay alive.

// For example, consider arrays A and B such that:

//   A[0] = 4    B[0] = 0
//   A[1] = 3    B[1] = 1
//   A[2] = 2    B[2] = 0
//   A[3] = 1    B[3] = 0
//   A[4] = 5    B[4] = 0
// Initially all the fish are alive and all except fish number 1 are moving upstream. Fish number 1 meets fish number 2 and eats it, then it meets fish number 3 and eats it too. Finally, it meets fish number 4 and is eaten by it. The remaining two fish, number 0 and 4, never meet and therefore stay alive.

// Write a function:

// function solution(A, B);

// that, given two non-empty arrays A and B consisting of N integers, returns the number of fish that will stay alive.

// For example, given the arrays shown above, the function should return 2, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [0..1,000,000,000];
// each element of array B is an integer that can have one of the following values: 0, 1;
// the elements of A are all distinct.

// TC: O(n) loop through all elements of A and B... where A and B have the same length
// SC: O(n) we have a stack where it could get to size n, when B = [111111]

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A, B) {
  // Implement your solution here
  //   0  1  2  3  4    0  1  2  3  4
  // ([4, 3, 2, 1, 5], [0, 1, 0, 0, 0]) 2 fishes, 4,5
  // ([4, 3, 2, 1, 5], [1, 1, 0, 0, 0]) 1 fish, 5
  // ([4, 3, 2, 1, 1], [1, 1, 0, 0, 0]) 2 fishes, 4 ,3
  // ([6, 3, 2, 5, 1], [1, 1, 0, 0, 0]) 1 fish, 6
  // ([4, 3, 5, 1, 6], [0, 1, 1, 0, 0]) 2 fishes, 4, 6

  N = A.length;
  let count = 0;

  // Use a queue to store the upstream fishes
  let stack = [];

  // Loop through the B array:
  for (let i = 0; i < N; i += 1) {
    if (B[i] === 1) {
      // Add to stack
      stack.push(A[i]);
    } else {
      // We see a fish heading opposite direction
      if (stack.length === 0) {
        // If at any iteration, the stack size is zero, increment count
        // This fish is safe
        count += 1;
      } else {
        // This means our stack has some fish, so let's compare the sizes of the fishes
        // If the fish at the top of our stack is smaller than the incoming
        while (stack.length && stack[stack.length - 1] < A[i]) {
          stack.pop();
        }

        // Let's check again the size of our stack
        if (stack.length === 0) {
          count += 1;
        }
      }
    }
  }

  // Remaining fish: count + stack.length
  return count + stack.length;
}
