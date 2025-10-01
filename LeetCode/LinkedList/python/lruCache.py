from typing import Dict, List, Optional


class Node:
    def __init__(self, key: int, val: int):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}

        self.oldest = Node(0, 0)
        self.latest = Node(0, 0)
        self.oldest.next = self.latest
        self.latest.prev = self.oldest
        

    def get(self, key: int) -> int:
        if key in self.cache:
            self.remove(self.cache[key]) # remove node from old LL
            self.insert(self.cache[key]) # add node to latest LL
            return self.cache[key].val # cache = {key: Node(key, val)}
        return -1

    def remove(self, node: Optional[Node]):
        prev, next = node.prev, node.next
        prev.next = next
        next.prev = prev
    
    def insert(self, node: Optional[Node]):
        prev, next = self.latest.prev, self.latest
        prev.next = next.prev = node
        node.next = next
        node.prev = prev

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.remove(self.cache[key])
        self.cache[key] = Node(key, value)
        self.insert(self.cache[key])

        if len(self.cache) > self.cap:
            lru = self.oldest.next
            self.remove(lru)
            del self.cache[lru.key]
        
    @staticmethod
    def testSolution(input: Dict[str, List[str] | List[List[int]]]) -> None:
        print("Input: operation: {}".format(input["operation"]))
        print("Input: value: {}".format(input["value"]))
        print("Expected: {}".format(input["expected"]))
        res = []
        soln = None
        for i in range(0, len(input["operation"])):
            oper = input["operation"][i]
            if oper == "LRUCache":
                res.append("null")
                soln = LRUCache(input["value"][i][0])
            elif oper == "get":
                output = str(soln.get(input["value"][i][0]))
                res.append("null" if output == "None" else output)
            elif oper == "put":
                output = str(soln.put(input["value"][i][0], input["value"][i][1]))
                res.append("null" if output == "None" else output)

        print("Result: {}".format(res))
        print("PASS" if LRUCache.validateResult(res, input["expected"]) else "FAIL")
        print("-" * 50)

    @staticmethod
    def validateResult(res: List[str], expected: List[str]) -> bool:
        if len(res) != len(expected):
            return False 
        else:
            for i in range(len(res)):   
                if res[i] != expected[i]:
                    return False

        return True

# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)

if __name__ == "__main__":
    input = { "operation" : ["LRUCache","put","put","get","put","get","put","get","get","get"],
             "value": [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]],
             "expected": ["null","null","null","1","null","-1","null","-1","3","4"]}
    
    LRUCache.testSolution(input)