// An array A consisting of N integers is given. The dominator of array A is the value that occurs in more than half of the elements of A.

// For example, consider array A such that

//  A[0] = 3    A[1] = 4    A[2] =  3
//  A[3] = 2    A[4] = 3    A[5] = -1
//  A[6] = 3    A[7] = 3
// The dominator of A is 3 because it occurs in 5 out of 8 elements of A (namely in those with indices 0, 2, 4, 6 and 7) and 5 is more than a half of 8.

// Write a function

// function solution(A);

// that, given an array A consisting of N integers, returns index of any element of array A in which the dominator of A occurs. The function should return −1 if array A does not have a dominator.

// For example, given array A such that

//  A[0] = 3    A[1] = 4    A[2] =  3
//  A[3] = 2    A[4] = 3    A[5] = -1
//  A[6] = 3    A[7] = 3
// the function may return 0, 2, 4, 6 or 7, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

// TC: O(n), we visit each elements of A
// SC: O(n), at most, the stack will have n elements if A = [5,5,5,5,5]

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // Implement your solution here

  // At each iteration, push the current element to a stack and compare the 2 top elements of the stack.
  // If the same, leave the stack. If different, pop both elements.
  // At the end of the for loop, we either have and empty stack or a none-empty, stack.
  // If non-empty, the value of the top of the stack is our denominator.

  // At the end, we access the index and return

  const N = A.length;

  if (!N) return -1;

  let stack = [];

  for (let i = 0; i < N; i += 1) {
    stack.push(A[i]);

    // console.log(stack)
    // Check the top 2 elements of the stack
    if (
      stack.length > 1 &&
      stack[stack.length - 1] !== stack[stack.length - 2]
    ) {
      stack.pop();
      stack.pop();
    }
  }

  //   console.log(stack)

  // If we have something in our stack, let's verify that value occurs more than half of all elements of A

  if (stack.length > 0) {
    const candidate = stack.pop();
    const minCount = Math.floor(N / 2) + 1;

    let count = 0;
    for (let i = 0; i < N; i++) {
      if (A[i] === candidate) {
        count++;

        if (count >= minCount) {
          return i;
        }
      }
    }
  }

  return -1;
}
