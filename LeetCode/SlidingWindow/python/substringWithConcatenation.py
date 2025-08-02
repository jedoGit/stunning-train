from typing import List
from collections import defaultdict


class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        result = []
        # Return immediately if empty
        if len(s) == 0 or len(words) == 0:
            return result
        
        # get the length of the first element, all of the elements will have the same length
        # also, get how many elements there are
        wordLen = len(words[0])
        totalWords = len(words)

        # Use default dictionary so we can easily count the word frequency.
        # There's also a library count we can use: collections.Counter... but we're not going to use that here
        wordCount = defaultdict(list)

        for word in words:
            wordCount[word] = wordCount.get(word, 0) + 1

        # print("wordCount : {}".format(wordCount))
        
        # We'll iterate wordLen at a time
        for i in range(wordLen):
            left = i
            right = i
            count = 0
            seen = defaultdict(list)

            #  Let's check if we're at the end of the word in our words array
            while right + wordLen <= len(s):
                # extract the word from the s string
                word = s[right: right + wordLen]
                right += wordLen

                # check if this word is in our word list
                if word in wordCount:
                    # if so, let's add it to our seen map
                    seen[word] = seen.get(word, 0) + 1
                    count += 1

                    # If there are more words in the s string than in our words array,
                    # let's keep moving the window until we process all the words
                    # in the s string
                    while seen.get(word) > wordCount.get(word):
                        leftWord = s[left : left + wordLen]
                        seen[leftWord] = seen.get(leftWord) - 1
                        count -= 1
                        left += wordLen
                    
                    # update the results
                    if count == totalWords:
                        result.append(left)
                else:
                    # let's reset if word is not in our word list
                    seen.clear()
                    count = 0
                    left = right
        
        return result
    
    @staticmethod
    def testSolution(input) -> None:
        print("Input: s: {}".format(input["s"]))
        print("Input: words: {}".format(input["words"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().findSubstring(input["s"], input["words"])
        print("Result: {}".format(val))
        print("PASS" if val == input["expected"] else "FAIL")
        print("-" * 50)

if __name__ == "__main__":
    input = {"s": "barfoothefoobarman", "words": ["foo","bar"], "expected": [0,9]}
    Solution.testSolution(input)

    input = {"s": "wordgoodgoodgoodbestword", "words": ["word","good","best","word"], "expected": []}
    Solution.testSolution(input)    

    input = {"s": "barfoofoobarthefoobarman", "words": ["bar","foo","the"], "expected": [6,9,12]}
    Solution.testSolution(input)    