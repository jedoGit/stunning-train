// You are given a string s consisting of n characters which are either 'X' or 'O'.

// A move is defined as selecting three consecutive characters of s and converting them to 'O'. Note that if a move is applied to the character 'O', it will stay the same.

// Return the minimum number of moves required so that all the characters of s are converted to 'O'.

// Example 1:

// Input: s = "XXX"
// Output: 1
// Explanation: XXX -> OOO
// We select all the 3 characters and convert them in one move.
// Example 2:

// Input: s = "XXOX"
// Output: 2
// Explanation: XXOX -> OOOX -> OOOO
// We select the first 3 characters in the first move, and convert them to 'O'.
// Then we select the last 3 characters and convert them so that the final string contains all 'O's.
// Example 3:

// Input: s = "OOOO"
// Output: 0
// Explanation: There are no 'X's in s to convert.

// Constraints:

// 3 <= s.length <= 1000
// s[i] is either 'X' or 'O'.

// TC: O(n), worst case is when everythings an O
// SC: O(1)

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MinimumMovesToConvertStringRecord {
    constructor(s, expected) {
        this.s = s;
        this.expected = expected;
    }
}

class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minimumMoves(s) {
        let i = 0;
        let minMoves = 0;

        while (i < s.length) {
            if (s[i] === "X") {
                minMoves += 1;
                i += 3;
            } else {
                i += 1;
            }
        }

        return minMoves;
    }
}

function testSolution(record) {
    const solution = new Solution();
    const result = solution.minimumMoves(record.s);
    const pass = result === record.expected;

    console.log(`Input: s = ${record.s}`);
    console.log(`Expected: ${record.expected}`);
    console.log(`Result: ${result}`);
    console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
    new MinimumMovesToConvertStringRecord("XXX", 1),
    new MinimumMovesToConvertStringRecord("XXOX", 2),
    new MinimumMovesToConvertStringRecord("OOOO", 0),
    new MinimumMovesToConvertStringRecord("OXOX", 1),
];

records.forEach((record, index) => {
    console.log(`# Test case ${index + 1}`);
    testSolution(record);
    console.log("-".repeat(30));
});
