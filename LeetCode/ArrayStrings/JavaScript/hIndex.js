// Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index.

// According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.

// Example 1:

// Input: citations = [3,0,6,1,5]
// Output: 3
// Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
// Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
// Example 2:

// Input: citations = [1,3,1]
// Output: 1

// Constraints:

// n == citations.length
// 1 <= n <= 5000
// 0 <= citations[i] <= 1000

// TC: O(n)
// SC: O(n)

/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  let n = citations.length;
  // This variable represents bins of citation counts.
  // We will use this to keep track how many papers have citations
  let paper_counts = new Array(n + 1).fill(0);

  // console.log(paper_counts)

  // Here let's count how many times each citations show up
  // The last index captures count that is greater than or equal to n
  for (let c of citations) {
    paper_counts[Math.min(n, c)] = paper_counts[Math.min(n, c)] + 1;
  }

  // console.log(paper_counts)

  // This is the h index calculation part
  let h = n;
  let papers = paper_counts[n];

  // Here, starting at the end of the paper_count array, and h equal to the size of the input array
  // We decrement h and find the paper count where paper has been cited h times
  while (papers < h) {
    h -= 1;
    papers += paper_counts[h];
  }

  return h;
};
