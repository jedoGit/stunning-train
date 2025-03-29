class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        # Gene char choices. 
        # Create a set for it so it's easy to lookup
        # if you pass a string to a python set constructor, each chars will be converted to a key without duplicate
        # if you pass an array to a set constructor, each elements will be added to the set without duplicate
        # choices = set("ACGT")
        choices = set(["A", "C", "G", "T"]) 
        # print(choices)
        # Convert bank into a set so we have O(1) access
        bank = set(bank)
        # print(bank)
        # We'll use BFS to find the minimum step of mutation needed from start to end
        # We'll start with first char of startGene and change every char of the gene and check the bank if the geneString is there...
        q = deque() # Our queue will hold a pair [geneString, numMutationStep]
        q.append([startGene,0]) # Push the initial value
        # Add the startGene to the visited set
        visited = set()
        visited.add(startGene)

        # Perform BFS
        while q:
            gene, steps = q.popleft()
            # print(gene)
            # check if the gene is endGene, if so, we're done
            if gene == endGene: return steps

            # Here, we want to check each char in the geneString and compare it to each gene char choices
            for i, s in enumerate(gene):
                # Loop through each keys in choices set
                for c in choices:
                    # print(s,c)
                    # We want to create a new gene string and check if it's in the bank and if we have not seen it.
                    # For each gene s on index i, we replace it with c and create a new gene string
                    if s != c:
                        new_gene = gene[:i] + c + gene[i+1:]
                        # print(new_gene)
                        if new_gene in bank and new_gene not in visited :
                            visited.add(new_gene)
                            q.append([new_gene, steps + 1])

        # We didn't find the answer, we return -1
        return -1
        