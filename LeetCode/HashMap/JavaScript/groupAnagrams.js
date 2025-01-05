// Given an array of strings strs, group the
// anagrams
//  together. You can return the answer in any order.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// Explanation:

// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
// Example 2:

// Input: strs = [""]

// Output: [[""]]

// Example 3:

// Input: strs = ["a"]

// Output: [["a"]]

// Constraints:

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] consists of lowercase English letters.

// TC: O(n*m), we're visiting each strings in the strs array and for each string, we're visiting each chars
// SC: O(n*m), we're creating a map of word count for each string and for each of the word count, we append all the strings that match the word count

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let res = {};
  let s = "";
  let c = "";

  for (let s of strs) {
    // we need an array of size 26 to store the counts for each chars of s
    let count = new Array(26).fill(0);
    // console.log(s)
    for (let c of s) {
      // Let's count the chars in each strings
      // What were doing here is to map a char to a certain value
      // for example, "d" = 100, "a" = 97 => d-a = 100 - 97 = 3 => "d"
      // here "d" is mapped to 3, and we count the occurence of d, which is mapped to index 3.
      // count[3] += 1
      // console.log(c)
      count[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }

    // console.log(count.join())
    // We need to convert count to a string so we can search our hashmap
    // The whole count array will become our key in the hashmap.
    const countStr = count.join();

    // Check first if we have the count string in our hashmap
    // if not, create it and for the value, create an array and push the string s
    // If so, get the k/v pair and push s to the values array
    if (!(countStr in res)) {
      res[countStr] = [];
    }

    res[countStr].push(s);
  }
  // console.log(Object.values(res))
  return Object.values(res);
};
