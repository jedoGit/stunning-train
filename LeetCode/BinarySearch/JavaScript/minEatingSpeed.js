// Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

// Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

// Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

// Return the minimum integer k such that she can eat all the bananas within h hours.

// Example 1:

// Input: piles = [3,6,7,11], h = 8
// Output: 4
// Example 2:

// Input: piles = [30,11,23,4,20], h = 5
// Output: 30
// Example 3:

// Input: piles = [30,11,23,4,20], h = 6
// Output: 23

// Constraints:

// 1 <= piles.length <= 104
// piles.length <= h <= 109
// 1 <= piles[i] <= 109

// TC: O(log(max(piles)*piles.length)), we perform binary search of a set [1...max(piles)] and for each value of k we compute from the bin searh, we test it against each elements of piles.
// SC: O(1) in place processing

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // To find k, k is in a set [1...max(piles[i])] that satisfy this condition:
  // sum(piles[i]/k) <= h
  // We use binary search to find k from the set [1...max(piles[i])]

  // We're not looking the index, we're searching for the value from the set [1...max(piles[i])]
  let l = 1;
  let r = Math.max(...piles); // in JS, this is the syntax to find the max value of an array
  let minK = r; // let's initialize this to max(piles[i])... since technically, this is the max k can be

  while (l <= r) {
    // Use bin search to test values of k
    k = Math.floor((l + r) / 2);

    let eatingHrs = 0;
    // We need to test this value of k if it results in sum(piles[i]/k) <= h
    // We need to find the min value of k
    for (let pile of piles) {
      eatingHrs += Math.ceil(pile / k);
    }

    // We check if this value of k results in sum(piles[i]/k) <= h?
    // We ate at a rate where we finished all the piles within h hours
    // This means we ate fast and we need to slow down
    // We update our minK and move our right pointer to the left side of k
    if (eatingHrs <= h) {
      minK = Math.min(minK, k);
      r = k - 1;
    } else {
      // This is case when we ate slow. We did not finish eating all the piles within h hours.
      // So we need to eat faster... we'll move our left pointer to the right of k
      l = k + 1;
    }
  }

  // At this point, we tried all possible values of k using bin search and we're done
  // Let's return the result

  return minK;
};
