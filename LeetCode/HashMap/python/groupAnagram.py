from collections import defaultdict
from typing import Dict, List


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
             select = 2

             if select == 1:
                  print("Using groupAnagrams1()")
                  return self.groupAnagrams1(strs)
             else:
                  print("Using groupAnagrams2()")
                  return self.groupAnagrams2(strs)
    
    def groupAnagrams1(self, strs: List[str]) -> List[List[str]]:
        res = defaultdict()

        for s in strs:
            count = [0] * 26 # we need an array of size 26 to store the counts for each chars
            # print(count)
            for c in s:
                # Let's count the chars in each strings
                idx = ord(c) - ord("a")
                count[idx] += 1

            # We need to convert count to a string so we can search our hashmap
            # The whole count array will become our key in the hashmap.
            countStr = "".join(str(count))
            # print(countStr)

            # Check first if we have the count string in our hashmap
            # if not, create it and for the value, create an array and push the string s
            # If so, get the k/v pair and push s to the values array
            res[countStr] = res.get(countStr, [])
            # print(res)

            res[countStr].append(s)
            # print(str(res.values()))

        return list(res.values())
    
    def groupAnagrams2(self, strs: List[str]) -> List[List[str]]:
        res = defaultdict()

        for s in strs:
            # Convert the string to a char array and sort them.
            charsArr = list(s)
            charsArr.sort()
            # print(charsArr)

            # We want to use this sorted char array as key to our res map.
            # We need to convet it to string.
            countStr = str("".join(charsArr))
            # print(countStr)

            # Check if our sorted chars string key exists in our res map.
            # If not, initialize it with an empty arraylist
            # If so, get the existing arraylist and append the string s.
            tmp =  res.get(countStr, [])
            # # print(res)
            tmp.append(s)

            res[countStr] = tmp
            # # print(str(res.values()))

        return list(res.values())
    
    @staticmethod
    def testSolution(input: Dict[str, List[str] | List[List[str]]]) -> None: 
        print("Input: strs: " + str(input["strs"]) )
        print("Expected: " + str(input["expected"]))
        res = Solution().groupAnagrams(input["strs"])
        print("Result: " + str(res))
        print("PASS" if Solution.isEqual(res, input["expected"]) else "FAIL")
        print("-" * 50)

    @staticmethod
    def isEqual(in1: List[List[str]], in2: List[List[str]]) -> bool:
        if len(in1) != len(in2):
            return False

        s1 = {frozenset(sublist) for sublist in in1}
        s2 = {frozenset(sublist) for sublist in in2}

        # print(str(s1))
        # print(str(s2))
        
        return s1 == s2
    
if __name__ == "__main__":
    input = {"strs": ["eat","tea","tan","ate","nat","bat"], "expected": [["bat"],["nat","tan"],["ate","eat","tea"]]}
    Solution.testSolution(input)

    input = {"strs": [""], "expected": [[""]]}
    Solution.testSolution(input)

    input = {"strs": ["a"], "expected": [["a"]]}
    Solution.testSolution(input)