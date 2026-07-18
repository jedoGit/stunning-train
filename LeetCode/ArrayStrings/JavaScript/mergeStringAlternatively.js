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

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MergeStringAlternativelyRecord {
    constructor(word1, word2, expected) {
        this.word1 = word1;
        this.word2 = word2;
        this.expected = expected;
    }
}

class Solution {
    /**
     * @param {string} word1
     * @param {string} word2
     * @return {string}
     */
    mergeAlternately(word1, word2) {
        let mergedStr = new String();

        for (var i = 0 ; i < word1.length && i < word2.length ; i++ ) {
            mergedStr = mergedStr + word1.at(i);
            mergedStr = mergedStr + word2.at(i);
        }

        if(word1.length > 0){
            mergedStr = mergedStr + word1.slice(i, word1.length);
        }

        if(word2.length > 0){
            mergedStr = mergedStr + word2.slice(i, word2.length);
        }

        return mergedStr;
    }
}

function testSolution(record) {
    const solution = new Solution();
    const result = solution.mergeAlternately(record.word1, record.word2);
    const pass = result === record.expected;

    console.log(`Input: word1 = ${record.word1}, word2 = ${record.word2}`);
    console.log(`Expected: ${record.expected}`);
    console.log(`Result: ${result}`);
    console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
    new MergeStringAlternativelyRecord("abc", "pqr", "apbqcr"),
    new MergeStringAlternativelyRecord("ab", "pqrs", "apbqrs"),
    new MergeStringAlternativelyRecord("abcd", "pq", "apbqcd"),
];

records.forEach((record, index) => {
    console.log(`# Test case ${index + 1}`);
    testSolution(record);
    console.log("-".repeat(30));
});
