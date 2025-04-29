// You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.

// Define a pair (u, v) which consists of one element from the first array and one element from the second array.

// Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

// Example 1:

// Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// Output: [[1,2],[1,4],[1,6]]
// Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
// Example 2:

// Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
// Output: [[1,1],[1,1]]
// Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

// Constraints:

// 1 <= nums1.length, nums2.length <= 105
// -109 <= nums1[i], nums2[i] <= 109
// nums1 and nums2 both are sorted in non-decreasing order.
// 1 <= k <= 104
// k <= nums1.length * nums2.length

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
var kSmallestPairs = function (nums1, nums2, k) {
  let res = [];

  if (!nums1.length || !nums2.length || !k) {
    return res;
  }

  // This is a queue of type X which is a flattened array that looks like [sum,i,j],
  //  we need to prioritize it by sum, which is X[0]
  let hmin = new MinPriorityQueue((X) => X[0]);
  let visited = new Set();

  // push to the heap: [sum(nums1[0], nums2[0]), 0, 0]
  hmin.enqueue([nums1[0] + nums2[0], 0, 0]);
  visited.add(`0,0`);

  // console.log(hmin.front())
  // console.log(visited)

  while (k && hmin.size()) {
    // console.log(hmin.front())
    // console.log(visited)

    let [s, i, j] = hmin.dequeue();

    res.push([nums1[i], nums2[j]]);

    if (i + 1 < nums1.length) {
      if (!visited.has(`${i + 1},${j}`)) {
        hmin.enqueue([nums1[i + 1] + nums2[j], i + 1, j]);
        visited.add(`${i + 1},${j}`);
      }
    }

    if (j + 1 < nums2.length) {
      if (!visited.has(`${i},${j + 1}`)) {
        hmin.enqueue([nums1[i] + nums2[j + 1], i, j + 1]);
        visited.add(`${i},${j + 1}`);
      }
    }

    k -= 1;
  }

  return res;
};
