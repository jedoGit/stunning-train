// A non-empty array A consisting of N integers is given.

// The leader of this array is the value that occurs in more than half of the elements of A.

// An equi leader is an index S such that 0 ≤ S < N - 1 and two sequences A[0], A[1], ..., A[S] and A[S + 1], A[S + 2], ..., A[N - 1] have leaders of the same value.

// For example, given array A such that:

//     A[0] = 4
//     A[1] = 3
//     A[2] = 4
//     A[3] = 4
//     A[4] = 4
//     A[5] = 2
// we can find two equi leaders:

// 0, because sequences: (4) and (3, 4, 4, 4, 2) have the same leader, whose value is 4.
// 2, because sequences: (4, 3, 4) and (4, 4, 2) have the same leader, whose value is 4.
// The goal is to count the number of equi leaders.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the number of equi leaders.

// For example, given:

//     A[0] = 4
//     A[1] = 3
//     A[2] = 4
//     A[3] = 4
//     A[4] = 4
//     A[5] = 2
// the function should return 2, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [-1,000,000,000..1,000,000,000].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(3n) => O(n)
// SC: O(n) due to keeping a stack.. worst case is A=[5555] where will fill the stack with size n.

function solution(A) {
  // Implement your solution here
  // First find the candidate leader by using the stack method.
  // Then validate the leader by comparing each elements to the candidate leader and incrementing a count.
  // If the count is > N/2, then the candidate is the leader.

  // Find the candidate leader using stack.
  const N = A.length;
  let stack = [];

  for (let i = 0; i < N; i++) {
    if (stack.length === 0 || stack[stack.length - 1] === A[i]) {
      stack.push(A[i]);
    } else {
      stack.pop();
    }
  }

  let totalLeaderCount = 0;
  let leader = stack.pop();

  // Count the candidate leader
  for (let i = 0; i < N; i += 1) {
    if (A[i] === leader) {
      totalLeaderCount += 1;
    }
  }

  // Count the equileader
  // Intuition is to loop through the all elements again and compare each elements to the leader
  // We'll keep track of the left side leader and right side leader.
  // At each iteration, we check if the cound of the left leader and right right leader satisfy as more than half
  // At each iteration, if we see that the element is a leader, we increment the left leader count and decrement the right leader count
  // We then check the equileader count by checking the leftLeaderCount is > total element checked / 2 and rightLeaderCount is total element remaining / 2

  let leftLeaderCount = 0;
  let rightLeaderCount = totalLeaderCount;
  let equiLeaderCount = 0;

  for (let i = 0; i < N; i += 1) {
    if (A[i] === leader) {
      leftLeaderCount += 1;
      rightLeaderCount -= 1;
    }

    if (
      leftLeaderCount >= Math.floor((i + 1) / 2) + 1 &&
      rightLeaderCount >= Math.floor((N - 1 - i) / 2) + 1
    ) {
      equiLeaderCount += 1;
    }
  }

  // console.log(stack, totalLeaderCount, equiLeaderCount)

  return equiLeaderCount;
}
