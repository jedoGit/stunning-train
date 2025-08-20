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
  let select = 2;

  if (select === 1) {
    console.log("Using groupAnagrams1()");
    return groupAnagrams1(strs);
  } else {
    console.log("Using groupAnagrams2()");
    return groupAnagrams2(strs);
  }
};

var groupAnagrams1 = function (strs) {
  let res = {};

  for (let s of strs) {
    let count = new Array(26).fill(0); // we need an array of size 26 to store the counts for each chars
    // console.log(s)
    for (let c of s) {
      // Let's count the chars in each strings
      // What were doing here is to map a char to a certain value
      // for example, "d" = 100, "a" = 97 => d-a = 100 - 97 = 3 => "d"
      // here "d" is mapped to 3, and we count the occurence of d, which is mapped to index 3.
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

var groupAnagrams2 = function (strs) {
  let res = {};

  for (let s of strs) {
    //  Convert the string to a char array and sort them.
    let charsArr = s.split("");
    charsArr.sort();

    // We need to convert count to a string so we can search our hashmap
    // The whole count array will become our key in the hashmap.
    const countStr = charsArr.join("");

    // Check first if we have the count string in our hashm
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

var testSolution = (input) => {
  console.log("Input: strs: " + JSON.stringify(input["strs"]));
  console.log("Expected: " + JSON.stringify(input["expected"]));
  let res = groupAnagrams(input["strs"]);
  console.log("Result: " + JSON.stringify(res));
  console.log(isEqual(res, input["expected"]) ? "PASS" : "FAIL");
  console.log("-".repeat(50));
};

var isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort inner arrays
  const sortedArr1 = arr1.map((innerArr) => [...innerArr].sort());
  const sortedArr2 = arr2.map((innerArr) => [...innerArr].sort());

  // Sort outer arrays based on stringified inner arrays for consistent comparison
  sortedArr1.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  sortedArr2.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

  // Deep compare the sorted matrices
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i].length !== sortedArr2[i].length) {
      return false;
    }
    for (let j = 0; j < sortedArr1[i].length; j++) {
      if (sortedArr1[i][j] !== sortedArr2[i][j]) {
        return false;
      }
    }
  }

  return true;
};

// =======================================
// Test Vectors
// =======================================

let input = {
  strs: ["eat", "tea", "tan", "ate", "nat", "bat"],
  expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
};

testSolution(input);

input = {
  strs: [""],
  expected: [[""]],
};

testSolution(input);

input = {
  strs: ["a"],
  expected: [["a"]],
};

testSolution(input);
