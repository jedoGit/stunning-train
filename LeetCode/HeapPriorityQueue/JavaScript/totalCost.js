// You are given a 0-indexed integer array costs where costs[i] is the cost of hiring the ith worker.

// You are also given two integers k and candidates. We want to hire exactly k workers according to the following rules:

// You will run k sessions and hire exactly one worker in each session.
// In each hiring session, choose the worker with the lowest cost from either the first candidates workers or the last candidates workers. Break the tie by the smallest index.
// For example, if costs = [3,2,7,7,1,2] and candidates = 2, then in the first hiring session, we will choose the 4th worker because they have the lowest cost [3,2,7,7,1,2].
// In the second hiring session, we will choose 1st worker because they have the same lowest cost as 4th worker but they have the smallest index [3,2,7,7,2]. Please note that the indexing may be changed in the process.
// If there are fewer than candidates workers remaining, choose the worker with the lowest cost among them. Break the tie by the smallest index.
// A worker can only be chosen once.
// Return the total cost to hire exactly k workers.

// Example 1:

// Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
// Output: 11
// Explanation: We hire 3 workers in total. The total cost is initially 0.
// - In the first hiring round we choose the worker from [17,12,10,2,7,2,11,20,8]. The lowest cost is 2, and we break the tie by the smallest index, which is 3. The total cost = 0 + 2 = 2.
// - In the second hiring round we choose the worker from [17,12,10,7,2,11,20,8]. The lowest cost is 2 (index 4). The total cost = 2 + 2 = 4.
// - In the third hiring round we choose the worker from [17,12,10,7,11,20,8]. The lowest cost is 7 (index 3). The total cost = 4 + 7 = 11. Notice that the worker with index 3 was common in the first and last four workers.
// The total hiring cost is 11.
// Example 2:

// Input: costs = [1,2,4,1], k = 3, candidates = 3
// Output: 4
// Explanation: We hire 3 workers in total. The total cost is initially 0.
// - In the first hiring round we choose the worker from [1,2,4,1]. The lowest cost is 1, and we break the tie by the smallest index, which is 0. The total cost = 0 + 1 = 1. Notice that workers with index 1 and 2 are common in the first and last 3 workers.
// - In the second hiring round we choose the worker from [2,4,1]. The lowest cost is 1 (index 2). The total cost = 1 + 1 = 2.
// - In the third hiring round there are less than three candidates. We choose the worker from the remaining workers [2,4]. The lowest cost is 2 (index 0). The total cost = 2 + 2 = 4.
// The total hiring cost is 4.

// Constraints:

// 1 <= costs.length <= 105
// 1 <= costs[i] <= 105
// 1 <= k, candidates <= costs.length

// TC: O(n), worst case is looping through costs k times
// SC: O(n), at each k iteration, we're maintaining 2 heaps of size candidates

/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
var totalCost = function (costs, k, candidates) {
  // Use min heap from library https://github.com/datastructures-js/priority-queue/blob/v5/README.md
  // This library is loaded by leetcode. Check the language setting for information
  const hl = new MinPriorityQueue();
  const hr = new MinPriorityQueue();
  let maxVal = 1e5 + 1; // From the constraints, 1 <= costs[i] <= 1e5

  // In order to guard our heap from accessing null entries, we'll insert a max value to our min heap
  // At most, the number of entries of our heaps will be candidates + 1, where the last entry is the max value
  hl.enqueue(maxVal);
  hr.enqueue(maxVal);

  let totalCost = 0;
  let l = 0;
  let r = costs.length - 1;

  // Let's loop through k times
  for (let i = 0; i < k; ++i) {
    // We'll use 2 pointers to fill the min heaps with costs of candidates
    // We'll fill the left side first, followed by the right side
    while (hl.size() <= candidates && l <= r) {
      hl.enqueue(costs[l++]);
    }

    // At this point, remember, we post increment our left pointer, we need to consider that in our condition to check for equality
    while (hr.size() <= candidates && l <= r) {
      hr.enqueue(costs[r--]);
    }

    // After we fill our min heaps, let's check the front of both heaps and pop the min. If both heaps have equal min, pop from the left heap
    // Remember our heaps are guarded in the back with the max value
    if (hl.front().element <= hr.front().element) {
      totalCost += hl.dequeue().element;
    } else {
      totalCost += hr.dequeue().element;
    }
  }

  return totalCost;
};
