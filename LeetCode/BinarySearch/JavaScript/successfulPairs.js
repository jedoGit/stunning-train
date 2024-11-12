// You are given two positive integer arrays spells and potions, of length n and m respectively, where spells[i] represents the strength of the ith spell and potions[j] represents the strength of the jth potion.

// You are also given an integer success. A spell and potion pair is considered successful if the product of their strengths is at least success.

// Return an integer array pairs of length n where pairs[i] is the number of potions that will form a successful pair with the ith spell.

// Example 1:

// Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
// Output: [4,0,3]
// Explanation:
// - 0th spell: 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 pairs are successful.
// - 1st spell: 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 pairs are successful.
// - 2nd spell: 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 pairs are successful.
// Thus, [4,0,3] is returned.
// Example 2:

// Input: spells = [3,1,2], potions = [8,5,8], success = 16
// Output: [2,0,2]
// Explanation:
// - 0th spell: 3 * [8,5,8] = [24,15,24]. 2 pairs are successful.
// - 1st spell: 1 * [8,5,8] = [8,5,8]. 0 pairs are successful.
// - 2nd spell: 2 * [8,5,8] = [16,10,16]. 2 pairs are successful.
// Thus, [2,0,2] is returned.

// Constraints:

// n == spells.length
// m == potions.length
// 1 <= n, m <= 105
// 1 <= spells[i], potions[i] <= 105
// 1 <= success <= 1010

// TC: O(nlogn) Worst case due to sorting the potions array
// SC: O(1) In place processing

/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  let n = potions.length;
  let res = [];

  // We need to sort the potions
  potions.sort((a, b) => a - b);

  // We need to iterate through the spell and multiply it to each elements in the potion
  // We need to perform binary search to find the value less than the success in our array

  for (const spell of spells) {
    let l = 0;
    let r = n - 1;

    // We loop through and move our l and r pointers until l and r is equal
    // If l and r is equal, we break the loop.
    while (l <= r) {
      let m = Math.floor((l + r) / 2);

      // Perform binary search
      if (potions[m] * spell < success) {
        // The computed value is less than what we're looking for
        // Move the left pointer to m+1
        l = m + 1;
      } else {
        // The computed value we're looking for is greater than the success.
        // So let's move the right pointer to m-1
        r = m - 1;
      }
    }

    // At this point, we broke out of the while loop. We need to compute how many indices that satisfy the criteria
    // We compute it as number of elements in the potions array minus the index pointed by the left pointer, which is the
    // starting index in potions array that has value success or greater
    res.push(n - l);
  }

  return res;
};
