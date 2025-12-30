# Given a reference of a node in a connected undirected graph.

# Return a deep copy (clone) of the graph.

# Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

# class Node {
#     public int val;
#     public List<Node> neighbors;
# }

# Test case format:

# For simplicity, each node's value is the same as the node's index (1-indexed). For example, the first node with val == 1, the second node with val == 2, and so on. The graph is represented in the test case using an adjacency list.

# An adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

# The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

# Example 1:

# Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
# Output: [[2,4],[1,3],[2,4],[1,3]]
# Explanation: There are 4 nodes in the graph.
# 1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
# 2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
# 3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
# 4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
# Example 2:

# Input: adjList = [[]]
# Output: [[]]
# Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
# Example 3:

# Input: adjList = []
# Output: []
# Explanation: This an empty graph, it does not have any nodes.

# Constraints:

# The number of nodes in the graph is in the range [0, 100].
# 1 <= Node.val <= 100
# Node.val is unique for each node.
# There are no repeated edges and no self-loops in the graph.
# The Graph is connected and all nodes can be visited starting from the given node.

# TC: O(n)
# SC: O(n)

from enum import Enum
from typing import Dict, List, Optional

class Result(Enum):
    PASS = "\033[92mPASS\033[00m"
    FAIL = "\033[91mFAIL\033[00m"

# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if node is None: return None

        oldToNew = {}

        def dfs(node: Node) :
            # Check if the node is in our old to new node hashmap, if so, return the old to new mapping
            if node in oldToNew:
                return oldToNew[node]

            # The node is not in our hashmap, so we save a copy of the node to the hashmap
            copy = Node(node.val)
            oldToNew[node] = copy

            # Copy and update the adjacency list of the old node to the neighbor
            for nei in node.neighbors:
                copy.neighbors.append(dfs(nei))
        
            # Return copy
            return copy
        
        return dfs(node)
    
    @staticmethod
    def testSolution(input: Dict[str, List[List[int]]]) -> None:
        input_graph = Solution.createGraph(input["edges"])
        expected_graph = Solution.createGraph(input["expected"])
        print(f"Input: edges: ")
        Solution.printGraph(input_graph)
        print(f"Expected: ")
        Solution.printGraph(expected_graph)

        res_graph: List[Node] = []
        for graph_node in input_graph:
            tmp_res_node = Solution().cloneGraph(graph_node)
            res_graph.append(tmp_res_node)

        print(f"Result:")
        Solution.printGraph(res_graph)

        print(Result.PASS.value if Solution.validateResult(res_graph, input["expected"]) else Result.FAIL.value)
        
    @staticmethod
    def createGraph(edges: List[List[int]]) -> List[Node]:
        node_array: List[Node] = []
        
        # Create the node with the value
        for i in range(len(edges)):
            node_array.append(Node(i + 1))

        # Add the neighbor list for each nodes
        for i in range(len(node_array)):
            # Access the neighbor list of each elements of the node_array
            nei_list = node_array[i].neighbors
            # Get the List of neighbors from the edges list input
            edge_list = edges[i]

            # Let's append the neighbor list based on the edge neighbor list. Don't forget that the node_array is 0 based index.
            for edge_nei in edge_list:
                nei_list.append(node_array[edge_nei - 1])

        return node_array

    @staticmethod
    def printGraph(graph: List[Node]) -> None:
        if(len(graph) < 1):
            print(f"[]")
            return

        for graph_node in graph:
            tmp_nei: List[int] = []
            neighbors: List[Node] = graph_node.neighbors
            for item in neighbors:
                tmp_nei.append(item.val)
            print(f"\t[node {graph_node.val}] => val: {graph_node.val}, neighbors: {tmp_nei}")

    @staticmethod
    def validateResult(result: List[Node], expected: List[List[int]]) -> bool:
        if(len(result) < 1 and len(expected) < 1):
            return True

        for i in range(len(result)):
            res_nei = [i.val for i in result[i].neighbors]
            # result[i].val should be equal to i + 1 (0 based index), if not, return false
            if res_nei != expected[i] or result[i].val != i + 1:
                return False

        return True
    
if __name__ == "__main__":
    records = [ {"edges": [[2,4],[1,3],[2,4],[1,3]], "expected": [[2,4],[1,3],[2,4],[1,3]]},
             {"edges": [[]], "expected": [[]]},
             {"edges": [], "expected": []}
             ]
    
    for i, record in enumerate(records):
        print(f"Test case {i+1}")
        Solution.testSolution(record)
        print(f"{'-' * 50}")
