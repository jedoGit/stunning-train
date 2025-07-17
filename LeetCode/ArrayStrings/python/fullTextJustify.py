from typing import List


class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res = []
        line = []
        length = 0
        i = 0

        while i < len(words):
            if length + len(line) + len(words[i]) > maxWidth:
                extra_space = maxWidth - length
                spaces = extra_space // max(1, len(line) - 1)
                remainder = extra_space % max(1, len(line) - 1)

                for j in range(0, max(1, len(line) - 1)):
                    line[j] += " " * spaces

                    if remainder:
                        line[j] += " "
                        remainder -= 1
                
                res.append("".join(line))
                line = []
                length = 0
            
            line.append(words[i])
            length += len(words[i])
            i += 1

        last_line = " ".join(line)
        trail_space = maxWidth - len(last_line)
        res.append(last_line + " " * trail_space)
        
        
        return res

    @staticmethod
    def testSolution(input) -> None:
        print("Input: words {}".format(input["words"]))
        print("Input: maxWidth {}".format(input["maxWidth"]))
        print("Expected: {}".format(input["expected"]))
        val = Solution().fullJustify(input["words"], input["maxWidth"])
        print("Result: {}, {}".format(val,("Correct" if "".join(val) == "".join(input["expected"]) else "Wrong")))
        print("-" * 50)

if __name__ == "__main__":
    input = {"words": ["This", "is", "an", "example", "of", "text", "justification."] ,
             "maxWidth": 16, 
             "expected": ["This    is    an","example  of text","justification.  "]}
    Solution.testSolution(input)

    input = {"words": ["What","must","be","acknowledgment","shall","be"] ,
             "maxWidth": 16, 
             "expected": ["What   must   be","acknowledgment  ","shall be        "]}
    Solution.testSolution(input)

    input = {"words": ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"] ,
             "maxWidth": 20, 
             "expected": ["Science  is  what we","understand      well","enough to explain to","a  computer.  Art is","everything  else  we","do                  "]}
    Solution.testSolution(input)