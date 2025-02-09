// An integer N is given, representing the area of some rectangle.

// The area of a rectangle whose sides are of length A and B is A * B, and the perimeter is 2 * (A + B).

// The goal is to find the minimal perimeter of any rectangle whose area equals N. The sides of this rectangle should be only integers.

// For example, given integer N = 30, rectangles of area 30 are:

// (1, 30), with a perimeter of 62,
// (2, 15), with a perimeter of 34,
// (3, 10), with a perimeter of 26,
// (5, 6), with a perimeter of 22.
// Write a function:

// function solution(N);

// that, given an integer N, returns the minimal perimeter of any rectangle whose area is exactly equal to N.

// For example, given an integer N = 30, the function should return 22, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..1,000,000,000].

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(sqrt(n))
// SC: O(1)

function solution(N) {
  let minPerimeter = Number.MAX_SAFE_INTEGER;
  let i = 1;

  // Let's iterate only when I*I <= N
  while (i * i <= N) {
    // Check if N is divisible by i, that is N/i does not have a remainder
    if (N % i === 0) {
      // If i is a factor of N, there also exist another factor n/i
      // we know that i*N/i => N which is the area of the rectangle,
      // we can solf the perimeter 2*(A+B) => 2*(i+n/i)
      minPerimeter = Math.min(minPerimeter, 2 * (i + N / i));
    }

    // increment i
    i += 1;
  }

  return minPerimeter;
}
