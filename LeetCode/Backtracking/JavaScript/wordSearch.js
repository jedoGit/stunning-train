// Given an m x n grid of characters board and a string word, return true if word exists in the grid.

// The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

// Example 1:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// Output: true
// Example 2:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
// Output: true
// Example 3:

// Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
// Output: false

// Constraints:

// m == board.length
// n = board[i].length
// 1 <= m, n <= 6
// 1 <= word.length <= 15
// board and word consists of only lowercase and uppercase English letters.

// Follow up: Could you use search pruning to make your solution faster with a larger board?

// TC: O(n*m*4^(length of word))
// SC: O(n*m*4^(length of word))

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class WordSearchRecord {
  constructor(board, word, expected) {
    this.board = board;
    this.word = word;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {character[][]} board
   * @param {string} word
   * @return {boolean}
   */
  exist(board, word) {
    let rows = board.length;
    let cols = board[0].length;
    let path = new Set();

    // DFS on 4 dirs and backtrack to brute force all cells. Pass in row, col and index of the char of the word
    // Base case when the index of the char of the word we're looking is equal to the length of the word. Return true
    // Other cases: Out of bounds for row and col, row and col are in our visited set, word[index] is not in the board[row][col], return false
    const backtrack = (r, c, i) => {
      if (i === word.length) return true;
      if (
        r < 0 ||
        c < 0 ||
        r >= rows ||
        c >= cols ||
        word[i] !== board[r][c] ||
        path.has(`${r}${c}`)
      )
        return false;

      path.add(`${r}${c}`);
      // DFS on 4 dirs and backtrack to brute force all cells
      let res =
        backtrack(r + 1, c, i + 1) ||
        backtrack(r - 1, c, i + 1) ||
        backtrack(r, c + 1, i + 1) ||
        backtrack(r, c - 1, i + 1);
      path.delete(`${r}${c}`);
      return res;
    };

    // Brute force and try to visit all cells
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (backtrack(r, c, 0)) return true;
      }
    }

    return false;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.exist(record.board, record.word);
  const pass = result === record.expected;

  console.log(`Input: board = ${JSON.stringify(record.board)}`);
  console.log(`       word = ${JSON.stringify(record.word)}`);
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new WordSearchRecord(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED",
    true
  ),
  new WordSearchRecord(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "SEE",
    true
  ),
  new WordSearchRecord(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCB",
    false
  ),
  new WordSearchRecord([["A"]], "A", true),
  new WordSearchRecord([["A"]], "AA", false),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
