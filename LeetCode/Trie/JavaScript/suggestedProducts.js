// You are given an array of strings products and a string searchWord.

// Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

// Return a list of lists of the suggested products after each character of searchWord is typed.

// Example 1:

// Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
// Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
// Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
// After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
// After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
// Example 2:

// Input: products = ["havana"], searchWord = "havana"
// Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
// Explanation: The only word "havana" will be always suggested while typing the search word.

// Constraints:

// 1 <= products.length <= 1000
// 1 <= products[i].length <= 3000
// 1 <= sum(products[i].length) <= 2 * 104
// All the strings of products are unique.
// products[i] consists of lowercase English letters.
// 1 <= searchWord.length <= 1000
// searchWord consists of lowercase English letters.

// TC: O(nlogn + n*w + m), we sort the input array, we iterate to each string in the input array and for each string in the input array, iterate each chars, finally, we iterate to each chars in the search word
// SC: O(1) , in place processing

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
  let res = [];
  // We need to sort the array first
  products.sort();

  // Using 2 pointers
  let l = 0;
  let r = products.length - 1;

  // We'll loop through each chars of our search word and find the first 3 results from our products array
  for (let i = 0; i < searchWord.length; i++) {
    let c = searchWord[i];

    // For our left and right pointers, we check:
    // 1. Left and right pointer did not cross each other
    // 2. The string pointed by the pointers, it's length should be at least equal or more than the length of the search word
    // 3.
    while (l <= r && (products[l].length <= i || products[l][i] != c)) {
      l += 1;
    }
    while (l <= r && (products[r].length <= i || products[r][i] != c)) {
      r -= 1;
    }

    // We add an empty array to our results array
    res.push([]);

    // We calculate how many elements between the left and right pointer
    // We'll use this to decide how many to store in the results array
    let remain = r - l + 1;

    // Here based on the elements between the left and right pointer, we only want max of 3 elements added to our results array
    for (let j = 0; j < Math.min(3, remain); j++) {
      // Here, res.at(-1) just means starting from the end of the array, give me the last element
      res.at(-1).push(products[l + j]);
    }
  }

  return res;
};
