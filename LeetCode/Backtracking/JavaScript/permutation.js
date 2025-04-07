// Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

// Example 1:

// Input: nums = [1,2,3]
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// Example 2:

// Input: nums = [0,1]
// Output: [[0,1],[1,0]]
// Example 3:

// Input: nums = [1]
// Output: [[1]]

// Constraints:

// 1 <= nums.length <= 6
// -10 <= nums[i] <= 10
// All the integers of nums are unique.

// TC: O(n!) total number of permutations of n elements
// SC: O(n) depth of the recursion stack

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // For example, nums = [1,2,3]
  //                            1                         2                            3
  //                      2           3            1             3               2           1
  //                      3           2            3             1               1           2
  //
  //
  // so, [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]].
  //
  // For combination, order matter. [1,2,3] is the same as [3,2,1]. So, we add both of them in our result.
  //

  let res = [];
  let perm = [];

  // helper function to backtrack and create the permutation of length nums.length.
  let backtrack = function (path, visited) {
    // Check if the length of our current values (path) is the same as the length of the nums array
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    // Assemble the permutation
    for (let i = 0; i < nums.length; i += 1) {
      // If we've seen this index before, just continue
      if (visited.has(i)) continue;
      // Add the current index to our visited set
      visited.add(i);
      // add this number to our path array
      path.push(nums[i]);
      // call backtrack
      backtrack(path, visited);
      // remove current end of path
      path.pop();
      // remove current index i from visited
      visited.delete(i);
    }

    return;
  };

  // Call the backtrack function
  backtrack([], new Set());

  // console.log(res.length)

  return res;
};
