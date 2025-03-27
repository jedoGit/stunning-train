/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (startGene, endGene, bank) {
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
};
