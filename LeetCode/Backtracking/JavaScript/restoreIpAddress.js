// A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

// For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
// Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

// Example 1:

// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]
// Example 2:

// Input: s = "0000"
// Output: ["0.0.0.0"]
// Example 3:

// Input: s = "101023"
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

// Constraints:

// 1 <= s.length <= 20
// s consists of digits only.

// TC: O(n)
// SC: ???

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  //     012345
  // s = 101023
  // s.length = 6
  // This is how the decision tree would look like. We're going to look at 1 to 3 digits at a time.
  // For example if we consider index 0 which has a value of 1 as the first integer in our ip address separated by dot,
  // we can see the the next digit in s is 0. We know that the integers does not start with zero. This means that 0 should be the
  // second integer in our ip address. Now, we look at the possible 3rd integer in our ip address. Since we've already assigned the first 2 index, we'll
  // need to check the next 3 indices... starting from index 2 to 4, we can have 3 possible integers, 1 10 102. Now, if we use the integer 1, and perform
  // the same logic by looking at the next 3 digits in s, we'll eventually hit the end of s. We'll do the same for the rest of the digits in s.
  // We'll have something like this:
  //                         1               10           101
  //                         |           /   |   \         |
  //                         0          1    10  102       0
  //                    /    |  \       |    /\   |       / \
  //                   1    10  102     0   2 23  3       2 23
  //                   |    /\   |     / \  |             |
  //                   0   2 23  3     2 23 3             3
  //                  / \  |           |
  //                  2 23 3           3
  //                  |
  //                  3
  // By creating a decision tree, we can check if all of the combinations are valid ip address
  // 1.0.1.0.2.3 INVALID         10.1.0.2.3  INVALID         101.0.2.3   VALID
  // 1.0.1.0.23  INVALID         10.1.0.23   VALID           101.23      INVALID
  // 1.0.10.2.3  INVALID         10.10.2.3   VALID
  // 1.0.10.23   VALID           10.10.23    INVALID
  //                             10.102.3    INVALID

  // This is a DFS type of a problem and we recurse and checking at each level if we've assembled a valid ip address. If we did, we'll add it to our results array.
  // For base cases:
  // - At each level, we add a dot, pass the currentIP address we assembled and the last index we looked at from s.
  // - We stop looking when we've added 4 dots and the index we received is equal to the length of s. We append our currentIP Address to our results.
  // - We also stop looking if we added more than 4 dots.
  //
  // At each level we only want to consider the remaining chars of s starting from the index we received. We look at i to min(i+3, s.length).

  let res = [];
  let sLen = s.length;

  // If the size of s has more than 12 digits, it means it's not possible to create a valid ip address.
  if (sLen > 12) {
    return res;
  }

  // The backtracking recursive function
  function backtracking(idx, numDots, curIpAddr) {
    // Base cases
    if (numDots === 4 && idx === sLen) {
      // Let's push the string curIpAddr to our results array. Exclude the last dot added
      res.push(curIpAddr.slice(0, -1));
      return;
    }

    // Let's not waste more time looking if we know it's not a valid IP Address
    if (numDots > 4) {
      return;
    }

    // We start from the index passed to the function. The check for the next 3 digit. In the case that we have less than 3 digits left, we stop at the end of array.
    for (let j = idx; j < Math.min(idx + 3, sLen); j += 1) {
      // Here we only consider the chars in s one at the at. Check it if the integer value is between 0 to 255.
      // Also, check if the leading digit should not be 0.
      if (
        parseInt(s.slice(idx, j + 1)) < 256 &&
        (idx === j || s[idx] !== "0")
      ) {
        // We recurse and pass the next index, increment the numDots, append the new slice of Ip digit we added and don't forget to add the dot.
        backtracking(j + 1, numDots + 1, curIpAddr + s.slice(idx, j + 1) + ".");
      }
    }
  }

  // Call the backtracking recursion
  backtracking(0, 0, "");

  // console.log(res)

  return res;
};
