// You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

// Return the merged string.

// Example 1:

// Input: word1 = "abc", word2 = "pqr"
// Output: "apbqcr"
// Explanation: The merged string will be merged as so:
// word1:  a   b   c
// word2:    p   q   r
// merged: a p b q c r
// Example 2:

// Input: word1 = "ab", word2 = "pqrs"
// Output: "apbqrs"
// Explanation: Notice that as word2 is longer, "rs" is appended to the end.
// word1:  a   b 
// word2:    p   q   r   s
// merged: a p b q   r   s
// Example 3:

// Input: word1 = "abcd", word2 = "pq"
// Output: "apbqcd"
// Explanation: Notice that as word1 is longer, "cd" is appended to the end.
// word1:  a   b   c   d
// word2:    p   q 
// merged: a p b q c   d
 

// Constraints:

// 1 <= word1.length, word2.length <= 100
// word1 and word2 consist of lowercase English letters.

// TC: O(n) because we'll have to loop through the 2 strings
// SC: O(n) because we have to create a new string with length of the 2 input string

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    // we'll use an array to push each chars
    let mergedStr = []

    // loop through the strings and stop if either one of the string is null
    for (var i = 0 ; i < word1.length && i < word2.length ; i++ ) {
        // we push word1 first then word2
        mergedStr.push(word1[i])
        mergedStr.push(word2[i])
    }

    // we exited the for-loop because one of the string is null
    // so we continue to push the rest of the chars in that string
    if(word1.length > 0){
        mergedStr.push(word1.slice(i, word1.length))
        // for (let j=i ; j < word1.length ; j++) {
        //     mergedStr.push(word1[j])
        // }
    }

    if(word2.length > 0){
        mergedStr.push(word2.slice(i, word2.length))
        // for (let j=i ; j < word2.length ; j++) {
        //     mergedStr.push(word2[j])
        // }
    }

    // we have to remove the commas that we've added when we converted the array to string
    return mergedStr.toString().split(",").join("")
};


// Another solution using string methods

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let mergedStr = new String()

    for (var i = 0 ; i < word1.length && i < word2.length ; i++ ) {
        mergedStr = mergedStr + word1.at(i)
        mergedStr = mergedStr + word2.at(i)
    }

    if(word1.length > 0){
        mergedStr = mergedStr + word1.slice(i, word1.length)
    }

    if(word2.length > 0){
        mergedStr = mergedStr + word2.slice(i, word2.length)
    }

    return mergedStr
};