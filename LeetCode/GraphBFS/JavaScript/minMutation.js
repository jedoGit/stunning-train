// A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.

// Suppose we need to investigate a mutation from a gene string startGene to a gene string endGene where one
// mutation is defined as one single character changed in the gene string.

// There is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it
// a valid gene string.

// Given the two gene strings startGene and endGene and the gene bank bank, return the minimum number of
// mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1.

// Note that the starting point is assumed to be valid, so it might not be included in the bank.

// Example 1:

// Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
// Output: 1
// Example 2:

// Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
// Output: 2

// Constraints:

// 0 <= bank.length <= 10
// startGene.length == endGene.length == bank[i].length == 8
// startGene, endGene, and bank[i] consist of only the characters ['A', 'C', 'G', 'T'].

// TC: O(B * L * 4) where B is the bank size and L is the gene length, each gene is dequeued once and every position/choice is tried
// SC: O(B) for the bank set, visited set and queue

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class MinMutationRecord {
  constructor(startGene, endGene, bank, expected) {
    this.startGene = startGene;
    this.endGene = endGene;
    this.bank = bank;
    this.expected = expected;
  }
}

class Solution {
  /**
   * @param {string} startGene
   * @param {string} endGene
   * @param {string[]} bank
   * @return {number}
   */
  minMutation(startGene, endGene, bank) {
    // Gene String Choices
    const choices = new Set(["A", "C", "G", "T"]);
    // Convert bank into a set so we have a O(1) lookup/access
    bank = new Set(bank);
    // We'll use BFS to find the minimum step of mutation needed from start to end
    // We'll start with first char of startGene and change every char of the gene and check the bank if the geneString is there...
    let q = []; // Our queue will hold a pair [geneString, numMutationStep]
    q.push([startGene, 0]); // Push initial value
    // We need to keep track of the geneString we tried and don't revisit it
    let visited = new Set();
    // Add the startGene to the visited set
    visited.add(startGene);

    // Perform BFS
    while (q.length) {
      let [gene, steps] = q.shift();

      // We're done if gene is endGene
      if (gene === endGene) return steps;

      // Here, we want to check each char in the geneString and compare it to each gene char choices
      for (let i = 0; i < gene.length; i += 1) {
        // console.log(gene[i])
        const s = gene[i];

        // Loop through each keys in choices set
        // You can iterate to each keys in JS set using for-of
        for (let c of choices) {
          // console.log(c)
          // We want to create a new gene string and check if it's in the bank and if we have not seen it.
          // For each gene s on index i, we replace it with c and create a new gene string
          if (s !== c) {
            let new_gene = gene.slice(0, i) + c + gene.slice(i + 1);
            // console.log(new_gene)
            if (bank.has(new_gene) && !visited.has(new_gene)) {
              visited.add(new_gene);
              q.push([new_gene, steps + 1]);
            }
          }
        }
      }
    }

    // we didn't find the answer, we return -1
    return -1;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.minMutation(
    record.startGene,
    record.endGene,
    [...record.bank]
  );
  const pass = result === record.expected;

  console.log(
    `Input: startGene = "${record.startGene}", endGene = "${record.endGene}", bank = ${JSON.stringify(record.bank)}`
  );
  console.log(`Expected: ${record.expected}`);
  console.log(`Result: ${result}`);
  console.log(pass ? Result.PASS : Result.FAIL);
}

const records = [
  new MinMutationRecord("AACCGGTT", "AACCGGTA", ["AACCGGTA"], 1),
  new MinMutationRecord(
    "AACCGGTT",
    "AAACGGTA",
    ["AACCGGTA", "AACCGCTA", "AAACGGTA"],
    2
  ),
  new MinMutationRecord(
    "AAAAACCC",
    "AACCCCCC",
    ["AAAACCCC", "AAACCCCC", "AACCCCCC"],
    3
  ),
  new MinMutationRecord("AACCGGTT", "AACCGGTA", [], -1),
  new MinMutationRecord("AACCGGTT", "AACCGGTT", [], 0),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("----------------------------------------");
});
